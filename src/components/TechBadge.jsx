import { techIcons } from '../lib/techIcons'
import { techColors } from '../lib/techColors'

/**
 * Chip de tecnología reutilizable (Timeline, Projects, modal). En reposo es
 * neutro; al hacer hover (desktop) o tap (mobile, vía :active) toma el color
 * de marca de la tecnología con un glow sutil. Todo en CSS puro (.tech-badge
 * en index.css) — sin motion values ni listeners por chip, barato en mobile
 * incluso con muchos badges en pantalla.
 */
export default function TechBadge({ name, size = 'md', className = '' }) {
  const Icon = techIcons[name]
  const color = techColors[name]

  const sizeClasses =
    size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
  const iconSize = size === 'sm' ? 11 : 13

  return (
    <span
      className={`tech-badge font-mono ${sizeClasses} ${className}`}
      style={color ? { '--tc': color } : undefined}
    >
      {Icon && <Icon size={iconSize} className="shrink-0" />}
      {name}
    </span>
  )
}
