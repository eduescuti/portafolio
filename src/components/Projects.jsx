import { useState, useEffect, useRef, useCallback } from 'react'
import { m, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import {
  BarChart3,
  MessageSquare,
  Zap,
  Calendar,
  GraduationCap,
  FolderOpen,
  ExternalLink,
  ArrowLeft,
  X,
} from 'lucide-react'
import { projects } from '../data/portfolio'
import { techIcons } from '../lib/techIcons'
import { useLanguage } from '../context/LanguageContext'
import Reveal, { RevealGroup, RevealItem } from './Reveal'

const iconMap = { BarChart3, MessageSquare, Zap, Calendar, GraduationCap }

function ProjectThumb({ project, className = '' }) {
  const Icon = iconMap[project.icon] || FolderOpen

  if (project.imageBackground) {
    return (
      <img
        src={project.imageBackground}
        alt=""
        loading="lazy"
        className={`h-full w-full object-cover object-top ${className}`}
      />
    )
  }

  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.color || 'from-navy-800 to-navy-900'} ${className}`}>
      <Icon size={44} className="text-white/80" />
    </div>
  )
}

function TechChip({ name, small = false }) {
  const Icon = techIcons[name]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-white/[0.04] font-mono text-accent-light ${
        small ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      {Icon && <Icon size={small ? 11 : 13} className="shrink-0" />}
      {name}
    </span>
  )
}

function ProjectCard({ project, t, onOpen }) {
  const Icon = iconMap[project.icon] || FolderOpen
  const reduce = useReducedMotion()
  const cardRef = useRef(null)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })

  // El tilt 3D solo en desktop con mouse (>=1024px). En mobile/táctil descuadraba la card.
  const canTilt = () =>
    !reduce &&
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    window.innerWidth >= 1024

  const handleMove = (e) => {
    if (!cardRef.current || !canTilt()) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 6)
    rotateX.set((0.5 - py) * 6)
    cardRef.current.style.setProperty('--mx', `${px * 100}%`)
    cardRef.current.style.setProperty('--my', `${py * 100}%`)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <m.button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reduce ? undefined : { y: -6 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-3 text-left transition-colors duration-300 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      aria-label={t(project.title)}
    >
      {/* Spotlight que sigue el mouse */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mx, 50%) var(--my, 0%), rgba(79,140,255,0.10), transparent 60%)',
        }}
        aria-hidden
      />

      <m.div
        layoutId={`thumb-${project.id}`}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/5"
      >
        <ProjectThumb
          project={project}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
      </m.div>

      <div className="relative flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="mb-2 flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-accent">
            <Icon size={16} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold leading-tight text-white">{t(project.title)}</h3>
            <p className="truncate text-xs text-slate-500">{t(project.subtitle)}</p>
          </div>
          <ExternalLink
            size={15}
            className="ml-auto shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>

        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-400">{t(project.description)}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <TechChip key={tech} name={tech} small />
          ))}
          {project.tech.length > 4 && (
            <span className="inline-flex items-center px-1.5 py-0.5 font-mono text-[11px] text-slate-600">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </m.button>
  )
}

function ProjectModal({ project, t, lang, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const Icon = iconMap[project.icon] || FolderOpen
  const hasLink = Boolean(project.url)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const f = panelRef.current?.querySelectorAll(
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
  }, [onClose])

  return (
    <m.div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-navy-950/90 p-0 sm:items-center sm:p-6 sm:bg-navy-950/80 sm:backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <m.div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.98, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative my-0 w-full max-w-2xl overflow-hidden rounded-t-3xl border border-white/10 bg-navy-900 shadow-2xl shadow-black/50 sm:my-8 sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-950/60 text-slate-300 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <X size={18} />
        </button>

        <m.div
          layoutId={`thumb-${project.id}`}
          className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950"
        >
          <ProjectThumb project={project} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
        </m.div>

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-accent">
              <Icon size={20} />
            </span>
            <div className="min-w-0">
              <h2 id="project-modal-title" className="text-2xl font-bold leading-tight text-white">
                {t(project.title)}
              </h2>
              <p className="text-sm text-slate-500">{t(project.subtitle)}</p>
            </div>
          </div>

          <p className="mb-6 text-[15px] leading-relaxed text-slate-300">{t(project.description)}</p>

          <RevealGroup className="mb-6 flex flex-wrap gap-2" stagger={0.05}>
            {t(project.highlights).map((h) => (
              <RevealItem
                as="span"
                key={h}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
              >
                {h}
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mb-8">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-slate-500">Stack</p>
            <RevealGroup className="flex flex-wrap gap-2" stagger={0.04}>
              {project.tech.map((tech) => (
                <RevealItem as="span" key={tech}>
                  <TechChip name={tech} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hasLink ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                <ExternalLink size={16} />
                {lang === 'es' ? 'Ir al proyecto' : 'Visit project'}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/15 px-5 py-3 text-sm font-medium text-slate-400">
                <Zap size={16} className="text-accent" />
                {lang === 'es' ? 'En desarrollo' : 'In development'}
              </span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors duration-300 hover:border-accent/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              <ArrowLeft size={16} />
              {lang === 'es' ? 'Volver' : 'Back'}
            </button>
          </div>
        </div>
      </m.div>
    </m.div>
  )
}

export default function Projects() {
  const { t, lang } = useLanguage()
  const [selected, setSelected] = useState(null)

  const openProject = useCallback((project) => setSelected(project), [])
  const closeProject = useCallback(() => setSelected(null), [])

  return (
    <section id="projects" className="relative overflow-hidden border-t border-white/5">
      <div className="section-container">
        <Reveal>
          <span className="section-label">{lang === 'es' ? 'Proyectos' : 'Projects'}</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="section-title">
          {lang === 'es' ? 'Lo que he construido' : 'What I have built'}
        </Reveal>
        <Reveal delay={160}>
          <p className="mb-12 max-w-2xl text-lg text-slate-400">
            {lang === 'es'
              ? 'Proyectos reales desarrollados en Andersson Consultores, Alexandria Solutions y la UCA. Tocá cualquiera para ver más detalles.'
              : 'Real projects developed at Andersson Consultores, Alexandria Solutions and UCA. Tap any of them to see more details.'}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 80} className="h-full min-w-0">
              <ProjectCard project={project} t={t} onOpen={openProject} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} t={t} lang={lang} onClose={closeProject} />}
      </AnimatePresence>
    </section>
  )
}
