import { m } from 'framer-motion'

// Variantes reutilizables. `custom` = delay en segundos.
const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
    }),
  },
  fade: {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut', delay },
    }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
  },
}

/**
 * Reveal por scroll con Framer Motion. `delay` en ms (compatibilidad con el uso previo).
 * Respeta prefers-reduced-motion vía el MotionConfig global.
 */
export default function Reveal({
  as = 'div',
  variant = 'fade-up',
  delay = 0,
  once = true,
  amount = 0.2,
  className = '',
  children,
  ...rest
}) {
  const MotionTag = m[as] || m.div

  return (
    <MotionTag
      className={className}
      variants={variants[variant] || variants['fade-up']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={delay / 1000}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

// Contenedor que escalona la aparición de sus hijos <RevealItem>.
export function RevealGroup({
  as = 'div',
  className = '',
  stagger = 0.09,
  delayChildren = 0,
  once = true,
  amount = 0.15,
  children,
  ...rest
}) {
  const MotionTag = m[as] || m.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({ as = 'div', variant = 'fade-up', className = '', children, ...rest }) {
  const MotionTag = m[as] || m.div
  const v = variants[variant] || variants['fade-up']

  return (
    <MotionTag
      className={className}
      variants={{ hidden: v.hidden, visible: v.visible(0) }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
