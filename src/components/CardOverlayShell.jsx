import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { EXIT_MS } from '../lib/cardMotion'
import { useScrollLock } from '../lib/useScrollLock'

/**
 * Andamio común de todo lo que se abre encima de la página: la carta del Hero y el mazo
 * de un proyecto.
 *
 * Se hace cargo de lo que no cambia entre los dos —backdrop, bloqueo del scroll, trampa
 * de foco, Escape, salida accesible y la pista de gestos— para que cada overlay sólo
 * tenga que resolver cómo dispone sus cartas.
 */
export default function CardOverlayShell({ label, onClose, hint, showHint = true, children }) {
  const rootRef = useRef(null)

  // El overlay queda fijo hasta que el usuario lo cierre: el scroll de la página se
  // congela mientras esté montado (incluida la animación de salida).
  useScrollLock()

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const f = rootRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!f || f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <m.div ref={rootRef} className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={label}>
      {/* Backdrop separado del contenido: si el contenido fuera hijo de un contenedor que
          se desvanece, al cerrar desaparecería antes de terminar de encogerse. */}
      <m.div
        className="absolute inset-0 bg-navy-950/90 sm:bg-navy-950/80 sm:backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: EXIT_MS / 1000 }}
        onClick={onClose}
      />

      {children}

      {/* Cierre accesible: sin botón visible, el teclado y los lectores de pantalla
          necesitan una salida explícita además de Escape. Aparece solo al enfocarlo. */}
      <button
        type="button"
        onClick={onClose}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-xl focus:border focus:border-white/10 focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {hint?.close ?? 'Cerrar'}
      </button>

      <AnimatePresence>
        {hint && showHint && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // El exit anula el delay de entrada: si lo heredara, al cerrar Motion
            // esperaría 0,5s antes de empezar a desvanecerlo y `onExitComplete` llegaría
            // medio segundo tarde.
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="pointer-events-none absolute inset-x-0 bottom-6 space-y-0.5 text-center font-mono text-[10px] leading-tight text-slate-400"
          >
            <p>{hint.flip}</p>
            <p className="text-slate-500">{hint.close}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}
