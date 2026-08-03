import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { profile, projects, skills } from '../data/portfolio'
import { ageFrom, yearsSince } from '../lib/careerStats'
import { useLanguage } from '../context/LanguageContext'
import { useCardOverlay } from '../lib/useCardOverlay'
import { getRarity, sweepTone } from '../lib/rarity'
import AnimatedCounter from './AnimatedCounter'
import CardSweep, { EdgeSweep } from './CardSweep'
import ContributionGraph from './ContributionGraph'
import FlipCard from './FlipCard'
import TechRow from './TechRow'

// El micro-balanceo de descubribilidad se muestra una única vez por carga de página:
// es una pista de "esto se toca", no un efecto decorativo que valga repetir.
let wobbleShown = false

// La carta del Hero es "legendaria": usa el barrido iridescente y el borde de tres tonos,
// igual que la figurita más rara de Proyectos. No lee `rarity` de ningún dato porque no
// vive en `projects` — es la única carta del sitio que no es un proyecto.
const HERO_RARITY = 'legendary'
const HERO_BORDER = getRarity(HERO_RARITY).border
const HERO_TONE = sweepTone(HERO_RARITY)

// Aspecto de la carta. El mismo número que usa `computeTarget` para la carta abierta: con
// los dos rects proporcionales, el FLIP escala parejo en X e Y y la foto deja de
// deformarse durante la apertura y el cierre.
const HERO_RATIO = 3 / 4

// Todo el stack, en el orden del data file y sin repetidos (Supabase y Redis figuran
// en dos categorías). Se deriva de `skills` para que la tira no se desactualice.
const ALL_TECH = [...new Set(skills.map((s) => s.name))]
const TECH_ROW_A = ALL_TECH.filter((_, i) => i % 2 === 0)
const TECH_ROW_B = ALL_TECH.filter((_, i) => i % 2 === 1)

/**
 * Cara frontal. La misma en el hero y en el overlay. La carta siempre llena a su
 * contenedor —el tamaño y el aspecto los fija quien la monta—, así que `fill` ya no
 * dimensiona nada: sólo distingue la escala tipográfica de la grande y la chica.
 *
 * `shine`: 'surface' barre la foto (carta chica del hero), 'edge' barre el marco (carta
 * abierta: sobre la foto a 340px la franja taparía la cara y el nombre), false no monta
 * nada.
 */
