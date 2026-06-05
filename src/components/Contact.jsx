import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t, lang } = useLanguage()

  return (
    <section id="contact" className="relative border-t border-white/5 bg-navy-900/50">
      <div className="section-container">
        <span className="section-label">{lang === 'es' ? 'Contacto' : 'Contact'}</span>
        <h2 className="section-title">
          {lang === 'es' ? 'Hablemos' : "Let's talk"}
        </h2>
        <p className="mb-12 max-w-xl text-slate-400">
          {lang === 'es'
            ? 'Estoy buscando oportunidades part-time o pasantías. ¡No dudes en escribirme!'
            : "I'm looking for part-time opportunities or internships. Don't hesitate to reach out!"}
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="glass-card flex items-center gap-4 p-5 transition hover:border-accent/30 hover:bg-white/[0.07]"
            >
              <div className="rounded-xl bg-accent/15 p-3 text-accent">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</p>
                <p className="font-medium text-white">{profile.email}</p>
              </div>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="glass-card flex items-center gap-4 p-5 transition hover:border-accent/30 hover:bg-white/[0.07]"
            >
              <div className="rounded-xl bg-accent/15 p-3 text-accent">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {lang === 'es' ? 'Teléfono' : 'Phone'}
                </p>
                <p className="font-medium text-white">{profile.phone}</p>
              </div>
            </a>

            <div className="glass-card flex items-center gap-4 p-5">
              <div className="rounded-xl bg-accent/15 p-3 text-accent">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {lang === 'es' ? 'Ubicación' : 'Location'}
                </p>
                <p className="font-medium text-white">{t(profile.location)}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              {lang === 'es' ? 'Enviame un mensaje' : 'Send me a message'}
            </h3>
            <form
              action={`mailto:${profile.email}`}
              method="POST"
              encType="text/plain"
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-slate-400">
                  {lang === 'es' ? 'Nombre' : 'Name'}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-slate-400">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm text-slate-400">
                  {lang === 'es' ? 'Mensaje' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  placeholder={lang === 'es' ? 'Tu mensaje...' : 'Your message...'}
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light"
              >
                <Send size={16} />
                {lang === 'es' ? 'Enviar mensaje' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
