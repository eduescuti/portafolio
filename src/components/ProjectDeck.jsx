import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildDeck } from '../lib/projectDeck'
import { getRarity, sweepTone } from '../lib/rarity'
import { useIsDesktop } from '../lib/useDeviceCapabilities'
import CardOverlayShell from './CardOverlayShell'
import DesktopDeck from './DesktopDeck'
import MobileDeck from './MobileDeck'

/**
 * El mazo de un proyecto: la portada más una carta por captura.
 *
 * El despliegue se bifurca por dispositivo y no es un detalle de estilo, son dos
 * interacciones distintas:
 *   · Desktop → carrusel horizontal, vecinas borrosas a los costados, se navega
 *     arrastrando o con las flechas (`DesktopDeck`).
 *   · Mobile → pila vertical, se navega con scroll nativo (`MobileDeck`).
 *
 * Lo común —qué cartas hay, cuál está activa, el andamio del overlay— vive acá.
 */
export default function ProjectDeck({
  project,
  originRect,
  target,
  peek,
  onClose,
  reduce,
  t,
  lang,
  initialIndex = 0,
  initialBack = false,
}) {
  const deck = useMemo(() => buildDeck(project), [project])
  const isDesktop = useIsDesktop()
  const rarity = getRarity(project.rarity)
  const tone = sweepTone(project.rarity)

  const originIndex = Math.min(Math.max(initialIndex, 0), deck.length - 1)
  const [index, setIndex] = useState(originIndex)

  // La pista de gestos es una pista, no un cartel: se va apenas el usuario demuestra que
  // ya entendió, sea girando una carta o moviéndose por el mazo.
  const [interacted, setInteracted] = useState(initialBack)

  /**
   * Qué cartas del mazo quedaron mostrando el dorso.
   *
   * Vive acá y no dentro de cada `CardFlipper` porque el flipper se DESMONTA cuando su
   * carta deja de ser la activa: las inactivas dibujan sólo el frente (una carta borrosa
   * mostrando un dorso no se entiende). Sin este registro, volver a una carta que habías
   * dado vuelta la mostraba de frente de nuevo, como si no hubiera pasado nada.
   *
   * Es un Set de índices y no un booleano del mazo entero: cada carta se acuerda de lo
   * suyo. Y se muere con el overlay —cerrar y volver a abrir el proyecto arranca el mazo
   * de cero—, que es lo que quiere decir "únicamente en ese carrusel".
   */
  const [flipped, setFlipped] = useState(() =>
    initialBack ? new Set([originIndex]) : new Set()
  )

  const onCardFlip = useCallback((i, back) => {
    setFlipped((prev) => {
      // El flipper avisa en cada giro asentado, incluso cuando vuelve al estado en el que
      // ya estaba: devolver el mismo Set evita un render que no cambia nada.
      if (prev.has(i) === back) return prev
      const next = new Set(prev)
      if (back) next.add(i)
      else next.delete(i)
      return next
    })
    setInteracted(true)
  }, [])

  // El índice también vive en una ref para poder comparar sin meter un efecto secundario
  // dentro del updater de `setIndex` (React puede llamarlo dos veces en StrictMode). Sin
  // esta guarda, el listener de scroll de mobile —que dispara con el mismo valor muchas
  // veces— apagaría la pista de gestos apenas se abre el mazo.
  const indexRef = useRef(originIndex)
  const onIndexChange = useCallback((next) => {
    if (indexRef.current === next) return
    indexRef.current = next
    setIndex(next)
    setInteracted(true)
  }, [])

  // Flechas del teclado para navegar el mazo. Escape lo maneja el shell.
  useEffect(() => {
    if (deck.length < 2) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onIndexChange(Math.min(indexRef.current + 1, deck.length - 1))
      else if (e.key === 'ArrowLeft') onIndexChange(Math.max(indexRef.current - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [deck.length, onIndexChange])

  const es = lang === 'es'
  const many = deck.length > 1

  const hint = {
    flip: many
      ? isDesktop
        ? es
          ? 'Tocá para girar · Deslizá para ver más'
          : 'Tap to flip · Swipe for more'
        : es
          ? 'Tocá para girar · Deslizá hacia abajo para ver más'
          : 'Tap to flip · Swipe down for more'
      : es
        ? 'Tocá para girar'
        : 'Tap to flip',
    close: es ? 'Tocá afuera para cerrar' : 'Tap outside to close',
  }

  const shared = {
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
  }

  return (
    <CardOverlayShell
      label={t(project.title)}
      onClose={onClose}
      hint={hint}
      // Se va al primer giro o al primer cambio de carta. Con la carta ya girada por deep
      // link ni se muestra: la pista de "tocá para girar" llegaría tarde.
      showHint={!interacted}
    >
      {isDesktop ? (
        <DesktopDeck {...shared} peek={peek} />
      ) : (
        <MobileDeck {...shared} onClose={onClose} />
      )}
    </CardOverlayShell>
  )
}
