import { useForm, ValidationError } from '@formspree/react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Linkedin,
  Instagram,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
} from 'lucide-react'
import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const FORM_ID = 'mwvjlgzq'

function ContactLink({ href, icon: Icon, label, value, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group glass-card glass-card-hover relative flex items-center gap-4 overflow-hidden p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 active:scale-[0.99]"
    >
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative rounded-xl bg-accent/15 p-3 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/25 group-hover:shadow-md group-hover:shadow-accent/20">
        <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div className="relative min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
          {label}
        </p>
        <p className="truncate font-medium text-white transition-colors duration-300 group-hover:text-accent-light">
          {value}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="relative shrink-0 translate-x-1 text-slate-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
        aria-hidden
      />
    </a>
  )
}

export default function Contact() {
  const { t, lang } = useLanguage()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [state, handleSubmit, reset] = useForm(FORM_ID, {
    data: { 'g-recaptcha-response': executeRecaptcha },
  })

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
            <ContactLink
              href={`mailto:${profile.email}`}
              icon={Mail}
              label="Email"
              value={profile.email}
            />

            <ContactLink
              href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`}
              icon={MessageCircle}
              label="WhatsApp"
              value={profile.phone}
              external
            />

            <ContactLink
              href={profile.linkedin}
              icon={Linkedin}
              label="LinkedIn"
              value="Eduardo Escuti"
              external
            />

            <ContactLink
              href={profile.instagram}
              icon={Instagram}
              label="Instagram"
              value="@eduescuti"
              external
            />

            <ContactLink
              href="https://www.google.com/maps/search/?api=1&query=Buenos+Aires,+Argentina"
              icon={MapPin}
              label={lang === 'es' ? 'Ubicación' : 'Location'}
              value="Buenos Aires, Argentina"
              external
            />
          </div>

          <div className="glass-card p-6">
            {state.succeeded ? (
              <div
                className="flex min-h-[380px] flex-col items-center justify-center py-6 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="animate-fade-up mb-6">
                  <div className="relative mx-auto flex h-[72px] w-[72px] items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-emerald-500/15 blur-xl" aria-hidden />
                    <span
                      className="relative flex h-full w-full items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10"
                      aria-hidden
                    >
                      <CheckCircle2 className="text-emerald-400" size={36} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>

                <h3 className="animate-fade-up animation-delay-100 mb-2 text-xl font-semibold text-white">
                  {lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </h3>

                <p className="animate-fade-up animation-delay-200 mb-8 max-w-xs text-sm leading-relaxed text-slate-400">
                  {lang === 'es'
                    ? 'Gracias por escribirme. Revisaré tu mensaje y te responderé lo antes posible.'
                    : "Thanks for reaching out. I'll review your message and get back to you as soon as possible."}
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="animate-fade-up animation-delay-300 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-accent/30 hover:bg-white/[0.07] hover:text-white"
                >
                  <RotateCcw size={15} />
                  {lang === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            ) : (
              <>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {lang === 'es' ? 'Enviame un mensaje' : 'Send me a message'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm text-slate-400">
                      {lang === 'es' ? 'Nombre' : 'Name'}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                      placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                    />
                    <ValidationError
                      prefix={lang === 'es' ? 'Nombre' : 'Name'}
                      field="name"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
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
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                      placeholder="tu@email.com"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
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
                    <ValidationError
                      prefix={lang === 'es' ? 'Mensaje' : 'Message'}
                      field="message"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light disabled:opacity-60"
                  >
                    <Send size={16} />
                    {state.submitting
                      ? lang === 'es'
                        ? 'Enviando...'
                        : 'Sending...'
                      : lang === 'es'
                        ? 'Enviar mensaje'
                        : 'Send message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
