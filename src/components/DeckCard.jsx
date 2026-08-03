import { useEffect, useRef, useState } from 'react'
import {
  BarChart3,
  Calendar,
  Check,
  ExternalLink,
  FolderOpen,
  GraduationCap,
  Images,
  Link2,
  MessageSquare,
  Zap,
} from 'lucide-react'
import { buildCardUrl } from '../lib/useCardLink'
import { useNoDragRef } from '../lib/useNoDragRef'
import { EdgeSweep } from './CardSweep'
import CardFlipper from './CardFlipper'
import TechRow from './TechRow'

const iconMap = { BarChart3, MessageSquare, Zap, Calendar, GraduationCap }

// Radio de la figurita. No usa el `lg:rounded-[2rem]` de la carta del Hero: esa es
// vertical y grande, y 32px de radio sobre una carta horizontal de 224px de alto se comen
// las esquinas. Tiene que repetirse igual en el EdgeSweep (ver su doc).
export const RADIUS = 'rounded-2xl'
const INNER_RADIUS = 'rounded-xl'

/** Fila de gemas: 3 legendaria, 2 épica, 1 rara. Es la señal que se lee sin abrir nada. */
export function RarityGems({ rarity, className = '' }) {
  return (
    <span className={`flex gap-1 ${className}`} aria-hidden>
      {Array.from({ length: rarity.gems }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rotate-45 rounded-[1px] ring-1 ring-white/40 ${rarity.gem}`}
        />
      ))}
    </span>
  )
}

function Thumb({ src, project, className = '' }) {
  const Icon = iconMap[project.icon] || FolderOpen

  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        // Sin esto el navegador inicia su propio arrastre nativo de imagen al apretar con
        // el mouse y cancela el gesto de Motion.
        draggable={false}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    )
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
        project.color || 'from-navy-800 to-navy-900'
      } ${className}`}
    >
      <Icon size={44} className="text-white/80" />
    </div>
  )
}

/**
 * Frente de una carta: imagen a sangre, degradado y dos líneas de texto abajo. Lo usan
 * la figurita cerrada de la grilla, la portada del mazo y cada carta de captura.
 */
export function CardFace({
  src,
  project,
  title,
  subtitle,
  rarity,
  fill = false,
  shine = false,
  tone = 'default',
  zoomOnHover = false,
}) {
  return (
    <div
      className={`holo-border ${rarity.border} relative h-full ${RADIUS} p-1.5 shadow-xl shadow-black/40 lg:p-2`}
    >
      {shine === 'edge' && <EdgeSweep tone={tone} radius={RADIUS} />}

      <div className={`relative h-full overflow-hidden ${INNER_RADIUS}`}>
        <Thumb
          src={src}
          project={project}
          className={zoomOnHover ? 'transition-transform duration-500 ease-out group-hover:scale-[1.04]' : ''}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
        />

        <RarityGems rarity={rarity} className="absolute right-2.5 top-2.5" />

        {/* La escala `lg:` de la variante chica creció junto con la grilla: dos columnas
            dejan la figurita en ~530px de ancho, y ahí un título de 18px se leía como un
            pie de foto en vez de como el nombre de la carta.
            La variante `fill` subió por lo mismo un escalón más arriba: es la carta
            abierta, 780px de ancho, y a 24px el título todavía se leía como un epígrafe
            sobre una foto enorme en vez de como el nombre de la carta. */}
        <div className={`absolute inset-x-0 bottom-0 ${fill ? 'p-4 sm:p-5' : 'p-2.5 sm:p-3.5 lg:p-5'}`}>
          <p
            className={
              fill
                ? 'text-2xl font-bold leading-tight text-white sm:text-3xl'
                : 'line-clamp-2 text-sm font-bold leading-tight text-white sm:text-base lg:text-xl'
            }
          >
            {title}
          </p>
          <p
            className={
              fill
                ? 'mt-2 truncate font-mono text-sm leading-none text-accent sm:text-base'
                : 'mt-1 truncate font-mono text-[10px] leading-none text-accent sm:text-xs lg:mt-1.5 lg:text-sm'
            }
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/** Envoltorio del dorso: fondo opaco y aurora como gradiente (nunca blur: esto rota). */
function BackShell({ rarity, shine, tone, children }) {
  return (
    <div
      className={`holo-border ${rarity.border} relative h-full ${RADIUS} p-1.5 shadow-xl shadow-black/40 lg:p-2`}
    >
      {shine === 'edge' && <EdgeSweep tone={tone} radius={RADIUS} />}

      <div className={`relative h-full overflow-hidden bg-navy-900 ${INNER_RADIUS}`}>
        {/* Aurora como gradiente y no como blur: esto vive dentro de un elemento que rota
            en 3D y un blur se re-rasteriza en cada frame del giro. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,140,255,0.22),transparent_60%)]"
        />
        {children}
      </div>
    </div>
  )
}

function CopyLinkButton({ project, index, lang, className = '' }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)
  const noDrag = useNoDragRef()

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildCardUrl(project.id, { index }))
      setCopied(true)
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Permiso denegado o contexto no seguro: el botón simplemente no confirma.
    }
  }

  return (
    <button
      type="button"
      ref={noDrag}
      onClick={(e) => {
        e.stopPropagation()
        copy()
      }}
      className={`inline-flex min-w-0 items-center justify-center gap-1.5 truncate rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors duration-300 hover:border-accent/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
    >
      {copied ? <Check size={13} className="shrink-0 text-accent" /> : <Link2 size={13} className="shrink-0" />}
      {copied ? (lang === 'es' ? '¡Copiado!' : 'Copied!') : lang === 'es' ? 'Copiar link' : 'Copy link'}
    </button>
  )
}

/**
 * Ir al proyecto + copiar link. Las llevan tanto el dorso de la portada como el de cada
 * captura: si alguien llegó a una captura puntual, obligarlo a volver a la portada para
 * poder abrir el proyecto sería mandarlo a buscar el botón a otro lado.
 *
 * `index` es la posición de ESTA carta en el mazo, así que el link copiado devuelve a la
 * captura que se está mirando y no al principio del mazo.
 *
 * `layout='row'` las pone lado a lado: en el dorso de una captura el alto es el recurso
 * escaso y el ancho sobra.
 */
function Actions({ project, index, lang, es, layout = 'stack', showStatus = true }) {
  const noDrag = useNoDragRef()
  const canCopy = typeof navigator !== 'undefined' && Boolean(navigator.clipboard)
  const row = layout === 'row'
  const item = row ? 'min-w-0 flex-1' : 'w-full'

  return (
    <div className={row ? 'flex items-center gap-2' : 'space-y-2'}>
      {showStatus && project.status === 'wip' && (
        <span
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-xs font-medium text-slate-400 ${item}`}
        >
          <Zap size={13} className="shrink-0 text-accent" />
          {es ? 'En desarrollo' : 'In development'}
        </span>
      )}

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          ref={noDrag}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center justify-center gap-1.5 truncate rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition-colors duration-300 hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${item}`}
        >
          <ExternalLink size={13} className="shrink-0" />
          {es ? 'Ir al proyecto' : 'Visit project'}
        </a>
      )}

      {canCopy && <CopyLinkButton project={project} index={index} lang={lang} className={item} />}
    </div>
  )
}

/**
 * Dorso de la portada. Es el único que lleva toda la información del proyecto.
 *
 * En desktop hay 680×453 de carta y va a dos columnas. En mobile hay ~279×186 y NO
 * scrollea: se recorta. El mazo en mobile ya se navega con scroll vertical, así que un
 * segundo scroll adentro de la carta dejaría al dedo sin forma de saber si está leyendo
 * el dorso o pasando a la próxima carta.
 */
function CoverBack({ project, t, lang, active, isDesktop, total, index }) {
  const es = lang === 'es'

  if (!isDesktop) {
    return (
      <div className="relative flex h-full flex-col gap-1.5 p-3">
        <p className="truncate font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
          {t(project.serie)} · {project.year}
        </p>
        <h3 className="text-sm font-bold leading-tight text-white">{t(project.title)}</h3>
        <p className="line-clamp-3 text-[11px] leading-snug text-slate-300">
          {t(project.description)}
        </p>
        <div className="-mx-3 mt-auto">
          <TechRow items={project.tech} active={active} speed={38} fade="gradient" />
        </div>
        <Actions project={project} index={index} lang={lang} es={es} />
      </div>
    )
  }

  return (
    <div className="relative grid h-full grid-cols-[1.15fr_1fr] gap-5 p-5">
      <div className="flex min-w-0 flex-col">
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          {t(project.serie)} · {project.year}
        </p>
        <h3 className="mt-1.5 text-2xl font-bold leading-tight text-white">{t(project.title)}</h3>

        <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
          {t(project.longDescription) || t(project.description)}
        </p>

        {project.role && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {es ? 'Rol' : 'Role'}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-slate-300">{t(project.role)}</p>
          </div>
        )}

        {total > 1 && (
          <p className="mt-auto flex items-center gap-1.5 pt-3 font-mono text-[11px] text-slate-500">
            <Images size={13} className="shrink-0 text-accent/70" />
            {total - 1} {es ? 'capturas en este mazo' : 'screenshots in this deck'}
          </p>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="min-w-0 space-y-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Stack</p>
          {/* `fade="gradient"` y no `mask`: la máscara se re-evaluaría en cada frame del
              giro. El degradado se apoya en el navy-900 opaco del dorso. */}
          <TechRow items={project.tech} active={active} speed={38} fade="gradient" />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {es ? 'Destacado' : 'Highlights'}
          </p>
          {/* Lista con viñetas y no chips sueltos: como chips se leían igual que las
              etiquetas decorativas del stack; como lista se leen como logros. */}
          <ul className="mt-1.5 space-y-1">
            {t(project.highlights)
              .slice(0, 8)
              .map((h) => (
                <li key={h} className="flex gap-1.5 text-[12px] leading-snug text-slate-300">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                  {h}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-auto">
          <Actions project={project} index={index} lang={lang} es={es} />
        </div>
      </div>
    </div>
  )
}

/**
 * Dorso de una captura: describe esa pantalla y cierra con el stack (y, en desktop, unos
 * highlights del proyecto).
 *
 * El epígrafe dice la empresa y el año, no "Captura 2 de 3": el contador no le contaba
 * nada a nadie —la posición en el mazo ya la marcan los puntos en desktop y el scroll en
 * mobile— mientras que el contexto de dónde y cuándo se desarrolló el proyecto sí importa,
 * y es lo único que estas cartas sueltas no tenían.
 *
 * El stack y los highlights se repiten en todas las cartas del mazo porque son del
 * proyecto y no de la captura puntual, y está bien que así sea: son el mismo dato que ya
 * está en la portada, pero acá evitan que quien entró por una captura suelta —por un link
 * directo, por ejemplo— tenga que volver a la primera carta para saber con qué está hecho
 * lo que está mirando. Es contenido real, no relleno: una descripción corta de dos líneas
 * dentro de una carta de 780×520 dejaba la mitad de abajo vacía.
 *
 * Los highlights van sólo en desktop y acotados a 4 (`CoverBack` muestra hasta 8): ahí
 * sobra alto para una segunda lista sin competir con la descripción. En mobile el dorso no
 * scrollea (ver `CoverBack`) y el alto es más escaso, así que se suma sólo el stack —el
 * mismo criterio que ya usa la portada en mobile, que tampoco muestra highlights ahí.
 */
function ShotBack({ card, project, t, lang, index, isDesktop, active }) {
  const es = lang === 'es'
  const hasText = Boolean(card.title || card.description)
  const highlights = t(project.highlights).slice(0, 4)

  return (
    <div className={`relative flex h-full flex-col ${isDesktop ? 'p-6' : 'p-3'}`}>
      <p
        className={`truncate font-mono uppercase tracking-[0.18em] text-slate-500 ${
          isDesktop ? 'text-[10px]' : 'text-[9px]'
        }`}
      >
        {t(project.subtitle)}
        {isDesktop && ` · ${project.year}`}
      </p>

      {hasText ? (
        <>
          <h3
            className={`mt-1.5 font-bold leading-tight text-white ${
              isDesktop ? 'text-2xl' : 'text-sm'
            }`}
          >
            {t(card.title) || t(project.title)}
          </h3>
          {/* `text-base` y no el `text-[13px]` que traía: son dos líneas de texto dentro
              de una carta de 780×520, y a 13px se leían como una nota al pie de la captura
              en vez de como lo que explica lo que estás mirando. */}
          <p
            className={`mt-2.5 leading-relaxed text-slate-300 ${
              isDesktop ? 'text-base' : 'line-clamp-3 text-[11px] leading-snug'
            }`}
          >
            {t(card.description)}
          </p>
        </>
      ) : (
        <p className={`mt-2 italic text-slate-500 ${isDesktop ? 'text-sm' : 'text-[11px]'}`}>
          {es ? 'Sin descripción todavía.' : 'No description yet.'}
        </p>
      )}

      {isDesktop ? (
        <>
          {/* En flujo normal y no en el bloque `mt-auto` de más abajo: tiene que quedar
              pegado a la descripción, no flotar pegado al pie. Lo que sobra de alto se
              lo queda el hueco entre esto y el bloque de Stack. */}
          {highlights.length > 0 && (
            <div className="mt-5 min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                {es ? 'Destacado' : 'Highlights'}
              </p>
              <ul className="mt-1.5 space-y-1">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-1.5 text-[12px] leading-snug text-slate-300">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* `mt-auto` acá y no en el pie: el stack y el pie son un bloque solo, y lo que
              tiene que crecer es el hueco entre lo anterior y ese bloque. */}
          <div className="mt-auto min-w-0 space-y-1.5 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Stack
            </p>
            {/* Sangra hasta los bordes de la carta (el padre tiene p-6): refuerza la
                lectura de "cinta que pasa" y le da al difuminado dónde apoyarse.
                `fade="gradient"` y no `mask` por lo mismo que en la portada — esto vive
                dentro de un elemento que rota en 3D. */}
            <div className="-mx-6">
              <TechRow items={project.tech} active={active} speed={38} fade="gradient" />
            </div>
          </div>

          {/* En desktop sobra ancho: el nombre del proyecto y los botones comparten fila. */}
          <div className="mt-4 flex items-center justify-between gap-6 border-t border-white/10 pt-4">
            <p className="min-w-0 truncate font-mono text-[11px] text-slate-500">
              {t(project.title)}
            </p>
            <div className="w-72 shrink-0">
              <Actions project={project} index={index} lang={lang} es={es} layout="row" showStatus={false} />
            </div>
          </div>
        </>
      ) : (
        // En mobile el dorso no scrollea (ver `CoverBack`), así que la línea con el
        // nombre del proyecto se cae: el epígrafe de arriba ya ubica la carta.
        <div className="mt-auto space-y-2 border-t border-white/10 pt-2.5">
          {/* Mismo criterio que `CoverBack` en mobile: el stack sangra a los bordes de la
              carta (cancela el `p-3` del padre) y las Acciones se quedan adentro. */}
          <div className="-mx-3">
            <TechRow items={project.tech} active={active} speed={38} fade="gradient" />
          </div>
          <Actions project={project} index={index} lang={lang} es={es} layout="row" showStatus={false} />
        </div>
      )}
    </div>
  )
}

/**
 * Una carta del mazo.
 *
 * Activa: gira (por tap, nunca por arrastre — el arrastre horizontal navega el mazo en
 * desktop y en mobile ni existe).
 *
 * Inactiva: sin envoltura 3D ni interactividad, porque una carta borrosa girando no se
 * entiende — pero SÍ respeta si el usuario la había dejado dada vuelta (`initialBack`,
 * que arma `ProjectDeck` a partir de qué cartas giraste en este mazo): mostrar el frente
 * de una carta que dejaste mirando el dorso sería que la figurita "se acomodara sola" en
 * cuanto dejás de mirarla directamente, que es lo raro que se reportó. El dorso ahí es
 * estático — mismo contenido que el de la carta activa, sin `CardFlipper` alrededor.
 */
export default function DeckCard({
  card,
  project,
  t,
  lang,
  rarity,
  tone,
  total,
  index,
  active,
  isDesktop,
  reduce,
  initialBack = false,
  onDeckNavigate,
  onFlip,
}) {
  const isCover = card.kind === 'cover'
  const src = isCover ? project.imageBackground : card.src
  const title = isCover ? t(project.title) : t(card.title) || t(project.title)
  // Todas las cartas del mazo llevan el mismo subtítulo: la empresa donde se desarrolló
  // el proyecto. Antes las capturas mostraban "Captura 1/2" ahí, que era información de
  // navegación puesta en el lugar de la identidad de la carta.
  const subtitle = t(project.subtitle)

  const face = (fill, shine) => (
    <CardFace
      src={src}
      project={project}
      title={title}
      subtitle={subtitle}
      rarity={rarity}
      fill={fill}
      shine={shine}
      tone={tone}
    />
  )

  // `isActiveFace` sólo importa para el ticker del stack (TechRow se detiene cuando no
  // está a la vista): en la rama inactiva-pero-girada de acá abajo siempre es `false`,
  // igual que el resto de lo que le pasa a una carta que no es la activa (blur fijo,
  // sin shine).
  const back = (isActiveFace) => (
    <BackShell rarity={rarity} shine={isActiveFace && !reduce ? 'edge' : false} tone={tone}>
      {isCover ? (
        <CoverBack
          project={project}
          t={t}
          lang={lang}
          active={isActiveFace}
          isDesktop={isDesktop}
          total={total}
          index={index}
        />
      ) : (
        <ShotBack
          card={card}
          project={project}
          t={t}
          lang={lang}
          index={index}
          isDesktop={isDesktop}
          active={isActiveFace}
        />
      )}
    </BackShell>
  )

  if (!active) return initialBack ? back(false) : face(true, false)

  return (
    <CardFlipper
      reduce={reduce}
      radius={RADIUS}
      label={lang === 'es' ? 'Girar la figurita' : 'Flip the card'}
      initialBack={initialBack}
      // El arrastre horizontal navega el mazo en vez de girar; el giro queda en el tap.
      // En mobile no hay arrastre en absoluto: ahí se navega con el scroll nativo.
      drag={onDeckNavigate ? 'deck' : false}
      onDeckNavigate={onDeckNavigate}
      onFlip={onFlip}
      front={() => face(true, reduce ? false : 'edge')}
      back={back}
    />
  )
}
