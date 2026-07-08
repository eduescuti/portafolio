import { useRef, useCallback, useState, useEffect } from 'react'
import {
  BarChart3,
  MessageSquare,
  Zap,
  Calendar,
  GraduationCap,
  FolderOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MousePointer2,
  X,
  Sparkles,
  ArrowDown
} from 'lucide-react'
import { projects } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import AmbientBackground from './AmbientBackground'

const iconMap = {
  BarChart3,
  MessageSquare,
  Zap,
  Calendar,
  GraduationCap,
}

const DRAG_THRESHOLD = 8
const SCROLL_EDGE = 8
const MOMENTUM_MIN_VELOCITY = 0.02
const MOMENTUM_FRICTION = 0.92

function getScrollAxis(deltaX, deltaY) {
  const absX = Math.abs(deltaX)
  const absY = Math.abs(deltaY)
  if (absX < DRAG_THRESHOLD && absY < DRAG_THRESHOLD) return null
  return absX > absY ? 'x' : 'y'
}

function averageVelocity(samples) {
  if (!samples.length) return 0
  const weightSum = samples.reduce((sum, _, i) => sum + i + 1, 0)
  return samples.reduce((sum, velocity, i) => sum + velocity * (i + 1), 0) / weightSum
}

function useDragScroll() {
  const trackRef = useRef(null)
  const momentumRef = useRef(null)
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    moved: false,
    suppressClick: false,
    pointerId: null,
    axis: null,
    velocities: [],
    lastTime: null,
    lastScrollLeft: null,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isMomentumScrolling, setIsMomentumScrolling] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const cancelMomentum = useCallback(() => {
    if (momentumRef.current !== null) {
      cancelAnimationFrame(momentumRef.current)
      momentumRef.current = null
    }
    setIsMomentumScrolling(false)
  }, [])

  const updateScrollHints = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth

    setCanScrollLeft(scrollLeft > SCROLL_EDGE)
    setCanScrollRight(scrollLeft < maxScroll - SCROLL_EDGE)
  }, [])

  const startMomentum = useCallback(
    (el, velocityPxPerMs) => {
      cancelMomentum()

      if (Math.abs(velocityPxPerMs) < MOMENTUM_MIN_VELOCITY) return

      setIsMomentumScrolling(true)

      let velocity = velocityPxPerMs * 1.15
      let lastTime = performance.now()

      const step = (now) => {
        const dt = Math.min(now - lastTime, 32)
        lastTime = now

        velocity *= MOMENTUM_FRICTION ** (dt / 16)

        if (Math.abs(velocity) < MOMENTUM_MIN_VELOCITY) {
          cancelMomentum()
          updateScrollHints()
          return
        }

        const maxScroll = el.scrollWidth - el.clientWidth
        const nextScrollLeft = el.scrollLeft + velocity * dt

        if (nextScrollLeft <= 0) {
          el.scrollLeft = 0
          cancelMomentum()
          updateScrollHints()
          return
        }

        if (nextScrollLeft >= maxScroll) {
          el.scrollLeft = maxScroll
          cancelMomentum()
          updateScrollHints()
          return
        }

        el.scrollLeft = nextScrollLeft
        updateScrollHints()
        momentumRef.current = requestAnimationFrame(step)
      }

      momentumRef.current = requestAnimationFrame(step)
    },
    [cancelMomentum, updateScrollHints]
  )

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    updateScrollHints()
    el.addEventListener('scroll', updateScrollHints, { passive: true })
    window.addEventListener('resize', updateScrollHints)

    return () => {
      el.removeEventListener('scroll', updateScrollHints)
      window.removeEventListener('resize', updateScrollHints)
    }
  }, [updateScrollHints])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return
      if (e.pointerType === 'mouse' && e.button !== 0) return

      cancelMomentum()

      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startScrollLeft: el.scrollLeft,
        moved: false,
        suppressClick: false,
        pointerId: e.pointerId,
        axis: null,
        velocities: [],
        lastTime: null,
        lastScrollLeft: el.scrollLeft,
      }
    }

    const onPointerMove = (e) => {
      const drag = dragRef.current
      if (!drag.active || e.pointerId !== drag.pointerId) return

      const deltaX = e.clientX - drag.startX
      const deltaY = e.clientY - drag.startY

      if (drag.axis === null) {
        const axis = getScrollAxis(deltaX, deltaY)
        if (!axis) return

        if (axis === 'y') {
          drag.active = false
          drag.pointerId = null
          return
        }

        drag.axis = 'x'
        drag.moved = true
        setIsDragging(true)
        el.setPointerCapture(e.pointerId)
      }

      if (drag.axis !== 'x') return

      e.preventDefault()
      el.scrollLeft = drag.startScrollLeft - deltaX

      const now = performance.now()
      if (drag.lastTime !== null && drag.lastScrollLeft !== null) {
        const dt = now - drag.lastTime
        if (dt > 0 && dt < 120) {
          const instantVelocity = (el.scrollLeft - drag.lastScrollLeft) / dt
          drag.velocities = [...drag.velocities, instantVelocity].slice(-6)
        }
      }

      drag.lastTime = now
      drag.lastScrollLeft = el.scrollLeft
      updateScrollHints()
    }

    const onPointerEnd = (e) => {
      const drag = dragRef.current
      if (!drag.active || e.pointerId !== drag.pointerId) return

      if (drag.moved) {
        drag.suppressClick = true
        startMomentum(el, averageVelocity(drag.velocities))
      }

      drag.active = false
      drag.moved = false
      drag.pointerId = null
      drag.axis = null
      drag.velocities = []
      drag.lastTime = null
      drag.lastScrollLeft = null
      setIsDragging(false)

      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId)
      }

      updateScrollHints()
    }

    const onClickCapture = (e) => {
      if (!dragRef.current.suppressClick) return
      e.preventDefault()
      e.stopPropagation()
      dragRef.current.suppressClick = false
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove, { passive: false })
    el.addEventListener('pointerup', onPointerEnd)
    el.addEventListener('pointercancel', onPointerEnd)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerEnd)
      el.removeEventListener('pointercancel', onPointerEnd)
      el.removeEventListener('click', onClickCapture, true)
      cancelMomentum()
    }
  }, [updateScrollHints, startMomentum, cancelMomentum])

  return {
    trackRef,
    isDragging: isDragging || isMomentumScrolling,
    canScrollLeft,
    canScrollRight,
  }
}

