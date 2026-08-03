import { useCallback, useRef, useState } from 'react'
import { projects } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'
import { useCardLink } from '../lib/useCardLink'
import Reveal from './Reveal'
import ProjectCard from './ProjectCard'

/**
 * Sección de Proyectos: una página de álbum de figuritas.
 *
 * Sin capa de álbumes con click-through: hoy hay 6 proyectos en 3 series y tres de cuatro
 * álbumes tendrían una sola figurita adentro, además de agregar un click antes de ver
 * nada. La grilla ES la página del álbum.
 *
 * Una columna en mobile y dos en desktop, siempre con figuritas horizontales. Dos y no
 * tres: con tres, cada carta medía ~340px de ancho en un contenedor de 1088 y la imagen
 * del proyecto —que es una captura de pantalla, no un ícono— quedaba ilegible.
 */
export default function Projects() {
  const { t, lang } = useLanguage()

  const [deepLink, setDeepLink] = useState(null)
  // Figurita abierta: { id, close }. Es una ref y no estado porque el único que la
  // consume es el listener de `popstate`; guardarla en estado re-renderizaría las seis
  // figuritas en cada apertura sin que ninguna cambie.
  const openCardRef = useRef(null)

  const handlePop = useCallback(() => {
    openCardRef.current?.close()
  }, [])

  const { pushCard, closeCardUrl } = useCardLink({
    projects,
    onDeepLink: setDeepLink,
    onPop: handlePop,
  })

  const handleOpened = useCallback(
    (id, close, options) => {
      openCardRef.current = { id, close }
      if (options?.fromLink) {
        // La orden de abrir por link se consume una sola vez: si quedara colgada, un
        // remontaje de la grilla volvería a abrir la figurita sola. La URL ya trae el
        // parámetro, así que tampoco hay que pushear otra entrada al historial.
        setDeepLink(null)
        return
      }
      pushCard(id)
    },
    [pushCard]
  )

  const handleClosed = useCallback(() => {
    openCardRef.current = null
    closeCardUrl()
  }, [closeCardUrl])

  return (
    <section id="projects" className="relative overflow-hidden border-t border-white/5">
      <div className="section-container">
        <Reveal>
          <span className="section-label">{lang === 'es' ? 'Proyectos' : 'Projects'}</span>
        </Reveal>

        <Reveal as="h2" delay={80} className="section-title">
          {lang === 'es' ? 'Lo que he construido' : 'What I have built'}
        </Reveal>

        <Reveal delay={160}>
          <p className="mb-10 max-w-2xl text-lg text-slate-400">
            {lang === 'es'
              ? 'Proyectos reales desarrollados en Andersson Consultores, Alexandria Solutions y la UCA. Tocá cualquier carta para darla vuelta.'
              : 'Real projects developed at Andersson Consultores, Alexandria Solutions and UCA. Tap any card to flip it.'}
          </p>
        </Reveal>

        {/* Una figurita por fila en mobile, a ancho completo de la columna. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 80} className="min-w-0">
              <ProjectCard
                project={project}
                t={t}
                lang={lang}
                autoOpen={deepLink?.id === project.id ? deepLink : null}
                onOpened={handleOpened}
                onClosed={handleClosed}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
