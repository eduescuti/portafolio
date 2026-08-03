import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
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

/**
 * Figurita de proyecto en la grilla. Tocarla abre el mazo del proyecto (`ProjectDeck`).
 *
 * En reposo NO anima nada — ni flotación ni barrido en loop. Seis cartas latiendo a la vez
 * es justo el costo que este rediseño vino a sacar; el barrido aparece sólo en hover de
 * escritorio, y sólo en las rarezas que lo tienen.
 */
export default function ProjectCard({ project, t, lang, autoOpen, onOpened, onClosed }) {
  const reduce = useReducedMotion()
  const coarse = useCoarsePointer()
  const isDesktop = useIsDesktop()
  const [hovered, setHovered] = useState(false)
  const [deepLink, setDeepLink] = useState(null)

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
    // El overlay tapa la figurita, así que `onMouseLeave` nunca llega: sin este reset el
    // barrido de hover queda encendido en la grilla después de cerrar.
    setHovered(false)
    if (openCard()) onOpened?.(project.id, () => closeRef.current())
  }, [onOpened, openCard, project.id])

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
        onMouseLeave: () => setHovered(false),
      }

  // `rare` no tiene barrido: que la carta común no brille es lo que le da valor al brillo
  // de las otras dos.
  const hoverShine = hovered && !reduce && rarity.hoverSweep ? 'edge' : false

  return (
    <>
      <m.button
        ref={ref}
        type="button"
        onClick={handleOpen}
        aria-label={t(project.title)}
        aria-haspopup="dialog"
        whileHover={reduce || coarse ? undefined : { y: -6 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
        {...hoverProps}
        // `block` y no el inline-block que trae <button>: si no, queda apoyado en una
        // línea de texto y suma unos píxeles fantasma debajo de cada fila de la grilla.
        className={`group relative block aspect-[3/2] w-full cursor-pointer ${RADIUS} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950`}
      >
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
