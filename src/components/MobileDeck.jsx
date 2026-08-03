import { useEffect, useLayoutEffect, useRef } from 'react'
import { m } from 'framer-motion'
import { CROSSFADE_MS, EXIT_MS, EXIT_TWEEN, OPEN_SPRING } from '../lib/cardMotion'
import DeckCard from './DeckCard'

const GAP = 16

// Inclinación de las cartas que no están centradas, y la perspectiva desde la que se las
// mira. Es el equivalente vertical del carrusel de desktop: la de arriba se recuesta hacia
// atrás por abajo y la de abajo por arriba, así la pila se lee como un mazo en profundidad
// y no como tres rectángulos deslizándose.
//
// Es una transformación y no un filtro: se compone en el mismo lugar que el `scale` que ya
// estaba y no obliga a repintar mientras el dedo scrollea, que es la línea que este mazo
// no cruza (por eso tampoco hay blur acá).
const NEIGHBOR_ROTATE = 7
const PERSPECTIVE = 1200

// Más blando que `OPEN_SPRING`: la carta que se centra no tiene que llegar y frenar, tiene
// que asentarse detrás del dedo que la trajo.
const SLIDE_SPRING = { type: 'spring', stiffness: 190, damping: 26, mass: 0.9 }

/**
 * El mazo en mobile: la portada arriba y las capturas apiladas debajo, cada una asomando.
 * Se navega con **scroll vertical nativo**, no con un gesto de arrastre a medida.
 *
 * Por qué scroll nativo y no `drag`: en táctil, reimplementar paginación con Motion pelea
 * contra el scroll del navegador y siempre se siente peor. Delegándolo, el mazo hereda
 * gratis la inercia, el rebote y el snap del sistema — y de paso desaparece el conflicto
 * histórico entre el `drag` de Motion y el scroll del dedo, porque acá no hay ningún drag.
 *
 * La consecuencia está en el dorso (`CoverBack`): como el gesto vertical ya está tomado
 * por la navegación, el dorso NO puede scrollear por dentro. Se recorta en vez de
 * scrollear.
 */
