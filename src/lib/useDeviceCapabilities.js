import { useEffect, useState } from 'react'

/**
 * Detecta dispositivos con puntero grueso / sin hover (mobile, tablets táctiles).
 * Se usa para apagar efectos caros (glow que sigue al cursor, parallax, smooth-scroll
 * inercial) donde no aportan y sí cuestan FPS.
 */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return coarse
}
