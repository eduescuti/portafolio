import { ArrowDown, Briefcase } from 'lucide-react'
import { experience } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import AmbientBackground from './AmbientBackground'

export default function Experience() {
  const { t, lang } = useLanguage()

  return (
    <section id="experience" className="relative flex min-h-screen items-center overflow-hidden border-t border-white/5">
      <AmbientBackground
        blobs={[{ className: '-right-24 top-1/3 h-[360px] w-[360px] bg-accent/10', animation: 'animate-drift' }]}
      />
      <div className="section-container">
        <Reveal>
          <span className="section-label">{lang === 'es' ? 'Experiencia' : 'Experience'}</span>
          <h2 className="section-title">
            {lang === 'es' ? 'Trayectoria laboral' : 'Work experience'}
          </h2>
        </Reveal>

        <div className="relative space-y-5 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-white/10 md:space-y-8 md:before:left-[23px]">
          {experience.map((job, i) => (
            <Reveal key={job.id} as="article" delay={i * 120} className="group relative pl-12 md:pl-14">
              <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-navy-800 text-accent transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:shadow-md group-hover:shadow-accent/15 md:h-12 md:w-12">
                <Briefcase size={18} />
              </div>

              <div className="glass-card glass-card-hover p-5 md:p-6">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.company}</h3>
                    <p className="text-accent">{t(job.role)}</p>
                  </div>
                  <span className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs text-slate-400">
                    {t(job.period)}
                  </span>
                </div>

                <ul className="mb-3 space-y-1.5 md:mb-4 md:space-y-2">
                  {t(job.highlights).map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex gap-2 text-sm leading-snug text-slate-300 md:leading-relaxed ${idx >= 2 ? 'max-md:hidden' : ''}`}
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent md:mt-2" />
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
            </Reveal>
          ))}
        </div>
      </div>
      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} className="animate-bounce" />
      </a>
    </section>
  )
}
