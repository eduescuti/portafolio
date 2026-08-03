import contributions from '../data/github-contributions.json'
import AnimatedCounter from './AnimatedCounter'

// Geometría de la grilla, en unidades del viewBox. El SVG se estira al ancho disponible,
// así que estos números son proporciones y no píxeles finales.
const CELL = 4
const GAP = 1.5
const STEP = CELL + GAP
const ROWS = 7

/**
 * Cinco niveles derivados del acento del sitio, no la paleta verde de GitHub: esto vive
 * dentro de la carta y tiene que leerse como parte de ella, no como un widget pegado.
 */
const LEVELS = [
  'rgba(255,255,255,0.06)',
  'rgba(79,140,255,0.30)',
  'rgba(79,140,255,0.52)',
  'rgba(79,140,255,0.74)',
  'rgba(126,176,255,0.95)',
]

function levelOf(count, max) {
  if (count <= 0) return 0
  if (max <= 0) return 1
  return Math.min(4, Math.max(1, Math.ceil((count / max) * 4)))
}

/**
 * Actividad de GitHub del último año: el total en grande y el heatmap debajo.
 *
 * El orden importa. Antes el gráfico era el protagonista y el número iba en 11px al pie,
 * o sea que el dato más interesante de la carta era el más chico. Sin tooltips el heatmap
 * no se puede leer día por día: el número es el dato y el gráfico es la evidencia.
 *
 * Se dibuja como UN solo <svg> con los ~365 <rect> adentro, y no como 365 divs: el dorso
 * de la carta rota en 3D, y un SVG se rasteriza como una capa mientras que los divs
 * obligarían al compositor a manejar cientos de cajas en cada frame del giro.
 *
 * Sin tooltips ni hover: es un gráfico decorativo dentro de una carta que gira, no un
 * dashboard. El resumen accesible va en el aria-label.
 */
export default function ContributionGraph({ lang }) {
  const { days, max, total, startWeekday = 0 } = contributions
  const es = lang === 'es'

  // Sin datos (el script no pudo actualizar y no hay JSON previo) el componente no se
  // monta: mejor un hueco que un gráfico vacío que parece un bug.
  if (!days?.length || !total) return null

  const columns = Math.ceil((days.length + startWeekday) / ROWS)
  const width = columns * STEP - GAP
  const height = ROWS * STEP - GAP

  const label = es
    ? `${total} contribuciones en GitHub en el último año`
    : `${total} GitHub contributions in the last year`

  return (
    <div className="space-y-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
        {es ? 'GitHub · último año' : 'GitHub · last year'}
      </p>

      <p className="flex items-baseline gap-1.5 leading-none">
        <span className="text-2xl font-bold text-white tabular-nums">
          <AnimatedCounter value={total} />
        </span>
        <span className="text-[11px] text-slate-400">
          {es ? 'contribuciones' : 'contributions'}
        </span>
      </p>

      {/* Sin atributos width/height: el viewBox más `h-auto w-full` dejan que el SVG se
          estire al ancho de la carta conservando la proporción. (`height="auto"` no es un
          valor válido para el atributo, sólo para la propiedad CSS.) */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="block h-auto w-full"
      >
        {days.map((count, i) => {
          const slot = i + startWeekday
          return (
            <rect
              key={i}
              x={Math.floor(slot / ROWS) * STEP}
              y={(slot % ROWS) * STEP}
              width={CELL}
              height={CELL}
              rx={1}
              fill={LEVELS[levelOf(count, max)]}
            />
          )
        })}
      </svg>
    </div>
  )
}
