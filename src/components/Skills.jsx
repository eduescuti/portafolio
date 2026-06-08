import { skills } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

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

const layoutOrder = [
  { key: 'ai', className: 'lg:row-span-2' },
  { key: 'frontend' },
  { key: 'backend' },
  { key: 'data' },
  { key: 'tools' },
]

function SkillBadge({ name, label, fullWidth = false }) {
  return (
    <span
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${fullWidth ? 'block w-full text-center' : ''} ${label.color} ${label.hoverBadge}`}
    >
      {name}
    </span>
  )
}

function SkillCard({ categoryKey, label, items, className = '' }) {
  const { t, lang } = useLanguage()
  const isAi = categoryKey === 'ai'

  return (
    <div
      className={`glass-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${label.hoverCard} ${className}`}
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300 transition-colors duration-300 group-hover:text-white">
        {t(label)}
      </h3>

      {isAi ? (
        <div className="flex flex-1 flex-col justify-between gap-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fuchsia-400/80">
              {lang === 'es' ? 'IDE & Agentes' : 'IDE & Agents'}
            </p>
            <div className="flex flex-col gap-2.5">
              {items.slice(0, 2).map((skill) => (
                <SkillBadge key={skill.name} name={skill.name} label={label} fullWidth />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fuchsia-400/80">
              {lang === 'es' ? 'Modelos' : 'Models'}
            </p>
            <div className="flex flex-col gap-2.5">
              {items.slice(2).map((skill) => (
                <SkillBadge key={skill.name} name={skill.name} label={label} fullWidth />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((skill) => (
            <SkillBadge key={skill.name} name={skill.name} label={label} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Skills() {
  const { lang } = useLanguage()

  const grouped = layoutOrder.map(({ key, className }) => ({
    key,
    className,
    label: categories[key],
    items: skills.filter((s) => s.category === key),
  }))

  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <span className="section-label">Skills</span>
        <h2 className="section-title">
          {lang === 'es' ? 'Tecnologías' : 'Technologies'}
        </h2>
        <p className="mb-10 max-w-2xl text-slate-400">
          {lang === 'es'
            ? 'Stack que utilizo en mis proyectos profesionales y académicos.'
            : 'Stack I use across my professional and academic projects.'}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {grouped.map(({ key, label, items, className }) => (
            <SkillCard
              key={key}
              categoryKey={key}
              label={label}
              items={items}
              className={className}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
