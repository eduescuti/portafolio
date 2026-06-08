import { ArrowDown, Mail, Download } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t, lang } = useLanguage()

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="section-container relative grid w-full items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="animate-fade-up opacity-0">
          <p className="mb-4 font-mono text-sm text-accent">
            {lang === 'es' ? 'Hola, soy' : "Hi, I'm"}
          </p>
          <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            {profile.name.split(' ')[0]}
            <br />
            <span className="gradient-text">{profile.name.split(' ')[1]}</span>
          </h1>
          <p className="mb-2 text-xl font-medium text-slate-300 md:text-2xl">
            {t(profile.role)}
          </p>
          <p className="mb-8 max-w-lg text-base text-slate-400">
            {t(profile.university)} · {profile.age} {lang === 'es' ? 'años' : 'years old'}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-light hover:shadow-accent/40"
            >
              <Mail size={16} />
              {lang === 'es' ? 'Contactame' : 'Contact me'}
            </a>
            <a
              href={lang === 'es' ? profile.cv.es : profile.cv.en}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-accent/40 hover:bg-white/5"
            >
              <Download size={16} />
              {lang === 'es' ? 'Descargar CV' : 'Download CV'}
            </a>
          </div>
        </div>

        <div className="animate-fade-up animation-delay-200 flex justify-center opacity-0 lg:justify-end">
          <div className="group relative cursor-default">
            <div className="absolute -inset-4 rounded-3xl blur-2xl transition-[filter] duration-[1500ms] ease-out group-hover:blur-3xl">
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/25 to-indigo-600/15"
                aria-hidden
              />
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/45 to-indigo-500/30 opacity-0 transition-opacity duration-[1500ms] ease-out group-hover:opacity-100"
                aria-hidden
              />
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/40 transition-all duration-[1500ms] ease-out group-hover:-translate-y-1.5 group-hover:border-accent/35 group-hover:shadow-[0_24px_48px_-12px_rgba(79,140,255,0.25)] motion-reduce:group-hover:translate-y-0">
              <img
                src="/profile.png"
                alt={profile.name}
                className="h-72 w-64 object-cover object-top transition-transform duration-[1500ms] ease-out will-change-transform group-hover:scale-[1.04] motion-reduce:group-hover:scale-100 md:h-80 md:w-72 lg:h-96 lg:w-80"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent opacity-60 transition-opacity duration-[1500ms] ease-out group-hover:opacity-40" />
              <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-[1500ms] ease-out group-hover:left-full group-hover:opacity-100 motion-reduce:hidden" />
            </div>

            <div className="absolute -bottom-3 -right-3 rounded-xl border border-white/10 bg-navy-900/90 px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-[1500ms] ease-out group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:bg-navy-800/95 group-hover:shadow-accent/20 motion-reduce:group-hover:translate-y-0">
              <p className="font-mono text-xs text-accent transition-colors duration-[1500ms] ease-out group-hover:text-accent-light">
                Full Stack Dev
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} className="animate-bounce" />
      </a>
    </section>
  )
}
