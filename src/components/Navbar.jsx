import { useState, useEffect } from 'react'
import { Globe, ArrowUpRight } from 'lucide-react'
import { navLinks } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

function MenuToggle({ open, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-accent/30 hover:bg-white/10 hover:text-white md:hidden"
      aria-label={label}
      aria-expanded={open}
    >
      <span
        className={`absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[calc(50%-6px)]'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      />
      <span
        className={`absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[calc(50%+6px)]'
        }`}
      />
    </button>
  )
}

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -72 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const showBarBackground = scrolled || open

  return (
    <>
      <div
        className={`mobile-nav-backdrop fixed inset-0 z-40 bg-navy-950/65 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <header
        className={`mobile-nav-header fixed inset-x-0 top-0 z-50 md:overflow-visible ${
          showBarBackground
            ? 'border-b border-white/[0.08] bg-navy-950/70 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        } ${open ? 'mobile-nav-header--open' : ''}`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 md:px-8 md:py-4">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="group text-lg font-bold tracking-tight text-white transition hover:text-accent"
          >
            EE
            <span className="text-accent transition group-hover:text-accent-light">.</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {t(link)}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition duration-300 ${
                open
                  ? 'border-accent/30 bg-accent/10 text-white'
                  : 'border-white/10 text-slate-300 hover:border-accent/40 hover:text-white'
              }`}
              aria-label="Toggle language"
            >
              <Globe size={15} />
              {lang.toUpperCase()}
            </button>

            <MenuToggle
              open={open}
              onClick={() => setOpen((prev) => !prev)}
              label={
                open
                  ? lang === 'es'
                    ? 'Cerrar menú'
                    : 'Close menu'
                  : lang === 'es'
                    ? 'Abrir menú'
                    : 'Open menu'
              }
            />
          </div>
        </nav>

        <div
          className={`mobile-nav-drawer grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
          inert={!open ? '' : undefined}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="relative border-t border-white/10 px-6 pb-8 pt-5">
              <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

              <p className="mobile-nav-item mb-5 font-mono text-xs uppercase tracking-widest text-accent">
                {lang === 'es' ? 'Navegación' : 'Navigation'}
              </p>

              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <li key={link.id} className={`mobile-nav-item mobile-nav-item--${index + 1}`}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      tabIndex={open ? 0 : -1}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-transparent px-4 py-3.5 text-left transition hover:border-white/10 hover:bg-white/5"
                    >
                      <span className="font-mono text-xs text-slate-600 transition group-hover:text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-base font-medium text-slate-200 transition group-hover:text-white">
                        {t(link)}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 opacity-0 transition group-hover:text-accent group-hover:opacity-100"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mobile-nav-item mobile-nav-item--cta mt-6 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  tabIndex={open ? 0 : -1}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-light"
                >
                  {lang === 'es' ? 'Contactame' : 'Contact me'}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
