import { Briefcase } from 'lucide-react'
import { experience } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Experience() {
  const { t, lang } = useLanguage()

  return (
    <section id="experience" className="relative border-t border-white/5 bg-navy-900/50">
      <div className="section-container">
        <span className="section-label">{lang === 'es' ? 'Experiencia' : 'Experience'}</span>
        <h2 className="section-title">
          {lang === 'es' ? 'Trayectoria laboral' : 'Work experience'}
        </h2>

        <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-white/10 md:before:left-[23px]">
          {experience.map((job) => (
            <article key={job.id} className="relative pl-12 md:pl-14">
              <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-navy-800 text-accent md:h-12 md:w-12">
                <Briefcase size={18} />
              </div>

              <div className="glass-card p-6 transition hover:border-accent/20">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.company}</h3>
                    <p className="text-accent">{t(job.role)}</p>
                  </div>
                  <span className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs text-slate-400">
                    {t(job.period)}
                  </span>
                </div>

                <ul className="mb-4 space-y-2">
                  {t(job.highlights).map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
