import { useEffect, useState } from 'react'

/**
 * Media query reactiva. Evalúa ya en el primer render (app SPA, sin SSR): si arrancara
 * en `false` y se corrigiera recién en el efecto, habría un frame con el valor
 * equivocado — en mobile alcanzaría a montarse el glow del cursor, y en desktop el
 * acordeón de Contacto se abriría animándose en cada carga de página.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}

/**
 * Detecta dispositivos con puntero grueso / sin hover (mobile, tablets táctiles).
 * Se usa para apagar efectos caros (glow que sigue al cursor, parallax, smooth-scroll
 * inercial) donde no aportan y sí cuestan FPS.
 */
export function useCoarsePointer() {
  return useMediaQuery('(hover: none), (pointer: coarse)')
}

/**
 * True desde el breakpoint `lg` de Tailwind (1024px). Se usa donde el layout
 * necesita decidirlo en JS y no alcanza con clases CSS: por ejemplo el acordeón
 * de Contacto, que en mobile desmonta el formulario y en desktop debe mostrarlo
 * siempre.
 */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}

