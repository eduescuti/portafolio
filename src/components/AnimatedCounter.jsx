import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Cuenta desde 0 hasta `value` cuando entra en viewport.
 * `decimals` para valores como 2,5. `locale` para el separador (coma en es-AR).
 *
 * `instant` salta la cuenta y dibuja `value` directo: lo usa el dorso de una carta del
 * mazo que ya contó una vez (ver `ProjectDeck`), porque `DeckCard` se desmonta cada vez que
 * su carta deja de ser la activa y el `once` de `useInView` no sobrevive ese remontaje —sin
 * `instant` el número volvería a 0 y creciera cada vez que el usuario vuelve a esa carta.
 * `onComplete` es cómo este contador avisa hacia arriba que ya corrió, para que la próxima
 * vez lo salteen.
 */
export default function AnimatedCounter({
  value,
  decimals = 0,
  duration = 1400,
  suffix = '',
  locale = 'es-AR',
  instant = false,
  onComplete,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(instant ? value : 0)

  useEffect(() => {
    if (instant) {
      setDisplay(value)
      return
    }
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      onComplete?.()
      return
    }

    let rafId
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) rafId = requestAnimationFrame(tick)
      else {
        setDisplay(value)
        onComplete?.()
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, reduce, instant])

  const formatted = display.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}
