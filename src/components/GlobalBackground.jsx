import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Fondo vivo para toda la página (decisión #9):
 * - Aurora navy que deriva lentamente (CSS animations existentes).
 * - Glow de acento que sigue al cursor con física de resorte.
 * - Textura de ruido tenue para quitar la sensación de "plano".
 * Capa fija detrás de todo, sin capturar eventos.
 */
export default function GlobalBackground() {
  const reduce = useReducedMotion()

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.3)
  const x = useSpring(mx, { stiffness: 40, damping: 20 })
  const y = useSpring(my, { stiffness: 40, damping: 20 })
  const left = useTransform(x, (v) => `${v * 100}%`)
  const top = useTransform(y, (v) => `${v * 100}%`)

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, reduce])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base: degradado navy suave */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#0f2340_0%,#0a1628_55%,#070f1d_100%)]" />

      {/* Aurora que deriva */}
      <div className="animate-aurora absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent/12 blur-3xl" />
      <div className="animate-aurora-2 absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full bg-indigo-600/12 blur-3xl" />
      <div className="animate-aurora-3 absolute bottom-0 left-1/4 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-3xl" />

      {/* Glow que sigue el cursor */}
      {!reduce && (
        <motion.div
          className="absolute h-[42rem] w-[42rem] rounded-full bg-accent/10 blur-[120px]"
          style={{ left, top, x: '-50%', y: '-50%' }}
        />
      )}

      {/* Textura de ruido */}
      <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-soft-light" />

      {/* Viñeta para foco */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_60%,rgba(5,10,20,0.55)_100%)]" />
    </div>
  )
}
