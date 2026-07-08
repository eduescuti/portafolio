import { ArrowDown, Code2 } from 'lucide-react'
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiMui,
  SiHtml5,
  SiPython,
  SiRedis,
  SiPhp,
  SiFlask,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiPhpmyadmin,
  SiN8N,
  SiGit,
  SiGithub,
  SiBrevo,
  SiDocker,
  SiFilament,
  SiClaudecode,
  SiAnthropic,
  SiCursor,
  SiMessenger
} from 'react-icons/si'
import { skills } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import AmbientBackground from './AmbientBackground'

const skillIconMap = {
  React: SiReact,
  JavaScript: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  'Material UI': SiMui,
  'HTML / CSS': SiHtml5,
  Python: SiPython,
  Redis: SiRedis,
  PHP: SiPhp,
  Flask: SiFlask,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  phpMyAdmin: SiPhpmyadmin,
  n8n: SiN8N,
  Git: SiGit,
  GitHub: SiGithub,
  Brevo: SiBrevo,
  Docker: SiDocker,
  Filament: SiFilament,
  'Claude Code': SiClaudecode,
  'AI Cursor': SiCursor,
  'SendGrid': SiMessenger,
  Sonnet: SiAnthropic,
  Opus: SiAnthropic,
}

const categories = {
  frontend: {
    es: 'Frontend',
    en: 'Frontend',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    hoverCard: 'hover:border-blue-400/35 hover:shadow-lg hover:shadow-blue-500/10',
    hoverBadge: 'hover:border-blue-400/50 hover:bg-blue-500/30 hover:shadow-md hover:shadow-blue-500/15',
  },
  backend: {
    es: 'Backend',
    en: 'Backend',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    hoverCard: 'hover:border-emerald-400/35 hover:shadow-lg hover:shadow-emerald-500/10',
    hoverBadge: 'hover:border-emerald-400/50 hover:bg-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/15',
  },
  data: {
    es: 'Datos',
    en: 'Data',
    color: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    hoverCard: 'hover:border-violet-400/35 hover:shadow-lg hover:shadow-violet-500/10',
    hoverBadge: 'hover:border-violet-400/50 hover:bg-violet-500/30 hover:shadow-md hover:shadow-violet-500/15',
  },
  tools: {
    es: 'Herramientas',
    en: 'Tools',
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    hoverCard: 'hover:border-amber-400/35 hover:shadow-lg hover:shadow-amber-500/10',
    hoverBadge: 'hover:border-amber-400/50 hover:bg-amber-500/30 hover:shadow-md hover:shadow-amber-500/15',
  },
  ai: {
    es: 'AI',
    en: 'AI',
    color: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    hoverCard: 'hover:border-fuchsia-400/35 hover:shadow-lg hover:shadow-fuchsia-500/10',
    hoverBadge: 'hover:border-fuchsia-400/50 hover:bg-fuchsia-500/30 hover:shadow-md hover:shadow-fuchsia-500/15',
  },
}

const layoutOrder = ['ai', 'frontend', 'backend', 'data', 'tools']

function SkillTile({ name, label }) {
  const Icon = skillIconMap[name] || Code2

  return (
    <div
      className={`flex min-h-[3.75rem] flex-col items-center justify-center gap-1.5 rounded-xl border p-2 text-center transition-all duration-300 hover:-translate-y-0.5 lg:min-h-[4.25rem] lg:p-2.5 ${label.color} ${label.hoverBadge}`}
    >
      <Icon size={26} className="shrink-0" />
      <span className="text-[11px] font-medium leading-tight text-slate-200/90">{name}</span>
    </div>
  )
}

function SkillCard({ categoryKey, label, items, delay = 0, className = '' }) {
  const { t, lang } = useLanguage()
  const isAi = categoryKey === 'ai'

  return (
    <Reveal
      delay={delay}
      className={`glass-card group flex h-full flex-col p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${label.hoverCard} ${className}`}
    >
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300 transition-colors duration-300 group-hover:text-white">
        {t(label)}
      </h3>

      <div className="flex flex-1 flex-col justify-center gap-3 lg:gap-4">
        {isAi ? (
          <>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-400/80">
                {lang === 'es' ? 'IDE & Agentes' : 'IDE & Agents'}
              </p>
              <div className="grid grid-cols-2 gap-2 lg:gap-2.5">
                {items.slice(0, 2).map((skill) => (
                  <SkillTile key={skill.name} name={skill.name} label={label} />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-400/80">
                {lang === 'es' ? 'Modelos' : 'Models'}
              </p>
              <div className="grid grid-cols-3 gap-2 lg:gap-2.5">
                {items.slice(2).map((skill) => (
                  <SkillTile key={skill.name} name={skill.name} label={label} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-2.5">
            {items.map((skill) => (
              <SkillTile key={skill.name} name={skill.name} label={label} />
            ))}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export default function Skills() {
  const { lang } = useLanguage()

  const grouped = layoutOrder.map((key) => ({
    key,
    label: categories[key],
    items: skills.filter((s) => s.category === key),
  }))

  return (
    <section id="skills" className="relative flex min-h-screen items-center overflow-hidden">
      <AmbientBackground
        blobs={[{ className: '-left-32 bottom-0 h-[420px] w-[420px] bg-accent/10', animation: 'animate-drift-slow' }]}
      />
      <div className="section-container">
        <Reveal>
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            {lang === 'es' ? 'Tecnologías' : 'Technologies'}
          </h2>
          <p className="mb-6 max-w-2xl text-slate-400 lg:mb-8">
            {lang === 'es'
              ? 'Stack que utilizo en mis proyectos profesionales y académicos.'
              : 'Stack I use across my professional and academic projects.'}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-5">
          {grouped.map(({ key, label, items }, i) => (
            <SkillCard
              key={key}
              categoryKey={key}
              label={label}
              items={items}
              delay={i * 80}
              className={`${i === 0 ? 'col-span-2 lg:col-span-2' : 'lg:col-span-2'} ${i === 3 ? 'lg:col-start-2' : ''}`}
            />
          ))}
        </div>
      </div>
      <a
        href="#contact"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} className="animate-bounce" />
      </a>
    </section>
  )
}
