import { MapPin, Languages } from 'lucide-react'
import { profile, aboutText, education } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t, lang } = useLanguage()

  return (
    <section id="about" className="relative border-t border-white/5 bg-navy-900/50">
      <div className="section-container">
        <span className="section-label">{lang === 'es' ? 'Sobre mí' : 'About me'}</span>
        <h2 className="section-title">
          {lang === 'es' ? 'Quién soy' : 'Who I am'}
        </h2>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-lg leading-relaxed text-slate-300">
              {t(aboutText)}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={18} className="shrink-0 text-accent" />
                <span>{t(profile.location)}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Languages size={18} className="shrink-0 text-accent" />
                <span>{lang === 'es' ? 'Español · Inglés' : 'Spanish · English'}</span>
              </div>
            </div>
          </div>

          <div className="glass-card glass-card-hover p-6">
            <h3 className="mb-5 text-lg font-semibold text-white">
              {lang === 'es' ? 'Educación' : 'Education'}
            </h3>
            <div className="space-y-5">
              {education.map((item, i) => (
                <div key={i} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-white/10 last:before:hidden">
                  <div className="absolute left-0 top-2 h-2 w-2 -translate-x-[3px] rounded-full bg-accent" />
                  <p className="font-medium text-white">{t(item.institution)}</p>
                  <p className="text-sm text-slate-400">{t(item.degree)}</p>
                  <p className="mt-1 font-mono text-xs text-accent">{t(item.period)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
