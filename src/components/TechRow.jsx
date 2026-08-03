import { m } from 'framer-motion'
import { techIcons } from '../lib/techIcons'
import TechBadge from './TechBadge'

// El único requisito para que el loop no tenga corte es que UNA copia mida más que el
// contenedor: al recorrer 50%, la segunda copia queda donde estaba la primera. Con 5
// tecnologías eso no se cumple y aparece un hueco, así que la lista se repite hasta
// llegar al ancho objetivo. No se mide el DOM: alcanza con estimar y pasarse — los
// chips de más nunca entran en pantalla y son spans de CSS puro, no cuestan nada.
// Por tamaño de chip: ancho fijo (padding ×2 + ícono + gap + mr-1.5) y ancho de carácter
// de la mono. La estimación alimenta dos cosas —cuántas copias repetir y la duración del
// loop—, y la segunda es la que obliga a tenerla por tamaño: la duración sale de
// `estimate / speed`, así que estimar de más no sólo agrega copias invisibles, también
// frena la tira por debajo de la velocidad pedida.
const CHIP_FIXED_PX = { xs: 32, sm: 39, md: 45 }
const CHAR_PX = { xs: 6, sm: 6.6, md: 7.2 }
const TARGET_COPY_PX = 1040 // el contenedor más ancho donde se usa la tira (Trayectoria)

const estimate = (list, size) =>
  list.reduce((w, n) => w + n.length * (CHAR_PX[size] ?? CHAR_PX.sm) + (CHIP_FIXED_PX[size] ?? CHIP_FIXED_PX.sm), 0)

const MASK = 'linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent)'

/**
 * Tira de tecnologías en movimiento continuo. Se detiene cuando no está a la vista
 * (`active={false}`): quieta sigue siendo legible, así que no hace falta desmontarla.
 *
 * `speed` va en px/s y la duración se deriva del ancho, no al revés: así dos tiras con
 * distinta cantidad de chips se mueven a la misma velocidad aparente.
 */
export default function TechRow({
  items,
  active = false,
  reverse = false,
  speed = 42,
  fade = 'mask',
  fadeClass = 'from-navy-900',
  tone = 'brand',
  size = 'sm',
  className = '',
}) {
  // La tira es de tecnologías, no de capacidades: sólo entra lo que tiene logo propio.
  // Un "Email Marketing" o un "APIs" sin ícono queda como texto suelto entre logos y
  // rompe la lectura. El filtro es la red de seguridad — lo que no es tecnología no
  // debería estar en `tech` de entrada, sino entre los highlights del proyecto.
  const real = items.filter((name) => techIcons[name])
  if (real.length === 0) return null

  const reps = Math.max(1, Math.ceil(TARGET_COPY_PX / estimate(real, size)))
  const copy = Array.from({ length: reps }, () => real).flat()
  const duration = estimate(copy, size) / speed

  const from = reverse ? '-50%' : '0%'
  const to = reverse ? '0%' : '-50%'

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      // El difuminado por máscara no necesita conocer el color de fondo, y va sobre el
      // contenedor —que es estático—, así que se rasteriza una vez: lo que se mueve es
      // el hijo. Es el modo por defecto y el único que sirve sobre fondos translúcidos.
      style={fade === 'mask' ? { maskImage: MASK, WebkitMaskImage: MASK } : undefined}
    >
      {/* La lista va duplicada y el recorrido es exactamente 50%: al terminar, la copia
          quedó donde estaba el original y el ciclo reinicia sin corte. El margen va en
          cada chip (no `gap`) porque un gap final rompería esa equivalencia. */}
      <m.div
        className="flex w-max"
        animate={active ? { x: [from, to] } : { x: from }}
        // Pausada, la transición pasa a duración 0: con `repeat: Infinity` sobre un
        // valor fijo Motion seguiría pidiendo frames para siempre sin mover nada.
        transition={active ? { duration, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
      >
        {[...copy, ...copy].map((name, i) => (
          <TechBadge
            key={`${name}-${i}`}
            name={name}
            size={size}
            tone={tone}
            // `--static`: sin hover. El contenedor recorta y el chip se mueve, así que
            // el efecto se cortaba arriba y abajo (ver .tech-badge--static en index.css).
            className="mr-1.5 tech-badge--static"
          />
        ))}
      </m.div>

      {/* Modo `gradient`: dos franjas del color del fondo en vez de una máscara. Existe
          para el dorso de ProfileCard, que vive dentro de un elemento que rota en 3D —
          ahí una máscara se re-evalúa en cada frame del giro. Fuera de la carta no hay
          rotación y el modo `mask` es estrictamente mejor. */}
      {fade === 'gradient' && (
        <>
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r to-transparent ${fadeClass}`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 w-5 bg-gradient-to-l to-transparent ${fadeClass}`}
          />
        </>
      )}
    </div>
  )
}
