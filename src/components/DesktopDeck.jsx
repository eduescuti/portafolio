import { m } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CROSSFADE_MS, EXIT_MS, EXIT_TWEEN, OPEN_SPRING } from '../lib/cardMotion'
import { neighborOffset } from '../lib/cardGeometry'
import { useNoDragRef } from '../lib/useNoDragRef'
import DeckCard from './DeckCard'

const NEIGHBOR_SCALE = 0.82

// Grados que las vecinas giran hacia el centro, más la perspectiva desde la que se las
// mira. Es lo que convierte el carrusel en una escena con profundidad en vez de tres
// recortes deslizándose de costado: la vecina izquierda muestra su canto derecho y la
// derecha el izquierdo, así que la activa queda adelante y no sólo "más grande".
//
// La rotación va sobre la MISMA capa que ya animaba `x` y `scale`, y que ya llevaba el
// blur fijo: no agrega una capa nueva ni obliga a re-rasterizar nada que no se estuviera
// componiendo igual.
const NEIGHBOR_ROTATE = 12
const PERSPECTIVE = 1400

// Más blando que `OPEN_SPRING`: la carta que entra no tiene que llegar y frenar como
// cuando se abre el mazo, tiene que deslizarse. La masa es lo que le da el arrastre —
// sin ella, bajar la rigidez sola deja el movimiento lento pero igual de seco.
const SLIDE_SPRING = { type: 'spring', stiffness: 190, damping: 26, mass: 0.9 }

/**
 * El mazo en desktop: la carta activa al centro y las vecinas espiando a los costados,
 * borrosas y más chicas.
 *
 * Se montan a lo sumo tres cartas —la anterior, la activa y la siguiente—: un proyecto con
 * muchas capturas no puede tener todas las imágenes en el DOM a la vez.
 */
