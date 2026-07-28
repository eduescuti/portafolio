import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Download, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { profile, projects, skills } from '../data/portfolio'
import { yearsSince } from '../lib/careerStats'
import { useLanguage } from '../context/LanguageContext'
import { useCoarsePointer } from '../lib/useDeviceCapabilities'
import AnimatedCounter from './AnimatedCounter'
import TechBadge from './TechBadge'
import SocialButton from './SocialButton'

// El micro-balanceo de descubribilidad se muestra una única vez por carga de página:
// es una pista de "esto se toca", no un efecto decorativo que valga repetir.
let wobbleShown = false

const FLIP_SPRING = { type: 'spring', stiffness: 220, damping: 26 }
const EXIT_MS = 320
// Solape entre la carta grande y la chica en el tramo final del cierre. Sin él, en el
// frame del relevo la tipografía pega un salto: el texto de la carta grande escalado a
// 0,37 mide ~9px, pero la carta chica lo dibuja a 12px de verdad. Solo aplica al cierre
// —al abrir, el panel ya se está expandiendo y solaparlos mostraría dos tamaños a la vez.
const CROSSFADE_MS = 120
const EXIT_TWEEN = { type: 'tween', duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }

// Todo el stack, en el orden del data file y sin repetidos (Supabase y Redis figuran
// en dos categorías). Se deriva de `skills` para que la tira no se desactualice.
const ALL_TECH = [...new Set(skills.map((s) => s.name))]
const TECH_ROW_A = ALL_TECH.filter((_, i) => i % 2 === 0)
const TECH_ROW_B = ALL_TECH.filter((_, i) => i % 2 === 1)

const SOCIALS = [
  { key: 'github', icon: Github, label: 'GitHub', color: '#CBD5E1', href: profile.github },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: '#0A66C2', href: profile.linkedin },
  { key: 'instagram', icon: Instagram, label: 'Instagram', color: '#E1306C', href: profile.instagram },
  { key: 'email', icon: Mail, label: 'Email', color: '#4f8cff', href: `mailto:${profile.email}` },
]

/**
 * Geometría destino de la carta abierta. La calcula JS y JS también la escribe como
 * left/top/width/height inline: si el tamaño lo pusiera CSS y la posición la calculara
 * acá, cualquier cambio en una clase desincronizaría el FLIP sin aviso.
 */
function computeTarget() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  // Ancho acotado por tres lados: tope de diseño, ancho útil y — vía la relación 3/4 —
  // el alto disponible. Los 108px reservados dejan lugar para la pista de gestos.
  const width = Math.max(200, Math.min(340, vw - 40, (vh - 108) * 0.75))
  const height = width * (4 / 3)
  return {
    width,
    height,
    left: (vw - width) / 2,
    top: (vh - height) / 2,
  }
}

/**
 * Cara frontal. La misma en el hero y en el overlay: `fill` decide si se dimensiona
 * sola (hero) o si llena a su contenedor (overlay, que ya tiene medidas exactas).
 */
