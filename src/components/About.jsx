import { ArrowDown, MapPin, Languages } from 'lucide-react'
import { profile, aboutText, education } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import AmbientBackground from './AmbientBackground'

export default function About() {
  const { t, lang } = useLanguage()

  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden border-t border-white/5 bg-navy-900/50">
      <AmbientBackground
        blobs={[{ className: '-right-40 top-1/4 h-[380px] w-[380px] bg-accent/10', animation: 'animate-drift-slow' }]}
      />
      <div className="section-container">
        <Reveal>
          <span className="section-label">{lang === 'es' ? 'Sobre mí' : 'About me'}</span>
          <h2 className="section-title">
            {lang === 'es' ? 'Quién soy' : 'Who I am'}
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal delay={100}>
            <div className="mb-5 space-y-3 md:mb-6 md:space-y-4">
              {t(aboutText).map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-base leading-relaxed text-slate-300 md:text-lg ${i >= 1 ? 'max-md:hidden' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 md:gap-3">
              <div className="flex items-center gap-3 text-sm text-slate-400 md:text-base">
                <MapPin size={18} className="shrink-0 text-accent" />
                <span>{t(profile.location)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 md:text-base">
                <Languages size={18} className="shrink-0 text-accent" />
                <span>{lang === 'es' ? 'Español · Inglés' : 'Spanish · English'}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="glass-card glass-card-hover p-5 md:p-6">
            <h3 className="mb-4 text-lg font-semibold text-white md:mb-5">
              {lang === 'es' ? 'Educación' : 'Education'}
            </h3>
            <div className="space-y-4 md:space-y-5">
              {education.map((item, i) => (
                <div key={i} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-white/10 last:before:hidden">
                  <div className="absolute left-0 top-2 h-2 w-2 -translate-x-[3px] rounded-full bg-accent" />
                  <p className="font-medium text-white">{t(item.institution)}</p>
                  <p className="text-sm text-slate-400">{t(item.degree)}</p>
                  <p className="mt-1 font-mono text-xs text-accent">{t(item.period)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} className="animate-bounce" />
      </a>
    </section>
  )
}
