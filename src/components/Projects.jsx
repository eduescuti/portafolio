import {
  BarChart3,
  MessageSquare,
  Zap,
  Calendar,
  GraduationCap,
  FolderOpen,
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

export default function Projects() {
  const { t, lang } = useLanguage()

  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <span className="section-label">{lang === 'es' ? 'Proyectos' : 'Projects'}</span>
        <h2 className="section-title">
          {lang === 'es' ? 'Lo que he construido' : 'What I have built'}
        </h2>
        <p className="mb-12 max-w-2xl text-slate-400">
          {lang === 'es'
            ? 'Proyectos reales desarrollados en Andersson Consultores, Alexandria Solutions y la UCA.'
            : 'Real projects developed at Andersson Consultores, Alexandria Solutions and UCA.'}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const Icon = iconMap[project.icon] || FolderOpen
            return (
              <article
                key={project.id}
                className="group glass-card flex flex-col overflow-hidden transition hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5"
              >
                <div className={`bg-gradient-to-br ${project.color} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-white/15 p-3 backdrop-blur-sm">
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className="flex items-center gap-1 rounded-lg bg-black/20 px-2.5 py-1 font-mono text-xs text-white/80">
                      <FolderOpen size={12} />
                      {project.folder}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{t(project.title)}</h3>
                  <p className="text-sm text-white/70">{t(project.subtitle)}</p>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-300">
                    {t(project.description)}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {t(project.highlights).map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
