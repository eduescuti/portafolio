import { ArrowDown, Mail, Download, Github, Linkedin, MapPin } from 'lucide-react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import { useCoarsePointer } from '../lib/useDeviceCapabilities'
import MagneticButton from './MagneticButton'

function SocialButton({ href, icon: Icon, label }) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.94 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors duration-300 hover:border-accent/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <Icon size={18} />
    </m.a>
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
// El avatar entra con un pop suave (escala) en vez de deslizarse: da presencia al abrir.
const avatarItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

// Chip de estado. Envuelve solo si no entra (adiós al desborde de la pill anterior).
function StatusChip({ children, dot = false, icon: Icon }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-slate-400">
      {dot && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse-soft" aria-hidden />}
      {Icon && <Icon size={11} className="shrink-0 text-accent/70" aria-hidden />}
      <span className="truncate">{children}</span>
    </span>
  )
}

export default function Hero() {
  const { t, lang } = useLanguage()
  const reduce = useReducedMotion()
  const coarse = useCoarsePointer()
  const sectionRef = useRef(null)

  // El parallax por scroll cae en el hilo principal (más aún con Lenis en desktop).
  // En mobile lo neutralizamos: el scroll táctil se siente mucho más fluido sin él.
  const disableParallax = reduce || coarse

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : 80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : 40])

  const [firstName, ...rest] = profile.name.split(' ')
  const lastName = rest.join(' ')

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-20 short:pb-10 lg:pb-8 lg:pt-24"
    >
      {/* Blobs aurora locales del hero, encima del fondo global */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="animate-aurora absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-accent/20 blur-2xl md:blur-3xl" />
        <div className="animate-aurora-2 absolute -bottom-40 -left-24 h-[460px] w-[460px] rounded-full bg-indigo-500/15 blur-2xl md:blur-3xl" />
      </div>

      {/*
        Orden del DOM: avatar (solo mobile) → texto → foto (solo desktop) → acciones.
        En mobile se apila con flex-col. En desktop el avatar y la foto intercambian
        visibilidad, y el auto-placement de CSS Grid ubica texto en col1/fila1, foto en
        col2 (spaneando ambas filas) y acciones en col1/fila2 — sin `order` manual.
        Las variantes short:/shorter: (por altura de viewport) achican avatar y gaps
        para que el bloque entre completo en teléfonos de pantalla baja.
      */}
      <m.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="section-container relative flex w-full flex-col items-center gap-6 py-0 text-center short:gap-4 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:text-left"
      >
        {/* Avatar circular — solo mobile/tablet */}
        <m.div variants={avatarItem} className="relative lg:hidden">
          <div
            className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent/40 to-indigo-600/25 opacity-70 blur-xl"
            aria-hidden
          />
          <img
            src="/profile.png"
            alt={profile.name}
            className="relative h-28 w-28 rounded-full object-cover object-top shadow-xl shadow-black/40 ring-2 ring-accent/30 short:h-24 short:w-24 shorter:h-20 shorter:w-20"
          />
        </m.div>

        <m.div style={{ y: textY }} className="flex flex-col items-center lg:items-start">
          <m.p
            variants={item}
            className="mb-2 font-mono text-sm text-accent shorter:hidden lg:mb-4"
          >
            {lang === 'es' ? 'Hola, soy' : "Hi, I'm"}
          </m.p>

          {/* Tipografía fluida: escala con el ancho sin saltos de breakpoint. */}
          <h1 className="mb-3 text-[clamp(2.5rem,11vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white lg:mb-4 lg:text-7xl lg:leading-[1.02] xl:text-8xl">
            <m.span variants={item} className="block">
              {firstName}
            </m.span>
            <m.span variants={item} className="gradient-text block">
              {lastName}
            </m.span>
          </h1>

          <m.p
            variants={item}
            className="mb-4 text-[clamp(1.125rem,4.8vw,1.5rem)] font-medium leading-snug text-slate-200 short:mb-3 lg:text-2xl"
          >
            {t(profile.role)}
          </m.p>

          {/* Dos chips independientes: si no entran en una línea, envuelven prolijo. */}
          <m.div
            variants={item}
            className="flex max-w-full flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <StatusChip dot>{t(profile.phrase)}</StatusChip>
            <StatusChip icon={MapPin}>{t(profile.location)}</StatusChip>
          </m.div>
        </m.div>

        {/* Foto rectangular — solo desktop */}
        <m.div
          variants={item}
          style={{ y: photoY }}
          className="hidden justify-center lg:row-span-2 lg:flex lg:justify-end lg:self-center"
        >
          <m.div
            whileHover={reduce ? undefined : { y: -8, rotate: -1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="group relative w-full max-w-xs"
          >
            {/* Glow detrás de la foto */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-indigo-600/20 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] p-2 shadow-2xl shadow-black/40">
              <img
                src="/profile.png"
                alt=""
                className="h-96 w-full rounded-[1.5rem] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              {/* Shine que cruza al hover */}
              <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100 motion-reduce:hidden" />
            </div>

            <div className="absolute -bottom-3 -right-3 rounded-xl border border-white/10 bg-navy-900/90 px-4 py-2 shadow-lg backdrop-blur-md">
              <p className="font-mono text-xs text-accent">Full Stack Dev</p>
            </div>
          </m.div>
        </m.div>

        <m.div
          variants={item}
          className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row lg:flex-wrap lg:gap-3"
        >
          {/* Mobile: 2 columnas (ahorra alto vs. apilados). Desktop: fila. */}
          <div className="grid w-full max-w-sm grid-cols-2 gap-3 lg:flex lg:w-auto lg:max-w-none">
            <MagneticButton
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-colors duration-300 hover:bg-accent-light lg:px-6"
            >
              <Mail size={16} className="shrink-0" />
              {lang === 'es' ? 'Contactame' : 'Contact me'}
            </MagneticButton>

            <MagneticButton
              href={lang === 'es' ? profile.cv.es : profile.cv.en}
              download
              strength={0.25}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors duration-300 hover:border-accent/40 hover:bg-white/5 lg:px-6"
            >
              <Download size={16} className="shrink-0" />
              {lang === 'es' ? 'Descargar CV' : 'Download CV'}
            </MagneticButton>
          </div>

          <div className="flex items-center gap-2 lg:ml-1">
            <SocialButton href={profile.github} icon={Github} label="GitHub" />
            <SocialButton href={profile.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialButton href={`mailto:${profile.email}`} icon={Mail} label="Email" />
          </div>
        </m.div>
      </m.div>

      <m.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 transition-colors hover:text-accent short:hidden lg:bottom-8"
        aria-label={lang === 'es' ? 'Ir a proyectos' : 'Go to projects'}
      >
        <ArrowDown size={22} className="animate-bounce" />
      </m.a>
    </section>
  )
}