export default function MobileDeck({
  deck,
  index,
  onIndexChange,
  originIndex,
  originRect,
  target,
  project,
  t,
  lang,
  rarity,
  tone,
  reduce,
  flipped,
  onCardFlip,
  onClose,
}) {
  const scrollRef = useRef(null)
  const step = target.height + GAP

  // Arranca en la carta que abrió el mazo, sin animar: si el deep link apunta a la
  // captura 2, no tiene sentido ver pasar la 0 y la 1.
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = originIndex * step
    // Sólo al montar: después manda el scroll del usuario.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // La carta activa se deriva del scroll, no al revés. El rAF evita recalcular en cada
  // uno de los eventos de scroll que dispara un fling.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const next = Math.round(el.scrollTop / step)
        onIndexChange(Math.min(Math.max(next, 0), deck.length - 1))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [deck.length, onIndexChange, step])

  const scrollToCard = (i) => {
    scrollRef.current?.scrollTo({ top: i * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  const inverted = reduce
    ? {}
    : {
        x: originRect.left - target.left,
        y: originRect.top - target.top,
        scaleX: originRect.width / target.width,
        scaleY: originRect.height / target.height,
      }
  const identity = reduce ? {} : { x: 0, y: 0, scaleX: 1, scaleY: 1 }
  const flipExit = index === originIndex

  return (
    <div
      ref={scrollRef}
      // `overscroll-contain` evita que al llegar al final el scroll se encadene con la
      // página de atrás (que además está bloqueada).
      //
      // `snap-proximity` y no `snap-mandatory`: mandatory obliga al navegador a resolver
      // TODO scroll —incluido uno chiquito, indeciso, el típico primer intento de deslizar
      // el dedo— contra el snap point más cercano, y en algunos motores eso se siente como
      // que el gesto "no agarra" y sólo tocar la carta de abajo mueve algo. Proximity sólo
      // ajusta cuando el scroll YA se soltó cerca de un punto: el dedo manda de verdad y el
      // snap sigue estando para que la carta quede prolija al soltar.
      className="absolute inset-0 overflow-y-auto overscroll-contain snap-y snap-proximity"
      style={{ paddingTop: target.top, paddingBottom: target.top, touchAction: 'pan-y' }}
      onClick={(e) => {
        // Tocar el vacío alrededor de las cartas cierra el mazo.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {deck.map((card, i) => {
        const isActive = i === index
        const isOrigin = i === originIndex

        return (
          <div
            key={card.key}
            className="snap-center"
            style={{
              width: target.width,
              height: target.height,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: i < deck.length - 1 ? GAP : 0,
            }}
          >
            <m.div
              // `relative` para que el halo de acá abajo se ancle a la carta: cuando
              // `reduce` está activo esta capa no lleva ningún transform y sin esto el
              // halo treparía hasta el contenedor que scrollea.
              className="relative h-full w-full"
              initial={isOrigin && !reduce ? inverted : { opacity: 0 }}
              animate={isOrigin && !reduce ? identity : { opacity: 1 }}
              exit={
                isOrigin && flipExit && !reduce
                  ? {
                      ...inverted,
                      opacity: 0,
                      transition: {
                        ...EXIT_TWEEN,
                        opacity: {
                          delay: (EXIT_MS - CROSSFADE_MS) / 1000,
                          duration: CROSSFADE_MS / 1000,
                        },
                      },
                    }
                  : { opacity: 0, transition: { duration: EXIT_MS / 1000 } }
              }
              transition={OPEN_SPRING}
              style={{ transformOrigin: 'top left' }}
            >
              {/* Halo de rareza de la carta centrada, colgado de la capa del FLIP para que
                  no lo toque el `scale` de la de abajo: el halo tiene que quedarse quieto
                  mientras la carta se asienta. Es la misma iluminación que la carta del
                  Hero, con el color de la rareza del proyecto.
                  El `-inset-2` no es estético: `computeTarget` reserva 24px de gutter
                  total, o sea 12 por lado, y este contenedor scrollea. Un halo más ancho
                  que ese margen desborda a lo ancho y le saca scroll horizontal al mazo.
                  Los 8px alcanzan igual porque el desenfoque derrama muy por fuera de la
                  caja, y ese derrame es pintura, no layout. */}
              {!reduce && (
                <m.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`pointer-events-none absolute -inset-2 rounded-[1.75rem] blur-2xl ${rarity.glow}`}
                />
              )}

              {/* Capa aparte para el realce de la carta centrada: no se puede mezclar con
                  la del FLIP, que es dueña de scale/x/y durante la apertura.
                  Sin blur a propósito: reevaluarlo mientras el dedo scrollea es
                  exactamente el costo que este rediseño vino a sacar. */}
              <m.div
                className="relative h-full w-full"
                animate={{
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : 0.45,
                  rotateX:
                    isActive || reduce ? 0 : i < index ? -NEIGHBOR_ROTATE : NEIGHBOR_ROTATE,
                }}
                transition={SLIDE_SPRING}
                style={{ transformPerspective: PERSPECTIVE }}
              >
                {isActive ? (
                  <DeckCard
                    card={card}
                    project={project}
                    t={t}
                    lang={lang}
                    rarity={rarity}
                    tone={tone}
                    total={deck.length}
                    index={i}
                    active
                    isDesktop={false}
                    reduce={reduce}
                    // El flipper se monta de nuevo cada vez que esta carta vuelve a ser la
                    // centrada, así que `initialBack` es lo que la devuelve al lado en el
                    // que la dejaste. El registro lo lleva `ProjectDeck` (ver `flipped`).
                    initialBack={flipped.has(i)}
                    onFlip={(back) => onCardFlip(i, back)}
                    // Sin `onDeckNavigate`: en mobile no hay arrastre, navega el scroll.
                  />
                ) : (
                  // Tocar una carta que asoma la trae al centro. Va `aria-hidden` y sin
                  // rol: la vía accesible es el scroll, no este atajo.
                  //
                  // `data-cursor="hover"`: este mazo no es sólo para dedos — se monta por
                  // ancho de viewport (<1024px), así que un desktop angosto llega acá con
                  // mouse. Sin él, el `cursor-pointer` repone la manita NATIVA encima del
                  // cursor custom (ver el bloque del cursor en index.css).
                  <div
                    aria-hidden
                    data-cursor="hover"
                    onClick={() => scrollToCard(i)}
                    className="h-full w-full cursor-pointer"
                  >
                    <DeckCard
                      card={card}
                      project={project}
                      t={t}
                      lang={lang}
                      rarity={rarity}
                      tone={tone}
                      total={deck.length}
                      index={i}
                      active={false}
                      isDesktop={false}
                      reduce={reduce}
                      // Mismo motivo que en DesktopDeck.jsx: sin esto la carta que asoma
                      // siempre mostraba el frente aunque estuviera en `flipped`.
                      initialBack={flipped.has(i)}
                    />
                  </div>
                )}
              </m.div>
            </m.div>
          </div>
        )
      })}
    </div>
  )
}
