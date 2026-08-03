import { useState } from 'react'
import { m } from 'framer-motion'
import { CROSSFADE_MS, EXIT_MS, EXIT_TWEEN, OPEN_SPRING } from '../lib/cardMotion'
import CardFlipper from './CardFlipper'
import CardOverlayShell from './CardOverlayShell'

/**
 * Una sola carta abierta en overlay: apertura por FLIP y giro 3D. Hoy la usa únicamente
 * la tarjeta del Hero — las figuritas de proyecto pasaron a `ProjectDeck`, que abre un
 * mazo en vez de una carta suelta.
 *
 * La apertura es un FLIP manual, no `layoutId`: el shared layout de Motion mide y
 * proyecta el elemento en el hilo principal y traba en táctil —fue justamente lo que hizo
 * tirar al modal viejo de Proyectos—. Acá se anima solo translate + scale desde el
 * rectángulo de la carta chica; left/top/width/height se escriben una vez y no se tocan
 * más.
 */
export default function FlipCard({
  originRect,
  target,
  onClose,
  reduce,
  label,
  flipLabel,
  hint,
  initialBack = false,
  front,
  back,
}) {
  // La pista de gestos se va apenas la carta gira por primera vez: es una pista, no un
  // cartel permanente.
  const [flipped, setFlipped] = useState(initialBack)

  // Invert: con transform-origin en la esquina superior izquierda, un translate + scale
  // deja la carta grande calcada sobre la chica. El exit reusa lo mismo al revés.
  const inverted = reduce
    ? {}
    : {
        x: originRect.left - target.left,
        y: originRect.top - target.top,
        scaleX: originRect.width / target.width,
        scaleY: originRect.height / target.height,
      }
  const identity = reduce ? {} : { x: 0, y: 0, scaleX: 1, scaleY: 1 }

  return (
    <CardOverlayShell label={label} onClose={onClose} hint={hint} showHint={!flipped}>
      <m.div
        initial={inverted}
        animate={identity}
        // El exit lleva su propia transición: un tween de duración fija, igual a la del
        // backdrop. Con un spring, Motion da la salida por terminada recién cuando el
        // resorte se asienta (~1s), mucho después de que el backdrop se apagó — y la
        // carta chica de origen se quedaba oculta ese segundo de más antes de reaparecer.
        // La opacidad se apaga al final, para solaparse con la carta chica que vuelve.
        exit={{
          ...inverted,
          opacity: 0,
          transition: {
            ...EXIT_TWEEN,
            opacity: {
              delay: (EXIT_MS - CROSSFADE_MS) / 1000,
              duration: CROSSFADE_MS / 1000,
            },
          },
        }}
        transition={OPEN_SPRING}
        style={{
          position: 'absolute',
          left: target.left,
          top: target.top,
          width: target.width,
          height: target.height,
          transformOrigin: 'top left',
        }}
      >
        <CardFlipper
          front={front}
          back={back}
          reduce={reduce}
          label={flipLabel}
          initialBack={initialBack}
          drag="flip"
          onFlip={() => setFlipped(true)}
        />
      </m.div>
    </CardOverlayShell>
  )
}
