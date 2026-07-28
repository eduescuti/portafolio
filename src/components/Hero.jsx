import {
  ArrowDown,
  Mail,
  Download,
  Github,
  Linkedin,
  MapPin,
  MousePointerClick,
} from 'lucide-react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import { useCoarsePointer } from '../lib/useDeviceCapabilities'
import MagneticButton from './MagneticButton'
import ProfileCard from './ProfileCard'
import SocialButton from './SocialButton'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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

  // El rol viene como "Software Engineer · Full Stack Developer". En mobile la segunda
  // mitad empuja el subtítulo a dos líneas y encima repite el badge de la carta, así que
  // ahí se muestra sólo la primera. En desktop entra en una línea y se deja completo.
  const [mainRole, ...extraRole] = t(profile.role).split('·').map((s) => s.trim())

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-20 short:pb-10 lg:pb-8 lg:pt-24"
    >
      {/* Blobs aurora locales del hero, encima del fondo global */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="animate-aurora absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-accent/20 blur-2xl md:blur-3xl" />
        <div className="animate-aurora-2 absolute -bottom-40 -left-24 h-[460px] w-[460px] rounded-full bg-indigo-500/15 blur-2xl md:blur-3xl" />
      </div>

      {/*
        Orden del DOM: texto → foto → acciones (el mismo del diseño original).
        En mobile se apila con flex-col en ese orden, alineado a la izquierda como en
        escritorio. En desktop el auto-placement de CSS Grid ubica texto en col1/fila1,
        foto en col2 (spaneando ambas filas) y acciones en col1/fila2 — sin `order`.
        Las variantes short:/shorter: (por altura de viewport) achican foto y gaps para
        que el bloque entre completo en teléfonos de pantalla baja.
      */}
      <m.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="section-container relative flex w-full flex-col items-start gap-6 py-0 text-left short:gap-4 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16"
      >
        <m.div style={{ y: textY }} className="flex flex-col items-start">
          <m.p
            variants={item}
            className="mb-2 font-mono text-sm text-accent shorter:hidden lg:mb-4"
          >
            {lang === 'es' ? 'Hola, soy' : "Hi, I'm"}
          </m.p>

          {/* Tipografía fluida: escala con el ancho sin saltos de breakpoint. En mobile
              el nombre es la pieza dominante junto con la carta, por eso el clamp es
              bastante más agresivo que el del resto del texto. */}
          <h1 className="mb-3 text-[clamp(2.75rem,14vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white short:text-[clamp(2.5rem,12vw,3.75rem)] lg:mb-4 lg:text-7xl lg:leading-[1.02] xl:text-8xl">
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
            {mainRole}
            {extraRole.length > 0 && (
              <span className="hidden lg:inline"> · {extraRole.join(' · ')}</span>
            )}
          </m.p>

          {/* Dos chips independientes: si no entran en una línea, envuelven prolijo. */}
          <m.div
            variants={item}
            className="flex max-w-full flex-wrap items-center justify-start gap-2"
          >
            <StatusChip dot>{t(profile.phrase)}</StatusChip>
            <StatusChip icon={MapPin}>{t(profile.location)}</StatusChip>
          </m.div>
        </m.div>

        {/*
          La pieza gráfica del hero. El wrapper conserva el parallax y el reveal (son
          cosas del hero); la tarjeta en sí vive en ProfileCard.
        */}
        <m.div
          variants={item}
          style={{ y: photoY }}
          className="flex justify-start lg:row-span-2 lg:justify-end lg:self-center"
        >
          {/* La columna existe solo para colgarle la pista debajo de la carta. En
              desktop se disuelve con `contents`: la carta vuelve a ser hija directa del
              flex y el layout queda idéntico al de antes. */}
          <div className="flex flex-col items-start lg:contents">
            <ProfileCard />

            {/* Pista de descubribilidad, debajo de la carta. Solo mobile: en desktop se
                descubre sola con el hover. `aria-hidden` porque la carta ya trae su
                propio aria-label y aria-haspopup — repetirlo ensucia el lector. */}
            <p
              aria-hidden
              className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-slate-400 lg:hidden"
            >
              <MousePointerClick size={13} className="animate-pulse-soft text-accent" />
              {lang === 'es' ? 'Tocá mi carta' : 'Tap my card'}
            </p>
          </div>
        </m.div>

        {/*
          Fila de acciones: solo desktop. En mobile las tres cosas que vivían acá ya
          están en otro lado —el CV y las redes en el dorso de la carta, el contacto en
          el navbar y al final de la página— y el botón a ancho completo empujaba los
          proyectos fuera de la primera pantalla. Se oculta el bloque entero y no cada
          hijo por separado: si no, el `gap-6` del contenedor deja el hueco igual.
        */}
        <m.div
          variants={item}
          className="hidden w-full flex-col items-start gap-3 lg:flex lg:w-auto lg:flex-row lg:flex-wrap lg:gap-3"
        >
          <div className="flex gap-3">
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