function ScrollHint({ direction, visible, onHintClick }) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  const handleClick = (e) => {
    e.stopPropagation()
    if (visible) onHintClick?.()
  }

  const desktopButtonClass = `flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-navy-800/95 text-accent-light shadow-lg transition-all duration-300 ${visible
    ? 'pointer-events-auto cursor-pointer hover:scale-110 hover:border-accent/40 hover:bg-navy-700/95 hover:shadow-accent/25 active:scale-95'
    : 'pointer-events-none'
    } ${visible && direction === 'right' ? 'animate-pulse-soft' : ''}`

  return (
    <>
      {/* Mobile: icono decorativo, sin interacción */}
      <div
        aria-hidden={!visible}
        className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 transition-opacity duration-300 md:hidden ${direction === 'left' ? 'left-0.5' : 'right-0.5'
          } ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-950/95 text-accent-light shadow-md ring-1 ring-white/15">
          <Icon size={14} strokeWidth={2.5} />
        </div>
      </div>

      {/* Desktop: degradado lateral + flecha clicable */}
      <div
        aria-hidden={!visible}
        className={`pointer-events-none absolute inset-y-0 z-10 hidden w-20 items-center transition-opacity duration-300 md:flex ${direction === 'left'
          ? 'left-0 justify-start bg-gradient-to-r from-navy-900 via-navy-900/70 to-transparent pl-3'
          : 'right-0 justify-end bg-gradient-to-l from-navy-900 via-navy-900/70 to-transparent pr-3'
          } ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <button
          type="button"
          onClick={handleClick}
          tabIndex={visible ? 0 : -1}
          aria-label={direction === 'left' ? 'Ver proyectos anteriores' : 'Ver más proyectos'}
          className={desktopButtonClass}
        >
          <Icon size={18} strokeWidth={2.5} />
        </button>
      </div>
    </>
  )
}

const DRAG_HINT_EXIT_MS = 400

function DragHintToast({ open, onClose, lang }) {
  const [mounted, setMounted] = useState(false)
  const [exiting, setExiting] = useState(false)

  const dismiss = useCallback(() => {
    setExiting(true)
  }, [])

  useEffect(() => {
    if (open) {
      setMounted(true)
      setExiting(false)
    }
  }, [open])

  useEffect(() => {
    if (!exiting) return

    const timer = window.setTimeout(() => {
      setMounted(false)
      setExiting(false)
      onClose()
    }, DRAG_HINT_EXIT_MS)

    return () => window.clearTimeout(timer)
  }, [exiting, onClose])

  useEffect(() => {
    if (!mounted || exiting) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') dismiss()
    }

    const timer = window.setTimeout(dismiss, 5000)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mounted, exiting, dismiss])

  if (!mounted) return null

  const copy = {
    es: {
      title: '¡Arrastrá con el mouse!',
      body: 'Agarrá el carrusel y deslizalo hacia los lados para descubrir más proyectos.',
    },
    en: {
      title: 'Drag with your mouse!',
      body: 'Grab the carousel and drag sideways to discover more projects.',
    },
  }

  const text = copy[lang] ?? copy.es

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-1/2 z-50 hidden -translate-y-1/2 justify-center px-4 md:flex"
      role="status"
      aria-live="polite"
    >
      <div
        className={`pointer-events-auto relative w-full max-w-sm rounded-2xl border border-accent/30 bg-navy-900/95 p-4 shadow-2xl shadow-accent/20 backdrop-blur-xl ${exiting ? 'animate-pop-out' : 'animate-pop-bounce'
          }`}
      >
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 overflow-hidden rounded-full bg-accent/20 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-8 -left-4 h-20 w-20 overflow-hidden rounded-full bg-indigo-500/15 blur-2xl" aria-hidden />

        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            dismiss()
          }}
          className="absolute right-1 top-1 z-20 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="relative flex items-start gap-3.5 pr-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/25">
            <MousePointer2 size={20} className="animate-drag-hand text-accent-light" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="mb-1 flex items-center gap-1.5 text-base font-semibold leading-snug text-white">
              {text.title}
              <Sparkles size={15} className="shrink-0 text-amber-400" aria-hidden />
            </p>
            <p className="text-sm leading-relaxed text-slate-400">{text.body}</p>
          </div>
        </div>

        <div className="relative mt-3 flex items-center justify-center gap-2 font-mono text-xs text-accent-light/80">
          <ChevronLeft size={14} className="animate-pulse-soft" aria-hidden />
          <span>{lang === 'es' ? 'deslizá' : 'drag'}</span>
          <ChevronRight size={14} className="animate-pulse-soft" aria-hidden />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, t }) {
  const Icon = iconMap[project.icon] || FolderOpen
  const hasLink = Boolean(project.url)

  const headerStyle = project.imageBackground
    ? {
      backgroundImage: `url(${project.imageBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }
    : undefined

  const cardContent = (
    <>
      <div
        className={`relative h-44 shrink-0 overflow-hidden ${!project.imageBackground ? `bg-gradient-to-br ${project.color}` : ''}`}
        style={headerStyle}
      >
        {project.imageBackground && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        )}

        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="rounded-xl bg-white/15 p-2.5 backdrop-blur-sm ring-1 ring-white/10">
              <Icon size={22} className="text-white" />
            </div>
            <span className="flex max-w-[55%] items-center gap-1 truncate rounded-lg bg-black/30 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur-sm">
              <FolderOpen size={11} className="shrink-0" />
              <span className="truncate">{project.folder}</span>
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold leading-tight text-white">{t(project.title)}</h3>
            <p className="mt-0.5 text-sm text-white/75">{t(project.subtitle)}</p>
          </div>
        </div>

        {hasLink && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            <ExternalLink size={11} />
            {t({ es: 'Visitar', en: 'Visit' })}
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
        <p className="mb-3 min-h-[2.5rem] shrink-0 line-clamp-3 text-sm leading-relaxed text-slate-300">
          {t(project.description)}
        </p>

        <div className="mb-3 flex flex-wrap content-start gap-1.5">
          {t(project.highlights).map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap content-start gap-2 border-t border-white/5 pt-3">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent-light"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  const cardClass =
    'group glass-card flex h-[25rem] w-[min(88vw,380px)] shrink-0 flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 md:w-[380px]'

  if (hasLink) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-carousel-card
        className={`${cardClass} cursor-pointer`}
        aria-label={t(project.title)}
        draggable={false}
      >
        {cardContent}
      </a>
    )
  }

  return (
    <article data-carousel-card className={cardClass}>
      {cardContent}
    </article>
  )
}

export default function Projects() {
  const { t, lang } = useLanguage()
  const [dragHintOpen, setDragHintOpen] = useState(false)
  const {
    trackRef,
    isDragging,
    canScrollLeft,
    canScrollRight,
  } = useDragScroll()

  const openDragHint = useCallback(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setDragHintOpen(true)
    }
  }, [])
  const closeDragHint = useCallback(() => setDragHintOpen(false), [])

  return (
    <section id="projects" className="relative flex min-h-screen items-center overflow-hidden border-t border-white/5 bg-navy-900/50">
      <AmbientBackground
        blobs={[{ className: '-left-40 top-0 h-[400px] w-[400px] bg-indigo-600/10', animation: 'animate-drift-alt' }]}
      />
      <div className="section-container">
        <Reveal>
          <span className="section-label">{lang === 'es' ? 'Proyectos' : 'Projects'}</span>
          <h2 className="section-title">
            {lang === 'es' ? 'Lo que he construido' : 'What I have built'}
          </h2>
          <p className="mb-10 max-w-2xl text-slate-400">
            {lang === 'es'
              ? 'Proyectos reales desarrollados en Andersson Consultores, Alexandria Solutions y la UCA.'
              : 'Real projects developed at Andersson Consultores, Alexandria Solutions and UCA.'}
          </p>
        </Reveal>

        <div className="relative -mx-6 md:-mx-8">
          <ScrollHint direction="left" visible={canScrollLeft} onHintClick={openDragHint} />
          <ScrollHint direction="right" visible={canScrollRight} onHintClick={openDragHint} />
          <DragHintToast open={dragHintOpen} onClose={closeDragHint} lang={lang} />

          <div
            ref={trackRef}
            aria-label={lang === 'es' ? 'Carrusel de proyectos' : 'Projects carousel'}
            className={`projects-carousel flex items-stretch snap-x snap-proximity gap-4 overflow-x-auto scroll-smooth px-6 pb-2 pt-1 md:gap-5 md:px-8 md:snap-none ${isDragging ? 'is-dragging' : ''} ${dragHintOpen ? 'pointer-events-none' : ''}`}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} t={t} />
            ))}
          </div>
        </div>
      </div>
      <a
        href="#skills"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} className="animate-bounce" />
      </a>
    </section>
  )
}
