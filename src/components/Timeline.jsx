import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, GraduationCap, FolderKanban, Clock } from 'lucide-react'
import { timeline, projects, profile } from '../data/portfolio'
import { techIcons } from '../lib/techIcons'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import AnimatedCounter from './AnimatedCounter'

function yearsSince(anchor) {
  const start = new Date(`${anchor}-01T00:00:00`)
  const diff = (Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  return Math.max(0, diff)
}

function Metric({ icon: Icon, value, decimals, suffix, label }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-accent">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-bold leading-none text-white">
          <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
        </p>
        <p className="mt-1 text-xs text-slate-500">{label}</p>
      </div>
    </div>
  )
}

function TimelineItem({ node, t, lang }) {
  const isWork = node.type === 'work'
  const Icon = isWork ? Briefcase : GraduationCap

  return (
    <Reveal variant="fade-up" className="relative pl-14 md:pl-16">
      {/* Nodo sobre la línea */}
      <span
        className={`absolute left-0 top-1 flex h-11 w-11 items-center justify-center rounded-xl border md:h-12 md:w-12 ${
          isWork
            ? 'border-accent/30 bg-navy-800 text-accent'
            : 'border-white/10 bg-navy-900 text-slate-300'
        }`}
      >
        <Icon size={18} />
      </span>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-white/15 md:p-5">
        <div className="mb-1.5 flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white md:text-lg">{t(node.title)}</h3>
            <p className="text-sm text-accent">{t(node.place)}</p>
          </div>
          <span className="shrink-0 rounded-lg bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-400">
            {t(node.period)}
          </span>
        </div>

        {node.highlights && (
          <ul className="mt-2 space-y-1">
            {t(node.highlights).map((h, i) => (
              <li key={i} className="flex gap-2 text-sm leading-snug text-slate-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {node.tech && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {node.tech.map((tech) => {
              const TechIcon = techIcons[tech]
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-accent-light"
                >
                  {TechIcon && <TechIcon size={11} className="shrink-0" />}
                  {tech}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export default function Timeline() {
  const { t, lang } = useLanguage()
  const reduce = useReducedMotion()
  const years = yearsSince(profile.experienceStart)

  return (
    <section id="timeline" className="relative overflow-hidden border-t border-white/5">
      <div className="section-container">
        <Reveal>
          <span className="section-label">{lang === 'es' ? 'Trayectoria' : 'Journey'}</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="section-title">
          {lang === 'es' ? 'Mi recorrido' : 'My path'}
        </Reveal>
        <Reveal delay={160}>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">{t(profile.intro)}</p>
        </Reveal>

        {/* Métricas con contadores animados */}
        <Reveal delay={200}>
          <div className="mb-14 flex flex-wrap gap-x-12 gap-y-6 border-y border-white/[0.06] py-6">
            <Metric
              icon={FolderKanban}
              value={projects.length}
              label={lang === 'es' ? 'Proyectos' : 'Projects'}
            />
            <Metric
              icon={Clock}
              value={years}
              decimals={1}
              suffix={lang === 'es' ? ' años' : ' yrs'}
              label={lang === 'es' ? 'Trabajando en desarrollo' : 'Working in development'}
            />
          </div>
        </Reveal>

        {/* Línea de tiempo */}
        <div className="relative">
          {/* Tallo que se "dibuja" */}
          <motion.div
            className="absolute left-[22px] top-2 w-px origin-top bg-gradient-to-b from-accent/40 via-white/12 to-transparent md:left-[23px]"
            style={{ bottom: '0.5rem' }}
            initial={{ scaleY: reduce ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          <div className="space-y-6 md:space-y-8">
            {timeline.map((node) => (
              <TimelineItem key={node.id} node={node} t={t} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
