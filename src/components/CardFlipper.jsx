import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, m, useIsPresent, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EXIT_MS, FLIP_SPRING } from '../lib/cardMotion'
import { useCoarsePointer } from '../lib/useDeviceCapabilities'

/**
 * Superficie que gira en 3D. No sabe nada de overlays, posiciones ni backdrops: llena a
 * su contenedor y lo único que hace es mostrar el frente o el dorso.
 *
 * Se separó de `FlipCard` cuando apareció el mazo (`ProjectDeck`): ahí el arrastre
 * horizontal pasó a navegar entre cartas, así que el giro tuvo que quedar sólo en el tap
 * y la carta dejó de ser dueña del gesto. La tarjeta del Hero, que no tiene mazo, sigue
 * girando también con arrastre vía `drag="flip"`.
 *
 * El dorso se monta recién al primer giro: así los contadores y las tiras de tecnologías
 * arrancan cuando se ven y no cuando se abre la carta.
 */
export default function CardFlipper({
  front,
  back,
  reduce,
  label,
  initialBack = false,
  drag = false,
  tilt = true,
  onFlip,
  onDeckNavigate,
  radius = 'rounded-2xl lg:rounded-[2rem]',
}) {
  const cardRef = useRef(null)
  const [revealed, setRevealed] = useState(initialBack)
  const [isBack, setIsBack] = useState(initialBack)

  // Ángulo real de la carta. Es un motion value y no estado de React porque durante el
  // arrastre se actualiza en cada frame: pasarlo por render sería un re-render por frame.
  const rotate = useMotionValue(initialBack ? 180 : 0)
  // Ángulo asentado, en múltiplos de 180 CON SIGNO. No alcanza con un booleano
  // frente/dorso: si el gesto llevó la carta a -120° y el destino fuera siempre +180,
  // al soltar volvería girando para el otro lado.
  const angleRef = useRef(initialBack ? 180 : 0)
  const draggingRef = useRef(false)
  const revealedRef = useRef(initialBack)

  // Tilt de puntero, solo con mouse. En touch los valores quedan en 0 y no cuestan nada.
  const coarse = useCoarsePointer()
  const tiltEnabled = tilt && !reduce && !coarse
  const tiltXRaw = useMotionValue(0)
  const tiltYRaw = useMotionValue(0)
  const tiltX = useSpring(tiltXRaw, { stiffness: 150, damping: 18 })
  const tiltY = useSpring(tiltYRaw, { stiffness: 150, damping: 18 })
  const rotateY = useTransform([rotate, tiltY], ([r, t]) => r + t)

  const reveal = useCallback(() => {
    if (revealedRef.current) return
    revealedRef.current = true
    setRevealed(true)
  }, [])

  const settle = useCallback(
    (next) => {
      const changed = next !== angleRef.current
      angleRef.current = next
      const back = (((next / 180) % 2) + 2) % 2 === 1
      setIsBack(back)
      if (back) reveal()
      if (changed) onFlip?.(back)
      animate(rotate, next, reduce ? { duration: 0 } : FLIP_SPRING)
    },
    [onFlip, reduce, reveal, rotate]
  )

  const flip = useCallback(() => settle(angleRef.current + 180), [settle])

  useEffect(() => {
    // `preventScroll` no es un detalle: en el mazo de mobile las cartas viven dentro de un
    // contenedor que scrollea, y cada vez que cambia la carta activa se monta un flipper
    // nuevo. Un focus() normal haría que el navegador la traiga a la vista y le pelearía
    // la inercia al dedo justo mientras el usuario está scrolleando.
    cardRef.current?.focus({ preventScroll: true })
  }, [])

  // Al cerrar, la carta se desgira mientras se encoge: tiene que aterrizar mostrando el
  // frente, porque es el frente lo que dibuja la figurita chica que la está esperando en
  // la grilla. Sin esto, el dorso se encoge hasta la figurita y en el último frame el
  // relevo cambia de cara de golpe.
  //
  // El disparador es `useIsPresent` y no el onClose de cada overlay: el desgiro es
  // asunto de la carta, y así lo heredan por igual la del Hero y las seis del mazo sin
  // que ninguno de los dos tenga que acordarse de pedirlo.
  //
  // Vuelve al múltiplo de 360 más cercano y no a 0: si el usuario giró tres veces, no
  // tiene que pegar tres vueltas de vuelta.
  const isPresent = useIsPresent()
  useEffect(() => {
    if (isPresent) return
    tiltXRaw.set(0)
    tiltYRaw.set(0)
    const home = Math.round(angleRef.current / 360) * 360
    if (home === angleRef.current) return
    angleRef.current = home
    // Tween de la misma duración que la salida del FLIP, no el spring del giro: el
    // resorte se asienta bastante después de que la carta ya aterrizó.
    animate(rotate, home, reduce ? { duration: 0 } : { duration: EXIT_MS / 1000, ease: 'easeOut' })
  }, [isPresent, reduce, rotate, tiltXRaw, tiltYRaw])

  // Durante el arrastre el tilt se apaga: si no, se sumaría al giro del gesto y el
  // ángulo dejaría de seguir al dedo con precisión.
  const onPointerMove = (e) => {
    if (!tiltEnabled || draggingRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    tiltXRaw.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
    tiltYRaw.set(((e.clientX - r.left) / r.width - 0.5) * 10)
  }

  const resetTilt = () => {
    tiltXRaw.set(0)
    tiltYRaw.set(0)
  }

  // Base común de los dos modos de arrastre. `draggingRef` + el `setTimeout(…, 0)` del
  // final existen porque el click sintético llega DESPUÉS del dragEnd: sin la bandera, un
  // arrastre terminaría además girando la carta.
  const dragBase = {
    drag: 'x',
    dragConstraints: { left: 0, right: 0 },
    dragMomentum: false,
    dragDirectionLock: true,
  }

  const releaseDrag = () =>
    setTimeout(() => {
      draggingRef.current = false
    }, 0)

  let dragProps = {}

  if (drag === 'flip') {
    // Modo del Hero: la carta sigue al dedo y el gesto la termina de girar.
    dragProps = {
      ...dragBase,
      dragElastic: 0,
      onDrag: (e, info) => {
        draggingRef.current = true
        if (reduce) return
        // El signo es negativo porque un rotateY positivo desplaza la cara visible hacia
        // la izquierda: para que la carta siga al dedo hay que restar.
        rotate.set(angleRef.current - info.offset.x)
        if (Math.abs(info.offset.x) > 10) reveal()
      },
      onDragEnd: (e, info) => {
        const passed = Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 400
        // Se completa en la dirección que el gesto ya traía, no siempre hacia 180.
        const driver = Math.abs(info.offset.x) > 5 ? info.offset.x : info.velocity.x
        const dir = driver < 0 ? 1 : -1
        settle(passed ? angleRef.current + dir * 180 : angleRef.current)
        releaseDrag()
      },
    }
  } else if (drag === 'deck') {
    // Modo del mazo en desktop: el arrastre NO gira, pasa a la carta siguiente o anterior.
    // La goma del `dragElastic` es la que da la sensación de que la carta se resiste antes
    // de saltar a la próxima.
    dragProps = {
      ...dragBase,
      dragElastic: 0.18,
      onDrag: () => {
        draggingRef.current = true
      },
      onDragEnd: (e, info) => {
        const passed = Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 400
        if (passed) onDeckNavigate?.(info.offset.x < 0 ? 1 : -1)
        releaseDrag()
      },
    }
  }

  return (
    <div className="h-full w-full [perspective:1200px]">
      <m.div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-pressed={isBack}
        className={`relative h-full w-full cursor-pointer select-none ${radius} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950 [transform-style:preserve-3d]`}
        style={{ rotateY, rotateX: tiltX }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        onClick={() => {
          if (draggingRef.current) return
          flip()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            flip()
          }
        }}
        {...dragProps}
      >
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:translateZ(0)]">
          {front()}
        </div>
        {/* translateZ(0) en ambas caras: mitigación del z-fighting de preserve-3d en
            Safari. */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(0)]">
          {revealed && back(isBack && !reduce)}
        </div>
      </m.div>
    </div>
  )
}
