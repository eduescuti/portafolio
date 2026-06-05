import { skills } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const categories = {
  frontend: { es: 'Frontend', en: 'Frontend', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  backend: { es: 'Backend', en: 'Backend', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  data: { es: 'Datos', en: 'Data', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  tools: { es: 'Herramientas', en: 'Tools', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
}

export default function Skills() {
  const { t, lang } = useLanguage()

  const grouped = Object.keys(categories).map((cat) => ({
    key: cat,
    label: categories[cat],
    items: skills.filter((s) => s.category === cat),
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

        <div className="grid gap-6 sm:grid-cols-2">
          {grouped.map(({ key, label, items }) => (
            <div key={key} className="glass-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                {t(label)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${label.color}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
