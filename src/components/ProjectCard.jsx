import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { DECK_PEEK } from '../lib/projectDeck'
import { getRarity, sweepTone } from '../lib/rarity'
import { useCardOverlay } from '../lib/useCardOverlay'
import { useCoarsePointer, useIsDesktop } from '../lib/useDeviceCapabilities'
import { CardFace, RADIUS } from './DeckCard'
import ProjectDeck from './ProjectDeck'

// Las figuritas son horizontales en todos los tamaños. El aspecto de la carta chica y el
// ratio que usa `computeTarget` para la abierta tienen que ser el MISMO número: con los
// dos rects proporcionales el FLIP escala parejo en X e Y y la imagen no se deforma.
const RATIO = 3 / 2

// Grados de inclinación en los bordes de la carta y resorte que la lleva. Son los mismos
// valores del tilt de `CardFlipper`: la figurita cerrada y la carta abierta tienen que
// responder al mouse con la misma intensidad, o se leen como dos objetos distintos.
const TILT_DEG = 10
const TILT_SPRING = { stiffness: 150, damping: 18 }

/**
 * Figurita de proyecto en la grilla. Tocarla abre el mazo del proyecto (`ProjectDeck`).
 *
 * En reposo NO anima nada — ni flotación ni barrido en loop. Seis cartas latiendo a la vez
 * es justo el costo que este rediseño vino a sacar. Todo lo que da la sensación de "carta"
 * —el halo de rareza, el barrido y la inclinación 3D— vive en el hover de escritorio, que
 * ocurre de a una carta por vez.
 */
