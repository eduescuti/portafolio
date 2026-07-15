import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Cursor personalizado estilo damrod.dev:
 * - Un punto pequeño que sigue al mouse casi al instante.
 * - Un anillo que persigue con retraso (física de resorte).
 * - El anillo crece cuando pasás por encima de elementos interactivos.
 * - `mix-blend-mode: difference` lo hace visible sobre cualquier fondo.
 *
 * Se desactiva en táctil / sin puntero fino y respeta prefers-reduced-motion.
 * Añadí `data-cursor="hover"` a cualquier elemento para forzar el estado hover.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  // Posición cruda del mouse (el punto la usa directo).
  const x = useMotionValue(-50)
  const y = useMotionValue(-50)

  // El anillo persigue con retraso -> sensación de "arrastre".
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 })

  useEffect(() => {
    // Solo con mouse real (no táctil) y sin reduced-motion.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reduce) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const leaveWindow = () => setVisible(false)

    // Detecta hover sobre interactivos con delegación de eventos.
    const interactive = 'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
    const over = (e) => setHovering(Boolean(e.target.closest?.(interactive)))

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    document.addEventListener('mouseleave', leaveWindow)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('mouseleave', leaveWindow)
    }
  }, [reduce, x, y])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ mixBlendMode: 'difference' }}
      aria-hidden
    >
      {/* Punto central */}
      <m.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white"
        style={{ x, y, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Anillo que persigue */}
      <m.div
        className="absolute left-0 top-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: visible ? (hovering ? 1 : 0.6) : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </div>
  )
}
