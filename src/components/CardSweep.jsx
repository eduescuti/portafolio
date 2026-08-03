import { m } from 'framer-motion'

/**
 * Tonos del barrido. `prism` es el de las cartas legendarias: violeta → magenta →
 * turquesa, la paleta de la legendaria de Clash Royale.
 *
 * No es más fuerte que el blanco, es más colorido. El pico de opacidad (0,35) parece más
 * alto que el 0,25 del blanco, pero un color saturado a esa opacidad contrasta MENOS
 * contra el navy que el blanco puro: a simple vista se lee como un brillo con más
 * carácter, no como un brillo que grita.
 */
const TONES = {
  default: 'bg-gradient-to-r from-transparent via-white/25 to-transparent',
  prism:
    'bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.35),rgba(236,72,153,0.35),rgba(45,212,191,0.35),transparent)]',
}

/**
 * Barrido de brillo. Es siempre el mismo elemento: lo que cambia es dónde se monta.
 *
 * Dentro del div interno opaco (`surface`) barre la superficie — la carta chica del hero.
 * Como hermano previo del div interno (`edge`) queda tapado en el centro por el contenido
 * opaco y sólo se ve en la banda de padding de `.holo-border`: el marco se ilumina y la
 * foto se ve completa. Como el div interno es `rounded-xl` y el externo `rounded-2xl`, en
 * las esquinas la banda es más ancha y el brillo se ensancha ahí solo.
 *
 * El recorrido llega a ±260% (no ±120%) porque el elemento mide media carta: por debajo
 * de 200% el centro brillante del gradiente queda estacionado dentro del marco durante el
 * `repeatDelay` y al reiniciar el ciclo pega un salto visible.
 *
 * El skew va por Motion y no por Tailwind: Motion escribe `transform` inline y pisaría
 * cualquier skew de clase.
 */
export default function CardSweep({ active = true, edge = false, tone = 'default' }) {
  return (
    <m.div
      aria-hidden
      style={{ skewX: 12 }}
      animate={active ? { x: ['-260%', '260%'] } : { x: '-260%' }}
      // Quieto, la transición pasa a duración 0: con `repeat: Infinity` sobre un valor
      // fijo Motion seguiría pidiendo frames para siempre sin mover nada — y en la grilla
      // de Proyectos eso son seis barridos latiendo en reposo.
      transition={
        active
          ? {
              duration: edge ? 2.2 : 2.5,
              repeat: Infinity,
              // El marco pasa más seguido: es una banda finita, un intervalo largo lo
              // hace parecer roto en vez de vivo.
              repeatDelay: edge ? 1.6 : 3.5,
              ease: 'easeInOut',
            }
          : { duration: 0 }
      }
      className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 ${TONES[tone] || TONES.default}`}
    />
  )
}

/**
 * Envoltorio del modo `edge`: recorta el barrido al radio de la carta. El `radius`
 * tiene que ser IDÉNTICO al de la raíz `.holo-border` que lo contiene o el brillo se
 * escapa por las esquinas. Por eso es un prop y no un valor fijo: la carta del Hero y la
 * figurita de proyecto no usan el mismo radio.
 */
export function EdgeSweep({ tone = 'default', radius = 'rounded-2xl lg:rounded-[2rem]' }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${radius}`}>
      <CardSweep active edge tone={tone} />
    </div>
  )
}