export default function ProjectCard({ project, t, lang, autoOpen, onOpened, onClosed }) {
  const reduce = useReducedMotion()
  const coarse = useCoarsePointer()
  const isDesktop = useIsDesktop()
  const [hovered, setHovered] = useState(false)
  const [deepLink, setDeepLink] = useState(null)

  // Inclinación 3D que sigue al puntero. Va en motion values y no en estado: se actualiza
  // en cada frame del movimiento del mouse y pasarla por render sería un re-render por
  // frame, con seis figuritas montadas.
  const tiltXRaw = useMotionValue(0)
  const tiltYRaw = useMotionValue(0)
  const rotateX = useSpring(tiltXRaw, TILT_SPRING)
  const rotateY = useSpring(tiltYRaw, TILT_SPRING)
  const tiltEnabled = !reduce && !coarse

  const resetTilt = useCallback(() => {
    tiltXRaw.set(0)
    tiltYRaw.set(0)
  }, [tiltXRaw, tiltYRaw])

  const rarity = getRarity(project.rarity)
  const tone = sweepTone(project.rarity)

  const peek = isDesktop ? DECK_PEEK : 0
  const { ref, open, hidden, geometry, openCard, closeCard, onExitComplete } = useCardOverlay({
    ratio: RATIO,
    targetOptions: {
      max: isDesktop ? 780 : 420,
      peek,
      // En mobile la figurita ya ocupa todo el ancho de la columna (100vw menos los 48px
      // de padding de la sección). Con el gutter por defecto de 40 la carta abierta
      // habría quedado casi calcada sobre la cerrada; con 24 al menos crece.
      gutter: isDesktop ? 40 : 24,
    },
  })

  const handleClose = useCallback(() => {
    closeCard()
    onClosed?.()
  }, [closeCard, onClosed])

  // El cierre se expone por ref y no por prop para que la sección pueda dispararlo desde
  // el listener de `popstate` sin re-renderizar toda la grilla en cada apertura.
  const closeRef = useRef(handleClose)
  closeRef.current = handleClose

  const handleOpen = useCallback(() => {
    setDeepLink(null)
    // El overlay tapa la figurita, así que `onMouseLeave` nunca llega: sin estos resets el
    // barrido y la inclinación quedan encendidos en la grilla después de cerrar.
    setHovered(false)
    resetTilt()
    if (openCard()) onOpened?.(project.id, () => closeRef.current())
  }, [onOpened, openCard, project.id, resetTilt])

  // Apertura por link directo. Si la figurita quedó fuera de pantalla su rect no sirve
  // como origen del FLIP: en ese caso se abre con fade + scale desde el centro.
  useEffect(() => {
    if (!autoOpen) return
    const rect = ref.current?.getBoundingClientRect()
    const visible =
      Boolean(rect) && rect.width > 0 && rect.top < window.innerHeight && rect.bottom > 0

    setDeepLink(autoOpen)
    openCard({ instant: !visible })
    onOpened?.(project.id, () => closeRef.current(), { fromLink: true })
    // Sólo debe correr cuando llega la orden de abrir por link.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen])

  const hoverProps = coarse
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => {
          setHovered(false)
          resetTilt()
        },
        onPointerMove: (e) => {
          if (!tiltEnabled) return
          const r = e.currentTarget.getBoundingClientRect()
          // El eje X se invierte: el mouse arriba tiene que hundir el borde de arriba, que
          // es un rotateX positivo hacia el lado contrario.
          tiltXRaw.set(-((e.clientY - r.top) / r.height - 0.5) * TILT_DEG)
          tiltYRaw.set(((e.clientX - r.left) / r.width - 0.5) * TILT_DEG)
        },
      }

  // `rare` no tiene barrido: que la carta común no brille es lo que le da valor al brillo
  // de las otras dos.
  const hoverShine = hovered && !reduce && rarity.hoverSweep ? 'edge' : false
  const glowOn = hovered && !reduce

  return (
    <>
      <m.button
        ref={ref}
        type="button"
        onClick={handleOpen}
        aria-label={t(project.title)}
        aria-haspopup="dialog"
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
        {...hoverProps}
        // `block` y no el inline-block que trae <button>: si no, queda apoyado en una
        // línea de texto y suma unos píxeles fantasma debajo de cada fila de la grilla.
        //
        // `text-left` porque el UA stylesheet centra el texto de TODO <button> y Preflight
        // no lo resetea: sin esto el título y el subtítulo de la figurita salían centrados,
        // mientras que los de la misma carta abierta (que es un div) salían a la izquierda.
        //
        // La perspectiva vive acá y la inclinación en el hijo a propósito: este es el
        // elemento que mide `useCardOverlay` para el origen del FLIP, y si rotara, su
        // bounding box crecería y la carta abierta arrancaría desde un rect deformado.
        className={`group relative block aspect-[3/2] w-full cursor-pointer text-left ${RADIUS} [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950`}
      >
        <m.div
          className="relative h-full"
          style={tiltEnabled ? { rotateX, rotateY } : undefined}
          whileHover={reduce || coarse ? undefined : { y: -6 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          {/* Halo de rareza. Va DENTRO de la capa que se levanta e inclina —igual que en
              la carta del Hero— porque es la luz de esta carta y no una mancha en el
              fondo: si quedara afuera, la carta se movería y el halo se quedaría clavado.
              Antes que `CardFace` en el DOM y sin z-index: las dos capas están
              posicionadas, así que el orden alcanza para que la carta tape el centro del
              halo y sólo se vea lo que desborda.
              Sólo existe en hover: seis halos encendidos en reposo son exactamente las
              seis cartas latiendo que este rediseño vino a sacar. */}
          <m.div
            aria-hidden
            initial={false}
            animate={{ opacity: glowOn ? 1 : 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={`pointer-events-none absolute -inset-3 rounded-[1.75rem] blur-xl ${rarity.glow}`}
          />

          <CardFace
            src={project.imageBackground}
            project={project}
            title={t(project.title)}
            subtitle={t(project.subtitle)}
            rarity={rarity}
            tone={tone}
            shine={hoverShine}
            zoomOnHover
          />
        </m.div>
      </m.button>

      {createPortal(
        <AnimatePresence onExitComplete={onExitComplete}>
          {open && geometry && (
            <ProjectDeck
              project={project}
              originRect={geometry.originRect}
              target={geometry.target}
              peek={peek}
              onClose={handleClose}
              reduce={reduce}
              t={t}
              lang={lang}
              initialIndex={deepLink?.index ?? 0}
              initialBack={Boolean(deepLink?.back)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
