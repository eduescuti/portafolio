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
} from 'lucide-react'
import { projects } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const iconMap = {
  BarChart3,
  MessageSquare,
  Zap,
  Calendar,
  GraduationCap,
}

const DRAG_THRESHOLD = 8
const SCROLL_EDGE = 8

function getScrollAxis(deltaX, deltaY) {
  const absX = Math.abs(deltaX)
  const absY = Math.abs(deltaY)
  if (absX < DRAG_THRESHOLD && absY < DRAG_THRESHOLD) return null
  return absX > absY ? 'x' : 'y'
}

function useDragScroll() {
  const trackRef = useRef(null)
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    moved: false,
    suppressClick: false,
    pointerId: null,
    axis: null,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollHints = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth

    setCanScrollLeft(scrollLeft > SCROLL_EDGE)
    setCanScrollRight(scrollLeft < maxScroll - SCROLL_EDGE)
  }, [])

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
      if (e.pointerType === 'mouse' && e.button !== 0) return

      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startScrollLeft: el.scrollLeft,
        moved: false,
        suppressClick: false,
        pointerId: e.pointerId,
        axis: null,
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
      updateScrollHints()
    }

    const onPointerEnd = (e) => {
      const drag = dragRef.current
      if (!drag.active || e.pointerId !== drag.pointerId) return

      if (drag.moved) {
        drag.suppressClick = true
      }

      drag.active = false
      drag.moved = false
      drag.pointerId = null
      drag.axis = null
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
    }
  }, [updateScrollHints])

  return {
    trackRef,
    isDragging,
    canScrollLeft,
    canScrollRight,
  }
}

function ScrollHint({ direction, visible }) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  return (
    <>
      {/* Mobile: icono en el margen, sin degradado sobre la tarjeta */}
      <div
        aria-hidden={!visible}
        className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 transition-opacity duration-300 md:hidden ${
          direction === 'left' ? 'left-0.5' : 'right-0.5'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-950/95 text-accent-light shadow-md ring-1 ring-white/15">
          <Icon size={14} strokeWidth={2.5} />
        </div>
      </div>

      {/* Desktop: degradado lateral + flecha */}
      <div
        aria-hidden={!visible}
        className={`pointer-events-none absolute inset-y-0 z-10 hidden w-20 items-center transition-opacity duration-300 md:flex ${
          direction === 'left'
            ? 'left-0 justify-start bg-gradient-to-r from-navy-900 via-navy-900/70 to-transparent pl-3'
            : 'right-0 justify-end bg-gradient-to-l from-navy-900 via-navy-900/70 to-transparent pr-3'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-navy-800/95 text-accent-light shadow-lg ${
            visible && direction === 'right' ? 'animate-pulse-soft' : ''
          }`}
        >
          <Icon size={18} strokeWidth={2.5} />
        </div>
      </div>
    </>
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
        <p className="mb-4 min-h-[5.75rem] shrink-0 line-clamp-4 text-sm leading-relaxed text-slate-300">
          {t(project.description)}
        </p>

        <div className="mb-4 flex min-h-[3.5rem] flex-wrap content-start gap-1.5">
          {t(project.highlights).map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-auto flex min-h-[4.75rem] flex-wrap content-start gap-2 border-t border-white/5 pt-4">
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
    'group glass-card flex h-[31rem] w-[min(88vw,380px)] shrink-0 flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 md:w-[380px]'

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
  const {
    trackRef,
    isDragging,
    canScrollLeft,
    canScrollRight,
  } = useDragScroll()

  return (
    <section id="projects" className="relative border-t border-white/5 bg-navy-900/50">
      <div className="section-container">
        <span className="section-label">{lang === 'es' ? 'Proyectos' : 'Projects'}</span>
        <h2 className="section-title">
          {lang === 'es' ? 'Lo que he construido' : 'What I have built'}
        </h2>
        <p className="mb-10 max-w-2xl text-slate-400">
          {lang === 'es'
            ? 'Proyectos reales desarrollados en Andersson Consultores, Alexandria Solutions y la UCA.'
            : 'Real projects developed at Andersson Consultores, Alexandria Solutions and UCA.'}
        </p>

        <div className="relative -mx-6 md:-mx-8">
          <ScrollHint direction="left" visible={canScrollLeft} />
          <ScrollHint direction="right" visible={canScrollRight} />

          <div
            ref={trackRef}
            aria-label={lang === 'es' ? 'Carrusel de proyectos' : 'Projects carousel'}
            className={`projects-carousel flex items-stretch snap-x snap-proximity gap-4 overflow-x-auto scroll-smooth px-6 pb-2 pt-1 md:gap-5 md:px-8 md:snap-none ${isDragging ? 'is-dragging' : ''}`}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
