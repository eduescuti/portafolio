import { useEffect, useLayoutEffect, useRef } from 'react'
import { m } from 'framer-motion'
import { CROSSFADE_MS, EXIT_MS, EXIT_TWEEN, OPEN_SPRING } from '../lib/cardMotion'
import DeckCard from './DeckCard'

const GAP = 16
const SLIDE_SPRING = { type: 'spring', stiffness: 260, damping: 30 }

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
  initialBack,
  onFlip,
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
      className="absolute inset-0 overflow-y-auto overscroll-contain snap-y snap-mandatory"
      style={{ paddingTop: target.top, paddingBottom: target.top }}
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
              className="h-full w-full"
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
              {/* Capa aparte para el realce de la carta centrada: no se puede mezclar con
                  la del FLIP, que es dueña de scale/x/y durante la apertura.
                  Sin blur a propósito: reevaluarlo mientras el dedo scrollea es
                  exactamente el costo que este rediseño vino a sacar. */}
              <m.div
                className="h-full w-full"
                animate={{ scale: isActive ? 1 : 0.92, opacity: isActive ? 1 : 0.45 }}
                transition={SLIDE_SPRING}
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
                    initialBack={isOrigin && initialBack}
                    onFlip={onFlip}
                    // Sin `onDeckNavigate`: en mobile no hay arrastre, navega el scroll.
                  />
                ) : (
                  // Tocar una carta que asoma la trae al centro. Va `aria-hidden` y sin
                  // rol: la vía accesible es el scroll, no este atajo.
                  <div aria-hidden onClick={() => scrollToCard(i)} className="h-full w-full cursor-pointer">
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
