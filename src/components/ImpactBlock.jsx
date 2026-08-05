import AnimatedCounter from './AnimatedCounter'

/**
 * El marcador de números del dorso, calcado del dorso de la carta del Hero (ver
 * `ProfileCard`): tres números grandes dentro de un `border-y`, con su etiqueta chiquita
 * debajo. Es lo PRIMERO que se ve al girar cualquier carta del mazo — portada o captura—,
 * y por eso ya no lleva rótulo de sección arriba: en el Hero tampoco lo lleva, y el rótulo
 * era además lo que empujaba al título y al epígrafe a competir con los números.
 *
 * Sin rótulo se resuelve de paso un problema de fondo. Antes había dos variantes porque
 * titular "Impacto" sobre inventario ("20 gráficos") habría sido exactamente el tipo de
 * afirmación inflada que este bloque existe para evitar. Ahora el bloque no titula NADA:
 * cada número dice lo que es en su propia etiqueta, así que un dato de escala del proyecto
 * y un resultado de negocio pueden convivir sin que el marco prometa de más.
 *
 * Lo que sí sobrevive de aquella preocupación es `note`, y es la línea más importante del
 * componente: sin ella "+240% pacientes nuevos" se lee como si lo hubiera generado el
 * código de esta carta, cuando son resultados de las clínicas y salen de todo el servicio
 * de la agencia. Las cartas cuyos números son de escala propia (rutas, migraciones,
 * gráficos) no llevan nota justamente porque no hay atribución que aclarar.
 *
 * Variantes:
 *
 *   `metrics` — tres números con contador.
 *   `pending` — el proyecto no está terminado y no hay ningún número real que mostrar.
 *   Dibuja el mismo marcador en estado de carga (barras pulsando) en vez de inventar
 *   cifras o dejar el hueco vacío.
 *
 * No recibe `active`. Los contadores se disparan solos: `CardFlipper` monta el dorso recién
 * al primer giro, así que el `useInView` interno de `AnimatedCounter` se cumple justo
 * cuando la carta se da vuelta. Es el mismo mecanismo del que ya depende el Hero.
 *
 * `instant` y `onCounted` viajan derecho a `AnimatedCounter`: ver ahí por qué existen
 * (persistencia de los números al navegar el mazo, ver `ProjectDeck`).
 *
 * `compact` es la versión de mobile, donde hay ~190px de alto para TODA la carta y este
 * bloque tiene que entrar sin empujar al pie fuera de cuadro. No es "lo mismo más chico":
 * lo que se conserva es la RELACIÓN de tamaño entre el número y su etiqueta, que es lo que
 * hace que un marcador se lea como marcador. Bajar los dos a un tamaño parejo lo
 * convertiría en una tabla.
 *
 * Todo lo de `compact` lleva `leading` explícito. No es manía: la altura de este bloque es
 * un presupuesto de píxeles contra un alto de carta fijo (ver `CardBack`), y dejar el
 * interlineado en el 1.5 que hereda de Preflight metía 4-5px por renglón que no estaban en
 * la cuenta. Si alguien saca un `leading-none` de acá, el pie de la carta se va de cuadro.
 */
export default function ImpactBlock({
  impact,
  lang,
  compact = false,
  className = '',
  instant = false,
  onCounted,
}) {
  if (!impact) return null

  const es = lang === 'es'
  const t = (pair) => (pair ? (es ? pair.es : pair.en) : '')
  // Los separadores de miles y de decimales cambian con el idioma: 7000 es "7.000" en
  // español y "7,000" en inglés. Sin esto, la versión en inglés mostraría un 4,8 que un
  // angloparlante lee como cuatro mil ochocientos.
  const locale = es ? 'es-AR' : 'en-US'

  const pending = impact.kind === 'pending'
  const note = pending
    ? es
      ? 'Todavía sin números que mostrar'
      : 'No numbers to show yet'
    : compact
      ? t(impact.noteShort ?? impact.note)
      : t(impact.note)

  const cell = compact ? 'px-0.5 py-1.5' : 'px-1 py-2.5'

  return (
    <div className={`min-w-0 ${className}`}>
      <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
        {pending
          ? // Esqueleto de carga: tres celdas con el hueco del número y el de la etiqueta
            // pulsando, desfasadas entre sí para que se lea como "esto todavía se está
            // escribiendo" y no como tres barras decorativas. Ocupa exactamente el mismo
            // lugar que el marcador real, así que cuando el proyecto tenga cifras no se
            // mueve nada de la carta.
            [0, 1, 2].map((i) => (
              <div key={i} className={cell}>
                <div
                  className={`mx-auto animate-pulse rounded bg-white/10 ${
                    compact ? 'h-4 w-3/5' : 'h-8 w-3/5'
                  }`}
                  style={{ animationDelay: `${i * 180}ms` }}
                />
                <div
                  className={`mx-auto animate-pulse rounded bg-white/[0.06] ${
                    compact ? 'mt-1 h-1 w-4/5' : 'mt-2.5 h-1.5 w-4/5'
                  }`}
                  style={{ animationDelay: `${i * 180 + 90}ms` }}
                />
              </div>
            ))
          : impact.items.map((item) => (
              <div key={t(item.label)} className={`text-center ${cell}`}>
                {/* El contraste de tamaño entre el número y su etiqueta es lo que hace
                    legible un dato numérico: por eso el número va a text-5xl y la etiqueta
                    se queda en 10px, en vez de agrandar las dos. `tabular-nums` para que
                    los anchos no bailen mientras corre el contador. */}
                <p
                  className={`font-bold leading-none text-white tabular-nums ${
                    compact ? 'text-2xl' : 'text-5xl'
                  }`}
                >
                  {/* Prefijo y sufijo van afuera del contador: éste sólo tiene que
                      formatear el número, no cargar con la decoración. */}
                  {item.prefix}
                  <AnimatedCounter
                    value={item.value}
                    decimals={item.decimals ?? 0}
                    locale={locale}
                    instant={instant}
                    onComplete={onCounted}
                  />
                  {item.suffix}
                </p>
                {/* El tracking baja en compacto porque las etiquetas están calibradas para
                    entrar en un renglón dentro de una columna de ~95px. `truncate` es la
                    red: sin ella, una etiqueta que no entra envuelve a dos líneas, el
                    bloque crece más de lo que el dorso presupuestó (ver `CardBack`) y esos
                    px de más se los come la descripción de abajo. */}
                <p
                  className={`font-mono uppercase text-slate-500 ${
                    compact
                      ? 'mt-1 truncate text-[8px] leading-none tracking-[0.06em]'
                      : 'mt-2 text-[10px] leading-tight tracking-[0.14em]'
                  }`}
                >
                  {t(item.label)}
                </p>
              </div>
            ))}
      </div>

      {/* La línea de alcance. Ver el encabezado: es lo único que impide que un número
          prestado se lea como propio, así que no se cae ni en mobile — ahí usa `noteShort`,
          que está escrita para entrar en un renglón, y `truncate` es la red por si algún
          proyecto nuevo llega sin ella. */}
      {note && (
        <p
          className={`text-slate-500 ${
            compact ? 'mt-1 truncate text-[9px] leading-tight' : 'mt-2 text-[10px] leading-snug'
          }`}
        >
          {note}
        </p>
      )}
    </div>
  )
}
