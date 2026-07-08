import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ScrollToTop() {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      aria-label={lang === 'es' ? 'Volver al inicio' : 'Back to top'}
      className={`group fixed bottom-14 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-accent text-white shadow-lg shadow-accent/30 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-light hover:shadow-xl hover:shadow-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 motion-reduce:transition-none md:right-8 ${visible
        ? 'translate-y-0 opacity-100'
        : 'pointer-events-none translate-y-16 opacity-0'
        }`}
    >
      <ArrowUp
        size={20}
        strokeWidth={2.5}
        className="transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
      />
    </button>
  )
}
