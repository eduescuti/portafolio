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
import ImpactBlock from './ImpactBlock'
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
          className={`h-2 w-2 rotate-45 rounded-[1px] ring-1 ring-white/40 ${rarity.gem}`}
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
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.color || 'from-navy-800 to-navy-900'
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
                ? 'text-xl font-bold leading-tight text-white sm:text-2xl'
                : 'line-clamp-2 text-sm font-bold leading-tight text-white sm:text-base lg:text-xl'
            }
          >
            {title}
          </p>
          <p
            className={
              fill
                ? 'mt-2 truncate font-mono text-xs leading-none text-accent sm:text-sm'
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

/**
 * Métrica de los botones del pie. En desktop la carta mide 780×520 y los botones a 12px se
 * leían como controles secundarios de la captura; a esta escala se leen como la salida de
 * la carta, que es lo que son. En mobile el alto es el recurso escaso y se quedan chicos.
 */
const BTN = {
  sm: { box: 'gap-1.5 px-3 py-2 text-xs', icon: 13 },
  lg: { box: 'gap-2 px-4 py-2.5 text-[13px]', icon: 15 },
}

function CopyLinkButton({ project, index, lang, size = 'sm', className = '' }) {
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

  const { box, icon } = BTN[size]

  return (
    <button
      type="button"
      ref={noDrag}
      onClick={(e) => {
        e.stopPropagation()
        copy()
      }}
      className={`inline-flex min-w-0 items-center justify-center truncate rounded-lg border border-white/15 font-semibold text-slate-300 transition-colors duration-300 hover:border-accent/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${box} ${className}`}
    >
      {copied ? (
        <Check size={icon} className="shrink-0 text-accent" />
      ) : (
        <Link2 size={icon} className="shrink-0" />
      )}
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
function Actions({ project, index, lang, es, layout = 'stack', showStatus = true, size = 'sm' }) {
  const noDrag = useNoDragRef()
  const canCopy = typeof navigator !== 'undefined' && Boolean(navigator.clipboard)
  const row = layout === 'row'
  const item = row ? 'min-w-0 flex-1' : 'w-full'
  const { box, icon } = BTN[size]

  return (
    <div className={row ? 'flex items-center gap-2' : 'space-y-2'}>
      {showStatus && project.status === 'wip' && (
        <span
          className={`inline-flex items-center justify-center rounded-lg border border-dashed border-white/15 font-medium text-slate-400 ${box} ${item}`}
        >
          <Zap size={icon} className="shrink-0 text-accent" />
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
          className={`inline-flex items-center justify-center truncate rounded-lg bg-accent font-semibold text-white transition-colors duration-300 hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${box} ${item}`}
        >
          <ExternalLink size={icon} className="shrink-0" />
          {es ? 'Ir al proyecto' : 'Visit project'}
        </a>
      )}

      {canCopy && (
        <CopyLinkButton project={project} index={index} lang={lang} size={size} className={item} />
      )}
    </div>
  )
}

/** Rótulo de sección del dorso (Rol · Descripción · Stack). */
function SectionLabel({ children, className = '' }) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 ${className}`}
    >
      {children}
    </p>
  )
}

/**
 * Resalta los tramos que el texto marca con **dobles asteriscos**.
 *
 * Existe por un pedido puntual —"Agentes de IA" tiene que brillar dentro del rol del CRM—
 * y se resolvió en el dato y no en el componente a propósito: qué palabra es la importante
 * lo sabe quien escribe la frase, no quien dibuja la carta. Cualquier texto del dorso puede
 * usarlo sin tocar código.
 *
 * Un `split` con grupo de captura devuelve [texto, marcado, texto, marcado, …], así que los
 * índices impares son siempre lo que iba entre asteriscos. Sin librería de markdown: acá
 * hace falta UNA marca, y traer un parser entero para eso sería pagar un kilobyte por
 * carácter.
 */
function Highlighted({ text }) {
  if (!text) return null
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="card-mark font-semibold">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

/**
 * Resuelve QUÉ texto le toca a esta carta. La portada no tiene contenido propio y usa el
 * del proyecto; una captura pisa sólo los campos que trae escritos y hereda el resto.
 *
 * `impactMobile` existe porque en dos proyectos los números que mejor resumen la carta no
 * son los mismos en las dos pantallas: en mobile hay tres columnas de ~95px y una etiqueta
 * como "páginas del flujo de reserva" no entra, así que ahí van los datos que se dicen más
 * corto. No es un capricho de diseño — es la misma carta contada con las palabras que
 * entran.
 */
function resolveBack(card, project, isDesktop) {
  const impact = isDesktop
    ? (card.impact ?? project.impact)
    : (card.impactMobile ?? card.impact ?? project.impactMobile ?? project.impact)

  const description = isDesktop
    ? (card.longDescription ?? card.description ?? project.longDescription ?? project.description)
    : (card.description ?? project.description)

  return { impact, description, role: card.role ?? project.role }
}

/**
 * Dorso de una carta del mazo — portada y capturas usan el MISMO componente.
 *
 * Antes eran dos (`CoverBack` y `ShotBack`) y se leían como dos diseños distintos: al pasar
 * de la portada a una captura se movía todo de lugar, el marcador de números aparecía y
 * desaparecía, y el pie cambiaba de tamaño. Ahora la única diferencia entre una y otra es
 * QUÉ dice cada campo (ver `resolveBack`) y qué se muestra en el ángulo del pie.
 *
 * El orden es el de una figurita de verdad, de arriba hacia abajo:
 *
 *      [ NÚMEROS GRANDES ] · Rol · Descripción · Stack · acciones
 *
 * Los números arriba y enormes, calcados del dorso de la carta del Hero, porque son el
 * gancho: tres cifras se leen antes que cualquier párrafo. Por eso además el dorso ya NO
 * lleva ni el título del proyecto ni el epígrafe de empresa · año — los dos vivían justo
 * en ese lugar y competían con lo único que se lee de un vistazo. La identidad de la carta
 * ya está en el frente que se acaba de girar, y en el pie sigue estando el nombre.
 *
 * Rol y Descripción van en contenedores DISTINTOS y no en dos párrafos seguidos: son dos
 * cosas distintas —qué hice yo contra qué es el proyecto— y a un reclutador le importa
 * poder saltar directo al primero. El Rol lleva caja propia con una barra de acento a la
 * izquierda; la Descripción es texto corriendo, sin caja. Sólo en desktop: en mobile no hay
 * alto para dos bloques y el Rol se cae entero (es lo primero que sobra cuando hay que
 * elegir, porque la descripción todavía dice qué es el proyecto y el rol no).
 *
 * En DESKTOP (780×520) la descripción es el bloque elástico y scrollea por dentro: los
 * textos de las capturas son largos a propósito —cuentan la decisión técnica detrás de esa
 * pantalla— y recortarlos en seco dejaría la explicación por la mitad. Todo lo demás es
 * `shrink-0`: perder los botones dejaría la carta sin salida.
 *
 * En MOBILE el dorso NO scrollea: se recorta. El mazo ya se navega con scroll vertical, así
 * que un segundo scroll adentro de la carta dejaría al dedo sin forma de saber si está
 * leyendo el dorso o pasando a la próxima carta.
 *
 * Y en mobile esto es un PRESUPUESTO de píxeles contra un alto atado al ancho del teléfono
 * (ver `computeTarget`), no una pila que fluye. En un viewport de 360px la carta mide
 * 336×224, y descontando el marco (`p-1.5` de `BackShell`) y el `p-2.5` de acá quedan 192px
 * para CUATRO bloques. Así se reparten, medido:
 *
 *      marcador 50 (+15 si lleva nota de alcance) · stack 17 · acciones 34
 *      · tres huecos de 6 = 18   →   119-134, y el resto es la descripción
 *
 * o sea 58-73px para el párrafo, que son cuatro o cinco renglones. De ahí salen varias
 * decisiones que de otro modo parecen caprichos:
 *
 *   · `p-2.5` y `gap-1.5` en vez de `p-3`/`gap-2`: son ~12px, casi un renglón entero.
 *   · Los chips del stack van en `size="xs"` (17px contra los 22,5 del `sm`). Es la única
 *     pieza que se podía achicar sin tocar texto que se lee.
 *   · El `line-clamp` de la descripción se afloja a 5 renglones cuando el marcador no tiene
 *     nota de alcance, que es justo cuando sobran esos 15px.
 *   · Todo lleva `leading` explícito. Sin eso el 1.5 que heredan de Preflight suma ~5px por
 *     renglón, y cinco renglones de más son el pie fuera de cuadro.
 *
 * El `flex-1 min-h-0` de la descripción es la red, no el presupuesto: absorbe el error si
 * alguien alarga un texto o si el viewport es más angosto que 360px. Lo que cede es ella y
 * el resto queda intacto, que es el único modo de falla aceptable.
 */
function CardBack({ card, project, t, lang, active, isDesktop, total, index }) {
  const es = lang === 'es'
  const isCover = card.kind === 'cover'
  const { impact, description, role } = resolveBack(card, project, isDesktop)

  // El chip "En desarrollo" sale una sola vez por mazo, en la portada: repetirlo en cada
  // captura sería decir tres veces lo mismo mientras se pasa.
  const actions = (size) => (
    <Actions
      project={project}
      index={index}
      lang={lang}
      es={es}
      layout="row"
      size={size}
      showStatus={isCover}
    />
  )

  // El stack se repite en todas las cartas del mazo porque es del proyecto y no de la
  // captura puntual, y está bien que así sea: evita que quien entró por una captura suelta
  // —por un link directo, por ejemplo— tenga que volver a la portada para saber con qué
  // está hecho lo que está mirando.
  const stack = (
    <TechRow
      items={project.tech}
      active={active}
      speed={38}
      fade="gradient"
      size={isDesktop ? 'sm' : 'xs'}
    />
  )

  if (!isDesktop) {
    const hasNote = Boolean(impact?.note || impact?.noteShort || impact?.kind === 'pending')

    return (
      <div className="relative flex h-full flex-col gap-1.5 p-2.5">
        <ImpactBlock impact={impact} lang={lang} compact className="shrink-0" />

        <div className="min-h-0 flex-1 overflow-hidden">
          <p
            className={`text-[11px] leading-snug text-slate-300 ${
              hasNote ? 'line-clamp-4' : 'line-clamp-5'
            }`}
          >
            <Highlighted text={t(description)} />
          </p>
        </div>

        {/* Sangra hasta los bordes de la carta (cancela el `p-2.5` del padre) y usa
            `fade="gradient"` y no `mask` porque esto vive dentro de un elemento que rota
            en 3D.
            Por debajo de 360px de viewport se cae: ahí la carta pierde ~27px de alto y esta
            es la única pieza que se puede sacar sin que falte un dato. */}
        <div className="-mx-2.5 hidden shrink-0 min-[360px]:block">{stack}</div>

        <div className="shrink-0">{actions('sm')}</div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full flex-col p-6">
      <ImpactBlock impact={impact} lang={lang} className="shrink-0" />

      {role && (
        // La barra de acento a la izquierda es lo que separa este bloque del de abajo de un
        // vistazo, sin necesidad de leer el rótulo. La Descripción, en contraste, no lleva
        // caja: si las dos la tuvieran volverían a leerse como el mismo bloque partido.
        <div className="mt-3 min-w-0 shrink-0 rounded-xl border border-white/10 border-l-2 border-l-accent/60 bg-white/[0.04] px-4 py-2">
          <SectionLabel>{es ? 'Rol' : 'Role'}</SectionLabel>
          <p className="mt-1 text-[13px] leading-snug text-slate-200">
            <Highlighted text={t(role)} />
          </p>
        </div>
      )}

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <SectionLabel className="shrink-0">{es ? 'Descripción' : 'Description'}</SectionLabel>

        {/* `overflow-y-auto` es la RED, no el diseño: los textos están escritos para entrar
            enteros en este hueco (ver el presupuesto de caracteres en `portfolio.js`) y en
            una carta de 780×520 no aparece ninguna barra. Existe porque `computeTarget`
            achica la carta en ventanas de menos de ~630px de alto, y ahí prefiero una
            barrita antes que texto cortado a mitad de palabra o un pie fuera de cuadro. */}
        <div className="mt-1.5 min-h-0 flex-1 overflow-y-auto pr-1">
          <p className="text-sm leading-relaxed text-slate-300">
            <Highlighted text={t(description)} />
          </p>
        </div>
      </div>

      <div className="mt-3 min-w-0 shrink-0 space-y-1">
        <SectionLabel>Stack</SectionLabel>
        {/* Sangra hasta los bordes de la carta (el padre tiene p-6): refuerza la lectura de
            "cinta que pasa" y le da al difuminado dónde apoyarse. */}
        <div className="-mx-6">{stack}</div>
      </div>

      {/* En desktop sobra ancho: el ángulo del pie y los botones comparten fila. La portada
          pone ahí cuántas capturas trae el mazo; una captura, el nombre del proyecto —que
          es el dato que el dorso ya no muestra arriba. */}
      <div className="mt-3 flex shrink-0 items-center justify-between gap-6 border-t border-white/10 pt-3">
        {isCover ? (
          total > 1 ? (
            <p className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-slate-500">
              <Images size={13} className="shrink-0 text-accent/70" />
              {/* Singular cuando hay una sola captura: el mazo del CRM tiene exactamente
                  una y decía "1 capturas en este mazo". */}
              <span className="truncate">
                {total - 1}{' '}
                {total === 2
                  ? es
                    ? 'captura en este mazo'
                    : 'screenshot in this deck'
                  : es
                    ? 'capturas en este mazo'
                    : 'screenshots in this deck'}
              </span>
            </p>
          ) : (
            <span />
          )
        ) : (
          <p className="min-w-0 truncate font-mono text-[11px] text-slate-500">
            {t(project.title)}
          </p>
        )}

        <div className="w-[21rem] shrink-0">{actions('lg')}</div>
      </div>
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
      <CardBack
        card={card}
        project={project}
        t={t}
        lang={lang}
        active={isActiveFace}
        isDesktop={isDesktop}
        total={total}
        index={index}
      />
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
