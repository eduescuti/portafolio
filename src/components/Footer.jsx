import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

function FooterSocial({ href, icon: Icon, label, external = true }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors duration-300 hover:border-accent/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <Icon size={16} />
    </a>
  )
}

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

        <div className="flex items-center gap-2">
          <FooterSocial href={profile.instagram} icon={Instagram} label="Instagram" />
          <FooterSocial href={profile.github} icon={Github} label="GitHub" />
          <FooterSocial href={profile.linkedin} icon={Linkedin} label="LinkedIn" />
          <FooterSocial href={`mailto:${profile.email}`} icon={Mail} label="Email" external={false} />
        </div>
      </div>
    </footer>
  )
}