function CardFront({ fill = false, children }) {
  return (
    <div
      className={`holo-border relative rounded-2xl p-1.5 shadow-xl shadow-black/40 lg:rounded-[2rem] lg:p-2 lg:shadow-2xl ${fill ? 'h-full' : ''}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl lg:rounded-[1.5rem] ${fill ? 'h-full' : ''}`}
      >
        <img
          src="/profile.png"
          alt={profile.name}
          decoding="async"
          // Sin esto el navegador inicia su propio arrastre nativo de imagen al apretar
          // con el mouse y cancela el gesto de Motion: en desktop la carta no giraba.
          draggable={false}
          className={
            fill
              ? 'h-full w-full object-cover object-top'
              : 'h-36 w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05] short:h-32 shorter:h-28 lg:h-96'
          }
        />

        {/* Degradado inferior: sostiene el texto sobre cualquier zona de la foto */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
        />

        <div className={`absolute inset-x-0 bottom-0 ${fill ? 'p-4' : 'p-2 lg:p-4'}`}>
          <p
            className={
              fill
                ? 'text-2xl font-bold leading-tight text-white'
                : 'text-xs font-bold leading-tight text-white lg:text-xl'
            }
          >
            {profile.name}
          </p>
          <p
            className={
              fill
                ? 'mt-1.5 font-mono text-sm leading-none text-accent'
                : 'mt-0.5 font-mono text-[10px] leading-none text-accent lg:mt-1.5 lg:text-xs'
            }
          >
            Full Stack Dev
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}

/** Una fila de la tira de tecnologías. Se detiene cuando el dorso no está a la vista. */
function TechRow({ items, active, reverse = false, duration }) {
  const from = reverse ? '-50%' : '0%'
  const to = reverse ? '0%' : '-50%'

  return (
    <div className="relative overflow-hidden">
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
        {[...items, ...items].map((name, i) => (
          <TechBadge key={`${name}-${i}`} name={name} size="sm" tone="brand" className="mr-1.5" />
        ))}
      </m.div>

      {/* Difuminado de bordes con el color del dorso. Se usa un degradado y no
          `mask-image` porque esto vive dentro de un elemento que rota en 3D y una
          máscara se re-evalúa en cada frame del giro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-navy-900 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-navy-900 to-transparent"
      />
    </div>
  )
}

/** Dorso: los datos que no entran en una foto. Se monta recién al primer giro. */
function CardBack({ lang, active }) {
  const es = lang === 'es'

  return (
    <div className="holo-border h-full rounded-2xl p-1.5 shadow-xl shadow-black/40 lg:rounded-[2rem] lg:p-2 lg:shadow-2xl">
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-navy-900 py-5 lg:rounded-[1.5rem]">
        {/* Aurora de fondo como gradiente y no como blur: esto vive dentro de un
            elemento que rota en 3D, y un blur se re-rasteriza en cada frame del giro. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,140,255,0.22),transparent_60%)]"
        />

        <div className="relative px-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            {es ? 'Perfil' : 'Profile'}
          </p>
          <p className="mt-1 text-xl font-bold leading-tight text-white">{profile.name}</p>
          <p className="mt-0.5 font-mono text-xs text-accent">Full Stack Dev</p>
        </div>

        <div className="relative mx-5 grid grid-cols-2 divide-x divide-white/10 border-y border-white/10">
          <div className="p-3 text-center">
            <p className="text-2xl font-bold leading-none text-white">
              <AnimatedCounter value={yearsSince(profile.experienceStart)} decimals={1} />
            </p>
            <p className="mt-1 text-[11px] text-slate-500">{es ? 'años exp.' : 'yrs exp.'}</p>
          </div>
          <div className="p-3 text-center">
            <p className="text-2xl font-bold leading-none text-white">
              <AnimatedCounter value={projects.length} />
            </p>
            <p className="mt-1 text-[11px] text-slate-500">{es ? 'proyectos' : 'projects'}</p>
          </div>
        </div>

        {/* La tira sangra hasta los bordes de la carta a propósito: refuerza la lectura
            de "cinta que pasa" y le da al difuminado lateral dónde apoyarse. */}
        <div className="relative space-y-1.5">
          <p className="px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Stack
          </p>
          <TechRow items={TECH_ROW_A} active={active} duration={26} />
          <TechRow items={TECH_ROW_B} active={active} duration={32} reverse />
        </div>

        <div className="relative space-y-3 px-5">
          <a
            href={es ? profile.cv.es : profile.cv.en}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors duration-300 hover:border-accent/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <Download size={16} className="shrink-0" />
            {es ? 'Descargar CV' : 'Download CV'}
          </a>

          <div className="flex items-center justify-center gap-2">
            {SOCIALS.map((s) => (
              <SocialButton
                key={s.key}
                href={s.href}
                icon={s.icon}
                label={s.label}
                color={s.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Overlay de la carta abierta: apertura por FLIP y giro 3D.
 *
 * La apertura es un FLIP manual, no `layoutId`: el shared layout de Motion ya se había
 * descartado en táctil para el modal de Proyectos porque trababa. Acá se anima solo
 * translate + scale desde el rectángulo de la carta chica; left/top/width/height se
 * escriben una vez y no se tocan más.
 */
function CardOverlay({ originRect, target, onClose, lang, reduce }) {
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [isBack, setIsBack] = useState(false)

  // Ángulo real de la carta. Es un motion value y no estado de React porque durante el
  // arrastre se actualiza en cada frame: pasarlo por render sería un re-render por frame.
  const rotate = useMotionValue(0)
  // Ángulo asentado, en múltiplos de 180 CON SIGNO. No alcanza con un booleano
  // frente/dorso: si el gesto llevó la carta a -120° y el destino fuera siempre +180,
  // al soltar volvería girando para el otro lado.
  const angleRef = useRef(0)
  const draggingRef = useRef(false)
  const revealedRef = useRef(false)

  // Tilt de puntero, solo con mouse. En touch los valores quedan en 0 y no cuestan nada.
  const coarse = useCoarsePointer()
  const tiltEnabled = !reduce && !coarse
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
      angleRef.current = next
      const back = (((next / 180) % 2) + 2) % 2 === 1
      setIsBack(back)
      if (back) reveal()
      animate(rotate, next, reduce ? { duration: 0 } : FLIP_SPRING)
    },
    [reduce, reveal, rotate]
  )

  // Cerrar desgira la carta mientras se encoge, para que aterrice mostrando el frente
  // igual que la carta chica del hero. Vuelve al múltiplo de 360 más cercano y no a 0,
  // así no pega una vuelta de más si el usuario giró varias veces.
  const requestClose = useCallback(() => {
    const home = Math.round(angleRef.current / 360) * 360
    if (angleRef.current !== home) {
      angleRef.current = home
      animate(rotate, home, { duration: reduce ? 0 : EXIT_MS / 1000, ease: 'easeOut' })
    }
    onClose()
  }, [onClose, reduce, rotate])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    cardRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        requestClose()
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
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [requestClose])

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

  return (
    <m.div
      ref={rootRef}
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label={profile.name}
    >
      {/* Backdrop separado del panel: si el panel fuera hijo de un contenedor que se
          desvanece, al cerrar desaparecería antes de terminar de encogerse. */}
      <m.div
        className="absolute inset-0 bg-navy-950/90 sm:bg-navy-950/80 sm:backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: EXIT_MS / 1000 }}
        onClick={requestClose}
      />

      <m.div
        initial={inverted}
        animate={identity}
        // El exit lleva su propia transición: un tween de duración fija, igual a la del
        // backdrop. Con un spring, Motion da la salida por terminada recién cuando el
        // resorte se asienta (~1s), mucho después de que el backdrop se apagó — y la
        // carta chica del hero se quedaba oculta ese segundo de más antes de reaparecer.
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
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'absolute',
          left: target.left,
          top: target.top,
          width: target.width,
          height: target.height,
          transformOrigin: 'top left',
        }}
      >
        <div className="h-full w-full [perspective:1200px]">
          <m.div
            ref={cardRef}
            role="button"
            tabIndex={0}
            aria-label={lang === 'es' ? 'Girar la tarjeta' : 'Flip the card'}
            className="relative h-full w-full cursor-pointer select-none rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950 lg:rounded-[2rem] [transform-style:preserve-3d]"
            style={{ rotateY, rotateX: tiltX }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            dragDirectionLock
            onPointerMove={onPointerMove}
            onPointerLeave={resetTilt}
            onDrag={(e, info) => {
              draggingRef.current = true
              if (reduce) return
              // El signo es negativo porque un rotateY positivo desplaza la cara visible
              // hacia la izquierda: para que la carta siga al dedo hay que restar.
              rotate.set(angleRef.current - info.offset.x)
              if (Math.abs(info.offset.x) > 10) reveal()
            }}
            onDragEnd={(e, info) => {
              const passed =
                Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 400
              // Se completa en la dirección que el gesto ya traía, no siempre hacia 180.
              const driver = Math.abs(info.offset.x) > 5 ? info.offset.x : info.velocity.x
              const dir = driver < 0 ? 1 : -1
              settle(passed ? angleRef.current + dir * 180 : angleRef.current)
              // El click sintético llega después del dragEnd; sin esta bandera el gesto
              // giraría dos veces.
              setTimeout(() => {
                draggingRef.current = false
              }, 0)
            }}
            onClick={() => {
              if (draggingRef.current) return
              settle(angleRef.current + 180)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                settle(angleRef.current + 180)
              }
            }}
          >
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:translateZ(0)]">
              <CardFront fill />
            </div>
            {/* translateZ(0) en ambas caras: mitigación del z-fighting de preserve-3d
                en Safari. El dorso se monta al primer giro para que los contadores
                arranquen cuando se ven y no al abrir la carta. */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(0)]">
              {revealed && <CardBack lang={lang} active={isBack && !reduce} />}
            </div>
          </m.div>
        </div>
      </m.div>

      {/* Cierre accesible: sin botón visible, el teclado y los lectores de pantalla
          necesitan una salida explícita además de Escape. Aparece solo al enfocarlo. */}
      <button
        type="button"
        onClick={requestClose}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-xl focus:border focus:border-white/10 focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {lang === 'es' ? 'Cerrar' : 'Close'}
      </button>

      {/* Pista de gestos: desaparece apenas la carta gira por primera vez. */}
      <AnimatePresence>
        {!revealed && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // El exit anula el delay de entrada: si lo heredara, al cerrar la carta
            // Motion esperaría 0,5s antes de empezar a desvanecerlo y `onExitComplete`
            // llegaría medio segundo tarde.
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ delay: 0.5, duration: 0.3 }}
            style={{
              position: 'absolute',
              top: target.top + target.height + 12,
              left: 0,
              right: 0,
            }}
            className="pointer-events-none space-y-0.5 text-center font-mono text-[10px] leading-tight text-slate-400"
          >
            <p>{lang === 'es' ? 'Deslizá o tocá para girar' : 'Swipe or tap to flip'}</p>
            <p className="text-slate-500">
              {lang === 'es' ? 'Tocá afuera para cerrar' : 'Tap outside to close'}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

/**
 * Tarjeta del Hero. En reposo flota, brilla y respira; al tocarla se abre en grande y
 * se puede girar para ver el dorso.
 *
 * Las animaciones de reposo viven en capas anidadas a propósito: si la flotación
 * (y + rotate), el hover (y + rotate) y el balanceo inicial (rotateY) compartieran
 * elemento, Motion tendría que resolver la misma propiedad desde tres fuentes.
 * Separadas, cada transform se compone sola en el compositor.
 */
export default function ProfileCard() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount: 0.3 })
  const { lang } = useLanguage()
  const [wobble, setWobble] = useState(false)
  const [open, setOpen] = useState(false)
  // La carta chica se apaga y se enciende con retardo respecto del overlay: las dos se
  // solapan un instante para que el relevo no muestre el salto de tipografía.
  const [hidden, setHidden] = useState(false)
  const [geometry, setGeometry] = useState(null)
  const timerRef = useRef(null)

  // Fuera del viewport los loops se congelan en su posición neutra en vez de seguir
  // corriendo: no se desmonta nada, solo se dejan de pedir frames. Con el overlay
  // abierto también se apagan — la atención está en la carta grande.
  const idle = inView && !reduce && !open

  useEffect(() => {
    if (!inView || reduce || wobbleShown) return
    wobbleShown = true
    setWobble(true)
  }, [inView, reduce])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleOpen = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setGeometry({ originRect: rect, target: computeTarget() })
    setHidden(true)
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
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
      setGeometry({ originRect: rect, target: computeTarget() })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  return (
    <>
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={lang === 'es' ? 'Ver más sobre mí' : 'See more about me'}
        aria-haspopup="dialog"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpen()
          }
        }}
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
        className="w-32 cursor-pointer rounded-2xl shorter:w-28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950 lg:w-full lg:max-w-xs [perspective:900px]"
      >
        {/* Capa 1 — balanceo 3D de descubribilidad (una sola vez) */}
        <m.div
          animate={wobble ? { rotateY: [0, 6, -6, 0] } : { rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.8 }}
          className="[transform-style:preserve-3d]"
        >
          {/* Capa 2 — flotación y balanceo continuos, desfasados entre sí */}
          <m.div
            animate={idle ? { y: [0, -6, 0], rotate: [0, 0.6, 0] } : { y: 0, rotate: 0 }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
            }}
          >
            {/* Capa 3 — hover de escritorio (en touch Motion no dispara whileHover) */}
            <m.div
              whileHover={reduce ? undefined : { y: -8, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="group relative"
            >
              {/* Glow que respira */}
              <m.div
                aria-hidden
                animate={idle ? { opacity: [0.5, 0.8, 0.5] } : { opacity: 0.6 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute -inset-2.5 rounded-[1.75rem] bg-gradient-to-br from-accent/30 to-indigo-600/20 blur-xl lg:-inset-4 lg:rounded-[2.5rem] lg:blur-2xl"
              />

              {/* Refuerzo del glow al hover. Capa aparte porque Motion ya es dueño de la
                  opacidad de la de arriba; solo existe donde hay hover real. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 hidden rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-indigo-600/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70 lg:block"
              />

              <CardFront>
                {/* Barrido de brillo. El recorrido llega a ±260% (no ±120%) porque el
                    elemento mide media carta: por debajo de 200% el centro brillante
                    del gradiente queda estacionado dentro del marco durante el
                    repeatDelay y al reiniciar el ciclo pega un salto visible.
                    El skew va por Motion y no por Tailwind: Motion escribe `transform`
                    inline y pisaría cualquier skew de clase. */}
                <m.div
                  aria-hidden
                  style={{ skewX: 12 }}
                  animate={idle ? { x: ['-260%', '260%'] } : { x: '-260%' }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: 'easeInOut',
                  }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              </CardFront>
            </m.div>
          </m.div>
        </m.div>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          setHidden(false)
          // El foco espera al repintado: sobre un elemento todavía `visibility: hidden`
          // el focus() no tiene efecto y el teclado se quedaría sin punto de retorno.
          requestAnimationFrame(() => ref.current?.focus())
        }}
      >
        {open && geometry && (
          <CardOverlay
            originRect={geometry.originRect}
            target={geometry.target}
            onClose={handleClose}
            lang={lang}
            reduce={reduce}
          />
        )}
      </AnimatePresence>
    </>
  )
}
