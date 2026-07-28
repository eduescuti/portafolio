import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Linkedin,
  Github,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { profile } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import { useIsDesktop } from '../lib/useDeviceCapabilities'
import Reveal from './Reveal'

const FORM_ID = 'mwvjlgzq'

/**
 * Link de contacto. Etiqueta arriba / valor abajo: alinea parejo entre filas y se lee
 * mucho mejor que en una sola línea. El tile del ícono lleva el color de cada red
 * (via --lc) para que la lista sea escaneable y no cinco tiles azules iguales.
 * El chevron es visible siempre en mobile: es la señal de "esto es tocable".
 */
function ContactLink({ href, icon: Icon, label, value, color, external = false }) {
  return (
    <m.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      whileTap={{ scale: 0.98 }}
      style={color ? { '--lc': color } : undefined}
      className="contact-link group glass-card relative flex items-center gap-3 overflow-hidden p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 lg:flex-1 lg:gap-4 lg:p-5"
    >
      <span className="contact-link__tile relative shrink-0 rounded-xl p-2.5 lg:p-3" aria-hidden>
        <Icon size={18} className="transition-transform duration-300 group-hover:scale-110 lg:h-5 lg:w-5" />
      </span>

      <div className="relative min-w-0 flex-1">
        <p className="text-[10px] font-medium tracking-wider text-slate-500 lg:text-xs">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-white transition-colors duration-300 group-hover:text-accent-light lg:text-base">
          {value}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="contact-link__chevron relative shrink-0 text-slate-600 transition-transform duration-300"
        aria-hidden
      />
    </m.a>
  )
}

export default function Contact() {
  const { t, lang } = useLanguage()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [state, handleSubmit, reset] = useForm(FORM_ID, {
    data: { 'g-recaptcha-response': executeRecaptcha },
  })
  // En mobile el formulario arranca colapsado (acordeón) para que la sección no abra
  // tan alta. En desktop se muestra siempre: como AnimatePresence lo desmonta al
  // cerrarse, hace falta saberlo en JS (no alcanza con clases CSS).
  const [formOpen, setFormOpen] = useState(false)
  const alwaysOpen = useIsDesktop()

  return (
    <section id="contact" className="cv-auto relative overflow-hidden border-t border-white/5">
      <div className="section-container">
        <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-8 lg:p-14">
          <Reveal>
            <span className="section-label">{lang === 'es' ? 'Contacto' : 'Contact'}</span>
            <h2 className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              {lang === 'es' ? 'Hablemos' : "Let's talk"}
            </h2>
            <p className="mb-6 max-w-xl text-base text-slate-400 sm:text-lg lg:mb-10">
              {lang === 'es'
                ? 'Estoy buscando oportunidades part-time o pasantías. ¡No dudes en escribirme!'
                : "I'm looking for part-time opportunities or internships. Don't hesitate to reach out!"}
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-8">
            {/*
            En desktop esta columna es flex y cada card lleva `lg:flex-1`: así las 5
            quedan de igual alto entre sí y en conjunto llenan exactamente el alto del
            formulario. Antes coincidían de casualidad (por padding) y cualquier cambio
            de contenido las desalineaba.
          */}
            <Reveal delay={100} className="flex flex-col gap-2 lg:h-full lg:gap-4">
              <ContactLink
                href={`mailto:${profile.email}`}
                icon={Mail}
                label={profile.email}
                value="Gmail"
                color="#4f8cff"
              />

              <ContactLink
                href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`}
                icon={MessageCircle}
                label={profile.phone}
                value="WhatsApp"
                color="#25D366"
                external
              />

              <ContactLink
                href={profile.linkedin}
                icon={Linkedin}
                label="Eduardo Escuti"
                value="LinkedIn"
                color="#0A66C2"
                external
              />

              <ContactLink
                href={profile.github}
                icon={Github}
                label="@eduescuti"
                value="Github"
                color="#CBD5E1"
                external
              />

              <ContactLink
                href="https://www.google.com/maps/search/?api=1&query=Buenos+Aires,+Argentina"
                icon={MapPin}
                label="Buenos Aires, Argentina"
                value={lang === 'es' ? 'Ubicación' : 'Location'}
                color="#F59E0B"
                external
              />
            </Reveal>

            <Reveal delay={200} className="glass-card overflow-hidden">
              {state.succeeded ? (
                <div
                  className="flex min-h-[380px] flex-col items-center justify-center p-5 py-6 text-center lg:p-6"
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
                  {/* Trigger del acordeón: solo mobile. Desde lg el form siempre está visible. */}
                  <m.button
                    type="button"
                    onClick={() => setFormOpen((v) => !v)}
                    whileTap={{ scale: 0.99 }}
                    aria-expanded={formOpen}
                    aria-controls="contact-form-panel"
                    className="flex w-full items-center justify-between gap-3 p-5 text-left lg:hidden"
                  >
                    <span className="text-base font-semibold text-white">
                      {lang === 'es' ? 'Enviame un mensaje' : 'Send me a message'}
                    </span>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent">
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${formOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </span>
                  </m.button>

                  <h3 className="hidden text-lg font-semibold text-white lg:block lg:p-6 lg:pb-4">
                    {lang === 'es' ? 'Enviame un mensaje' : 'Send me a message'}
                  </h3>

                  {/*
                  Acordeón con AnimatePresence: anima height a spring (mucho más natural
                  que grid-template-rows lineal) y desmonta el form al cerrarse, así no
                  quedan nodos de más en mobile. El padding va DENTRO del panel que se
                  recorta: si estuviera en el elemento con overflow-hidden, el recorte
                  ocurre en el borde de la caja de padding y el contenido se asoma.
                */}
                  <AnimatePresence initial={false}>
                    {(formOpen || alwaysOpen) && (
                      <m.div
                        id="contact-form-panel"
                        key="form-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 320,
                          damping: 34,
                          opacity: { duration: 0.2 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 lg:px-6 lg:pb-6">
                          <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
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
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 lg:py-3"
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
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 lg:py-3"
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
                                rows={3}
                                required
                                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 lg:py-3"
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

                            <p className="text-center text-[11px] leading-relaxed text-slate-600">
                              {lang === 'es' ? 'Protegido por reCAPTCHA · ' : 'Protected by reCAPTCHA · '}
                              <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 underline decoration-slate-700 underline-offset-2 transition hover:text-accent"
                              >
                                {lang === 'es' ? 'Privacidad' : 'Privacy'}
                              </a>
                              {' · '}
                              <a
                                href="https://policies.google.com/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 underline decoration-slate-700 underline-offset-2 transition hover:text-accent"
                              >
                                {lang === 'es' ? 'Términos' : 'Terms'}
                              </a>
                            </p>
                          </form>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