function CardFront({ fill = false, shine = false, tone = 'default' }) {
  return (
    <div
      className={`holo-border ${HERO_BORDER} relative h-full rounded-2xl p-1.5 shadow-xl shadow-black/40 lg:rounded-[2rem] lg:p-2 lg:shadow-2xl`}
    >
      {shine === 'edge' && <EdgeSweep tone={tone} />}

      <div className="relative h-full overflow-hidden rounded-xl lg:rounded-[1.5rem]">
        <img
          src="/profile.png"
          alt={profile.name}
          decoding="async"
          // Sin esto el navegador inicia su propio arrastre nativo de imagen al apretar
          // con el mouse y cancela el gesto de Motion: en desktop la carta no giraba.
          draggable={false}
          className={`h-full w-full object-cover object-top ${
            fill ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.05]'
          }`}
        />

        {/* Degradado inferior: sostiene el texto sobre cualquier zona de la foto */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
        />

        <div
          className={`absolute inset-x-0 bottom-0 ${fill ? 'p-4' : 'p-3.5 short:p-3 shorter:p-2.5 lg:p-4'}`}
        >
          <p
            className={
              fill
                ? 'text-2xl font-bold leading-tight text-white'
                : 'text-lg font-bold leading-tight text-white short:text-base shorter:text-sm lg:text-xl'
            }
          >
            {profile.name}
          </p>
          <p
            className={
              fill
                ? 'mt-1.5 font-mono text-sm leading-none text-accent'
                : 'mt-1 font-mono text-xs leading-none text-accent short:text-[11px] shorter:text-[10px] lg:mt-1.5 lg:text-xs'
            }
          >
            Full Stack Dev
          </p>
        </div>

        {shine === 'surface' && <CardSweep active tone={tone} />}
      </div>
    </div>
  )
}

/** Dorso: los datos que no entran en una foto. Se monta recién al primer giro. */
function CardBack({ lang, active, shine = false, tone = 'default' }) {
  const es = lang === 'es'

  // `yearsSince` lee `Date.now()`, así que llamarla en cada render devuelve un número
  // apenas distinto del anterior. El dorso se re-renderiza en cada giro (el `active` que
  // recibe cambia), y `AnimatedCounter` vuelve a contar desde 0 cada vez que su prop
  // `value` cambia — con los otros dos contadores no pasa porque son enteros estables
  // (cantidad de proyectos, edad) que no cambian de un giro a otro. Memoizado una sola vez
  // por apertura de la carta, el número queda fijo el resto de los giros.
  const expYears = useMemo(() => yearsSince(profile.experienceStart), [])

  return (
    <div
      className={`holo-border ${HERO_BORDER} relative h-full rounded-2xl p-1.5 shadow-xl shadow-black/40 lg:rounded-[2rem] lg:p-2 lg:shadow-2xl`}
    >
      {shine === 'edge' && <EdgeSweep tone={tone} />}

      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-navy-900 py-5 lg:rounded-[1.5rem]">
        {/* Aurora de fondo como gradiente y no como blur: esto vive dentro de un
            elemento que rota en 3D, y un blur se re-rasteriza en cada frame del giro. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,140,255,0.22),transparent_60%)]"
        />

        {/* El dorso NO repite el nombre ni el rol: quien lo está viendo acaba de girar el
            frente, donde los dos estaban. Ese lugar lo ocupa ahora la actividad de
            GitHub, que es un dato que no está en ninguna otra parte del sitio. */}
        {/* Tres datos, con el número dominando sobre su etiqueta. Lo que hace legible un
            dato numérico es el CONTRASTE de tamaño entre el número y lo que lo nombra: por
            eso el número sube a text-3xl y la etiqueta baja a 9px, en vez de agrandar las
            dos. `tabular-nums` para que los anchos no bailen mientras el contador corre. */}
        <div className="relative mx-5 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
          <div className="px-1 py-3 text-center">
            <p className="text-3xl font-bold leading-none text-white tabular-nums">
              <AnimatedCounter value={expYears} decimals={1} />
            </p>
            <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
              {es ? 'años exp.' : 'yrs exp.'}
            </p>
          </div>
          <div className="px-1 py-3 text-center">
            <p className="text-3xl font-bold leading-none text-white tabular-nums">
              <AnimatedCounter value={projects.length} />
            </p>
            <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
              {es ? 'proyectos' : 'projects'}
            </p>
          </div>
          <div className="px-1 py-3 text-center">
            <p className="text-3xl font-bold leading-none text-white tabular-nums">
              <AnimatedCounter value={ageFrom(profile.birthDate)} />
            </p>
            {/* "AÑOS" y no "EDAD": al lado de "AÑOS EXP." se lee mejor la unidad que el
                concepto. */}
            <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-500">
              {es ? 'años' : 'years'}
            </p>
          </div>
        </div>

        {/* La tira sangra hasta los bordes de la carta a propósito: refuerza la lectura
            de "cinta que pasa" y le da al difuminado lateral dónde apoyarse. */}
        <div className="relative space-y-1.5">
          <p className="px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Stack
          </p>
          {/* `fade="gradient"`: acá el difuminado no puede ser una máscara — la tira vive
              dentro de un elemento que rota en 3D y la máscara se re-evaluaría en cada
              frame del giro. El degradado se apoya en el navy-900 opaco del dorso. */}
          <TechRow items={TECH_ROW_A} active={active} speed={48} fade="gradient" />
          {/* La segunda tira es lo primero que se cae en viewports bajos: el heatmap es
              información y esto es decoración de la misma información. */}
          <div className="shorter:hidden">
            <TechRow items={TECH_ROW_B} active={active} speed={36} fade="gradient" reverse />
          </div>
        </div>

        <div className="relative px-5">
          <ContributionGraph lang={lang} />
        </div>

        <div className="relative px-5">
          {/* El CV se queda acá aunque también esté en la fila de acciones del Hero: esa
              fila está oculta en mobile, así que el dorso es su único acceso ahí. Las
              redes, en cambio, se fueron — están en el footer y en Contacto. */}
          <a
            href={es ? profile.cv.es : profile.cv.en}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors duration-300 hover:border-accent/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <Download size={16} className="shrink-0" />
            {es ? 'Descargar CV' : 'Download CV'}
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Tarjeta del Hero. En reposo flota, brilla y respira; al tocarla se abre en grande y
 * se puede girar para ver el dorso.
 *
 * Las animaciones de reposo viven en capas anidadas a propósito: si la flotación
 * (y + rotate), el hover (y + rotate) y el balanceo inicial (rotateY) compartieran
 * elemento, Motion tendría que resolver la misma propiedad desde tres fuentes.
 * Separadas, cada transform se compone sola en el compositor.
 */
export default function ProfileCard() {
  const reduce = useReducedMotion()
  const { lang } = useLanguage()
  const [wobble, setWobble] = useState(false)

  const { ref, open, hidden, geometry, openCard, closeCard, onExitComplete } = useCardOverlay({
    ratio: HERO_RATIO,
    targetOptions: { max: 340 },
  })

  const inView = useInView(ref, { amount: 0.3 })

  // Fuera del viewport los loops se congelan en su posición neutra en vez de seguir
  // corriendo: no se desmonta nada, solo se dejan de pedir frames. Con el overlay
  // abierto también se apagan — la atención está en la carta grande.
  const idle = inView && !reduce && !open

  useEffect(() => {
    if (!inView || reduce || wobbleShown) return
    wobbleShown = true
    setWobble(true)
  }, [inView, reduce])

  const handleOpen = () => openCard()

  return (
    <>
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={lang === 'es' ? 'Ver más sobre mí' : 'See more about me'}
        aria-haspopup="dialog"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpen()
          }
        }}
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
        className="aspect-[3/4] w-60 cursor-pointer rounded-2xl short:w-52 shorter:w-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950 lg:w-full lg:max-w-xs short:lg:max-w-[16rem] [perspective:900px]"
      >
        {/* Capa 1 — balanceo 3D de descubribilidad (una sola vez) */}
        <m.div
          animate={wobble ? { rotateY: [0, 6, -6, 0] } : { rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.8 }}
          className="h-full [transform-style:preserve-3d]"
        >
          {/* Capa 2 — flotación y balanceo continuos, desfasados entre sí */}
          <m.div
            animate={idle ? { y: [0, -6, 0], rotate: [0, 0.6, 0] } : { y: 0, rotate: 0 }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
            }}
            className="h-full"
          >
            {/* Capa 3 — hover de escritorio (en touch Motion no dispara whileHover) */}
            <m.div
              whileHover={reduce ? undefined : { y: -8, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="group relative h-full"
            >
              {/* Glow que respira */}
              <m.div
                aria-hidden
                animate={idle ? { opacity: [0.5, 0.8, 0.5] } : { opacity: 0.6 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute -inset-2.5 rounded-[1.75rem] bg-gradient-to-br from-accent/30 to-indigo-600/20 blur-xl lg:-inset-4 lg:rounded-[2.5rem] lg:blur-2xl"
              />

              {/* Refuerzo del glow al hover. Capa aparte porque Motion ya es dueño de la
                  opacidad de la de arriba; solo existe donde hay hover real. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 hidden rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-indigo-600/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70 lg:block"
              />

              <CardFront shine={idle ? 'surface' : false} tone={HERO_TONE} />
            </m.div>
          </m.div>
        </m.div>
      </div>

      {/* El overlay se monta en <body> y no acá. Es `position: fixed`, pero el hero lo
          envuelve en el m.div del parallax: apenas se scrollea, ese wrapper pasa a tener
          un `transform` real y se convierte en el bloque contenedor de sus descendientes
          fijos. La carta abierta dejaba de estar anclada al viewport y saltaba a la
          columna derecha de la grilla. Con el portal ya no hay ancestro transformado. */}
      {createPortal(
        <AnimatePresence onExitComplete={onExitComplete}>
          {open && geometry && (
            <FlipCard
              originRect={geometry.originRect}
              target={geometry.target}
              onClose={closeCard}
              reduce={reduce}
              label={profile.name}
              flipLabel={lang === 'es' ? 'Girar la tarjeta' : 'Flip the card'}
              hint={{
                flip: lang === 'es' ? 'Deslizá o tocá para girar' : 'Swipe or tap to flip',
                close: lang === 'es' ? 'Tocá afuera para cerrar' : 'Tap outside to close',
              }}
              front={() => (
                <CardFront fill shine={reduce ? false : 'edge'} tone={HERO_TONE} />
              )}
              back={(active) => (
                <CardBack
                  lang={lang}
                  active={active}
                  shine={reduce ? false : 'edge'}
                  tone={HERO_TONE}
                />
              )}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
