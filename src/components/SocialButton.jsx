import { m } from 'framer-motion'

/**
 * Botón cuadrado de red social. Vive en un archivo propio porque lo usan tanto la fila
 * de acciones del Hero como el dorso de ProfileCard.
 *
 * Con `color` toma el color de marca ya en reposo (como los tiles de Contacto); sin él
 * queda neutro, que es lo que conviene en la fila del Hero para no competir con el CTA.
 */
export default function SocialButton({ href, icon: Icon, label, color }) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.94 }}
      style={color ? { '--lc': color } : undefined}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
        color ? 'social-brand' : 'text-slate-300 hover:border-accent/40 hover:text-white'
      }`}
    >
      <Icon size={18} />
    </m.a>
  )
}
