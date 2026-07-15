import { useEffect } from 'react'
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useCoarsePointer } from '../lib/useDeviceCapabilities'

/**
 * Fondo vivo para toda la página (decisión #9):
 * - Aurora navy que deriva lentamente (CSS animations existentes).
 * - Glow de acento que sigue al cursor con física de resorte.
 * - Textura de ruido tenue para quitar la sensación de "plano".
 * Capa fija detrás de todo, sin capturar eventos.
 *
 * Optimización mobile: el glow que sigue al cursor se apaga en táctil (no aporta y
 * cuesta caro), y el movimiento va por `transform` (x/y) en vez de left/top para
 * resolverse en el compositor (sin layout ni paint). Blur y blobs se reducen en mobile.
 */
export default function GlobalBackground() {
  const reduce = useReducedMotion()
  const coarse = useCoarsePointer()
  const cursorGlow = !reduce && !coarse

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.3)
  const x = useSpring(mx, { stiffness: 40, damping: 20 })
  const y = useSpring(my, { stiffness: 40, damping: 20 })
  // Transform puro (compositor) en vez de left/top (layout + paint por frame).
  const tx = useTransform(x, (v) => `calc(${v * 100}vw - 50%)`)
  const ty = useTransform(y, (v) => `calc(${v * 100}vh - 50%)`)

  useEffect(() => {
    if (!cursorGlow) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, cursorGlow])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base: degradado navy suave */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#0f2340_0%,#0a1628_55%,#070f1d_100%)]" />

      {/* Aurora que deriva. En mobile: menos blur y (vía CSS) sin animación. */}
      <div className="animate-aurora absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent/12 blur-2xl md:blur-3xl" />
      <div className="animate-aurora-2 absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full bg-indigo-600/12 blur-2xl md:blur-3xl" />
      {/* Tercer blob solo desde md: en mobile ahorramos un área grande de repintado. */}
      <div className="animate-aurora-3 absolute bottom-0 left-1/4 hidden h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-3xl md:block" />

      {/* Glow que sigue el cursor (solo desktop con puntero fino) */}
      {cursorGlow && (
        <m.div
          className="absolute left-0 top-0 h-[42rem] w-[42rem] rounded-full bg-accent/10 blur-[120px]"
          style={{ x: tx, y: ty, willChange: 'transform' }}
        />
      )}

      {/* Textura de ruido. El mix-blend se apaga en mobile (capa de composición cara). */}
      <div className="bg-noise absolute inset-0 opacity-[0.035] md:mix-blend-soft-light" />

      {/* Viñeta para foco */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_60%,rgba(5,10,20,0.55)_100%)]" />
    </div>
  )
}
