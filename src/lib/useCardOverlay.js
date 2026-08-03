import { useCallback, useEffect, useRef, useState } from 'react'
import { CROSSFADE_MS, EXIT_MS } from './cardMotion'
import { computeTarget } from './cardGeometry'

/**
 * Coreografía de apertura y cierre de una carta que se abre en overlay.
 *
 * Lo que resuelve, y por qué no es sólo un `useState(false)`:
 *
 * - Mide el rect de la carta chica en el momento exacto de abrir (es el origen del FLIP).
 * - Apaga y enciende la carta chica con retardo respecto del overlay: las dos se solapan
 *   `CROSSFADE_MS` para que el relevo no muestre el salto de tamaño de tipografía.
 * - Recalcula ambas medidas si cambia el viewport con la carta abierta (rotar el
 *   teléfono invalida el origen y el destino a la vez).
 * - Devuelve el foco a la carta chica al terminar la salida, ya repintada.
 *
 * `ratio` puede cambiar entre renders (la figurita de proyecto es vertical en mobile y
 * horizontal en desktop): se lee desde una ref para no re-suscribir el listener de
 * resize en cada cambio.
 */
export function useCardOverlay({ ratio, targetOptions }) {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [geometry, setGeometry] = useState(null)
  const timerRef = useRef(null)

  const ratioRef = useRef(ratio)
  const optionsRef = useRef(targetOptions)
  ratioRef.current = ratio
  optionsRef.current = targetOptions

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  /**
   * `instant: true` abre sin FLIP: el origen pasa a ser el propio destino encogido al
   * 92% y centrado, así la carta aparece con un fade + scale en vez de volar desde la
   * grilla. Lo usa el deep link cuando la figurita de origen no está en pantalla y su
   * rect no sirve como punto de partida.
   */
  const openCard = useCallback((options = {}) => {
    const target = computeTarget(ratioRef.current, optionsRef.current)
    const rect = options.instant ? null : ref.current?.getBoundingClientRect()

    if (!options.instant && !rect) return false

    const originRect = rect ?? {
      left: target.left + target.width * 0.04,
      top: target.top + target.height * 0.04,
      width: target.width * 0.92,
      height: target.height * 0.92,
    }

    setGeometry({ originRect, target })
    setHidden(true)
    setOpen(true)
    return true
  }, [])

  const closeCard = useCallback(() => {
    setOpen(false)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setHidden(false), EXIT_MS - CROSSFADE_MS)
  }, [])

  // Rotar el teléfono con el overlay abierto invalida las dos medidas del FLIP.
  // Recalcularlas mantiene la carta centrada y deja un exit correcto.
  useEffect(() => {
    if (!open) return
    const onResize = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      setGeometry({ originRect: rect, target: computeTarget(ratioRef.current, optionsRef.current) })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  // Se pasa a <AnimatePresence onExitComplete>. El foco espera al repintado: sobre un
  // elemento todavía `visibility: hidden` el focus() no tiene efecto y el teclado se
  // quedaría sin punto de retorno.
  const onExitComplete = useCallback(() => {
    setHidden(false)
    requestAnimationFrame(() => ref.current?.focus())
  }, [])

  return { ref, open, hidden, geometry, openCard, closeCard, onExitComplete }
}
