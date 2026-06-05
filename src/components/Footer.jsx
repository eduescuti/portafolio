import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-8">
        <p className="text-sm text-slate-500">
          © {year} {profile.name}.{' '}
          {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </p>
        <p className="font-mono text-xs text-slate-600">
          {lang === 'es' ? 'Hecho con' : 'Built with'} React + Vite + Tailwind
        </p>
      </div>
    </footer>
  )
}