export default function DesktopDeck({
  deck,
  index,
  onIndexChange,
  originIndex,
  originRect,
  target,
  peek,
  project,
  t,
  lang,
  rarity,
  tone,
  reduce,
  flipped,
  onCardFlip,
  counted,
  onCardCounted,
}) {
  const noDrag = useNoDragRef()
  const offsetX = neighborOffset(target.width, peek, NEIGHBOR_SCALE)

  // Invert: con transform-origin en la esquina superior izquierda, un translate + scale
  // deja la carta grande calcada sobre la figurita de la grilla.
  const inverted = reduce
    ? {}
    : {
        x: originRect.left - target.left,
        y: originRect.top - target.top,
        scaleX: originRect.width / target.width,
        scaleY: originRect.height / target.height,
      }
  const identity = reduce ? {} : { x: 0, y: 0, scaleX: 1, scaleY: 1 }

  // El FLIP de salida sólo tiene sentido si la carta que se está mirando es la misma que
  // abrió el mazo: si el usuario navegó, encogerla hacia la figurita de otra carta sería
  // mentira. En ese caso se desvanece y listo.
  const flipExit = index === originIndex

  const go = (dir) => {
    const next = index + dir
    if (next < 0 || next >= deck.length) return
    onIndexChange(next)
  }

  const arrowClass =
    'absolute top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-950/80 text-slate-200 transition-colors duration-300 hover:border-accent/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-30'

  return (
    <>
      {deck.map((card, i) => {
        const offset = i - index
        // Ventana de tres: fuera de ella la carta ni se monta.
        if (Math.abs(offset) > 1) return null

        const isActive = offset === 0
        const isOrigin = i === originIndex

        return (
          <m.div
            key={card.key}
            // Sólo la carta de origen entra por FLIP; las vecinas aparecen con un fundido,
            // porque no vienen de ningún lado de la grilla.
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
            style={{
              position: 'absolute',
              left: target.left,
              top: target.top,
              width: target.width,
              height: target.height,
              transformOrigin: 'top left',
              zIndex: isActive ? 20 : 10,
            }}
          >
            {/* Capa aparte para la posición dentro del mazo: si el desplazamiento lateral
                compartiera elemento con el FLIP, Motion tendría que resolver la misma `x`
                desde dos fuentes. */}
            <m.div
              className="relative h-full w-full"
              animate={{
                x: offset * offsetX,
                scale: isActive ? 1 : NEIGHBOR_SCALE,
                opacity: isActive ? 1 : 0.5,
                rotateY: isActive || reduce ? 0 : offset * -NEIGHBOR_ROTATE,
              }}
              transition={SLIDE_SPRING}
              style={{
                // La perspectiva queda fija aunque la activa no rote: alternarla entre
                // un valor y `undefined` reescribiría el transform en el frame del
                // cambio de carta y se vería el salto.
                transformPerspective: PERSPECTIVE,
                // El blur es FIJO y nunca se anima: se rasteriza una vez y lo que se mueve
                // es la capa. Animar el radio sería repintar en cada frame.
                filter: isActive || reduce ? 'none' : 'blur(6px)',
              }}
            >
              {/* Halo de rareza: la misma iluminación que la carta del Hero, con el color
                  de la rareza del proyecto.
                  Cuelga de ESTA capa y no de la del FLIP porque acá es donde la carta se
                  desplaza: todas las cartas del mazo comparten la posición absoluta de
                  afuera y lo único que las separa es la `x` de esta capa. Colgado de la de
                  afuera, el halo de la carta entrante se encendía en el centro del mazo
                  antes de que la carta llegara hasta él.
                  Queda montado siempre en vez de condicionarse a `isActive`: así se apaga
                  con un fundido en lugar de desaparecer de golpe al cambiar de carta. */}
              {!reduce && (
                <m.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`pointer-events-none absolute -inset-6 rounded-[2.5rem] blur-2xl ${rarity.glow}`}
                />
              )}

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
                  isDesktop
                  reduce={reduce}
                  // El flipper se monta de nuevo cada vez que esta carta vuelve a ser la
                  // activa, así que `initialBack` es lo que la devuelve al lado en el que
                  // la dejaste. El registro lo lleva `ProjectDeck` (ver `flipped` ahí).
                  initialBack={flipped.has(i)}
                  onDeckNavigate={go}
                  onFlip={(back) => onCardFlip(i, back)}
                  instant={counted.has(i)}
                  onCounted={() => onCardCounted(i)}
                />
              ) : (
                // Las vecinas no giran ni reciben foco: para el teclado y el lector de
                // pantalla el mazo es una sola carta más sus controles (las flechas y los
                // puntos, que sí son botones de verdad). Por eso van `aria-hidden` y sin
                // rol: acá el click es un atajo con el mouse, no la vía accesible.
                //
                // `data-cursor="hover"` es justamente porque no son ni <button> ni
                // [role="button"]: sin él, el `cursor-pointer` reponía la manita NATIVA
                // encima del cursor custom (ver el bloque del cursor en index.css) y de
                // paso el anillo del cursor no crecía sobre una carta que sí es clickeable.
                <div
                  aria-hidden
                  data-cursor="hover"
                  onClick={() => onIndexChange(i)}
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
                    isDesktop
                    reduce={reduce}
                    // Sin esto la vecina siempre mostraba el frente aunque estuviera en
                    // `flipped`: `DeckCard` sólo respeta `initialBack` si se lo pasan, y acá
                    // no llegaba — era la causa real del bug de "se acomoda sola" al dejar
                    // de ser la activa (ver ítem 11 de notas.txt).
                    initialBack={flipped.has(i)}
                    instant={counted.has(i)}
                  />
                </div>
              )}
            </m.div>
          </m.div>
        )
      })}

      {deck.length > 1 && (
        <>
          <button
            type="button"
            ref={noDrag}
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label={lang === 'es' ? 'Carta anterior' : 'Previous card'}
            className={arrowClass}
            style={{ left: Math.max(12, target.left - peek - 56) }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            ref={noDrag}
            onClick={() => go(1)}
            disabled={index === deck.length - 1}
            aria-label={lang === 'es' ? 'Carta siguiente' : 'Next card'}
            className={arrowClass}
            style={{ right: Math.max(12, target.left - peek - 56) }}
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5"
            style={{ top: target.top + target.height + 20 }}
          >
            {deck.map((card, i) => (
              <button
                key={card.key}
                type="button"
                ref={noDrag}
                onClick={() => onIndexChange(i)}
                aria-label={`${lang === 'es' ? 'Ir a la carta' : 'Go to card'} ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-5 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}
