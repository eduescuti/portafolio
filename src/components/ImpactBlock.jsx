import AnimatedCounter from './AnimatedCounter'

/**
 * Lo que el proyecto genera, en el dorso de la portada del mazo.
 *
 * Reemplaza a la lista con viñetas de "Destacado", que era el único bloque estático de una
 * carta que por lo demás respira, brilla y gira. El criterio del contenido es que el dato
 * diga CUÁNTO GENERA el proyecto y no cuántas piezas tiene: "20 gráficos" es inventario y
 * no le dice nada a nadie, "+240% pacientes nuevos" sí.
 *
 * Dos variantes, porque no todos los proyectos están en producción:
 *
 *   `metrics` — hay resultados de negocio reales. Marcador de tres números con contador,
 *   calcado del dorso de la carta del Hero (ver `ProfileCard`), que es el gesto que mejor
 *   funciona del sitio.
 *
 *   `value` — el proyecto no está en uso y NO hay métricas. En vez de inventarlas o de
 *   maquillar inventario como si fuera impacto, van tres frases de qué resuelve. Ocupan el
 *   mismo lugar y comparten el `border-y` del marcador para que las dos variantes se lean
 *   como el mismo bloque y no como dos diseños distintos.
 *
 * La etiqueta de sección SÍ cambia entre variantes ("Impacto" vs "Qué resuelve"): titular
 * "Impacto" sobre un proyecto que nadie usa sería exactamente el tipo de afirmación que
 * este bloque existe para evitar.
 *
 * No recibe `active`. Los contadores se disparan solos: `CardFlipper` monta el dorso recién
 * al primer giro, así que el `useInView` interno de `AnimatedCounter` se cumple justo
 * cuando la carta se da vuelta. Es el mismo mecanismo del que ya depende el Hero.
 *
 * `compact` es la versión para el dorso de la portada en mobile, donde hay ~190px de alto
 * para TODA la carta y este bloque tiene que entrar sin empujar al pie fuera de cuadro.
 * No es sólo "lo mismo más chico": recorta lo accesorio hasta dejar el dato.
 *
 *   · La cola de highlights se cae entera. Es la línea que acompaña, y acá no hay renglón
 *     que gastar en acompañamiento.
 *   · La nota NO se cae: se cuelga del rótulo en el mismo renglón, y usa `noteShort` si el
 *     proyecto la trae. Es la única línea del bloque que no se puede sacrificar — sin ella
 *     "+240% pacientes nuevos" se lee como si lo hubiera generado el código de esta carta,
 *     que es justamente lo que la nota existe para desmentir. Un número inflado sin su
 *     alcance es peor que no mostrar el número.
 *
 * Todo lo de `compact` lleva `leading` explícito. No es manía: la altura de este bloque es
 * un presupuesto de píxeles contra un alto de carta fijo (ver `CoverBack`), y dejar el
 * interlineado en el 1.5 que hereda de Preflight metía 4-5px por renglón que no estaban en
 * la cuenta. Si alguien saca un `leading-none` de acá, el pie de la carta se va de cuadro.
 */
export default function ImpactBlock({
  impact,
  highlights = [],
  lang,
  compact = false,
  className = '',
}) {
  if (!impact) return null

  const es = lang === 'es'
  const t = (pair) => (pair ? (es ? pair.es : pair.en) : '')
  // Los separadores de miles y de decimales cambian con el idioma: 7000 es "7.000" en
  // español y "7,000" en inglés. Sin esto, la versión en inglés mostraría un 4,8 que un
  // angloparlante lee como cuatro mil ochocientos.
  const locale = es ? 'es-AR' : 'en-US'

  const metrics = impact.kind === 'metrics'
  const label = metrics ? (es ? 'Impacto' : 'Impact') : es ? 'Qué resuelve' : 'What it solves'

  // Los tres primeros y no los ocho: acá los highlights ya no son el contenido principal
  // sino la línea que lo acompaña. El orden en `portfolio.js` está puesto a propósito para
  // que los tres que sobreviven sean los más específicos de cada proyecto.
  const tail = compact ? [] : highlights.slice(0, 3)
  const note = compact ? t(impact.noteShort ?? impact.note) : t(impact.note)

  return (
    <div className={`min-w-0 ${className}`}>
      {compact ? (
        // Rótulo y nota en un solo renglón. Ver la nota del encabezado: en mobile no hay
        // dos renglones para gastar, y de los dos datos el que no se puede perder es el
        // alcance. `noteShort` está escrita para entrar entera acá; el `truncate` es la red
        // por si alguien agrega un proyecto sin ella.
        //
        // `leading-tight` y no `leading-none`: `truncate` trae `overflow: hidden`, y con
        // interlineado 1 la caja mide exactamente el em — las colas de la "p" y la "j" de la
        // nota se cortan al ras. Los 2px de más están contemplados en el presupuesto.
        <p className="truncate text-[9px] leading-tight text-slate-500">
          <span className="font-mono uppercase tracking-[0.18em]">{label}</span>
          {note && <span className="ml-0.5">· {note}</span>}
        </p>
      ) : (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      )}

      {metrics ? (
        // El contraste de tamaño entre el número y su etiqueta es lo que hace legible un
        // dato numérico: por eso el número sube a text-3xl y la etiqueta baja a 9px, en vez
        // de agrandar las dos. `tabular-nums` para que los anchos no bailen mientras corre
        // el contador. Mismo razonamiento que en el dorso del Hero.
        //
        // En `compact` el número baja a text-xl y la etiqueta a 8px: lo que se conserva es
        // la RELACIÓN entre los dos, que es lo que hace que el marcador se lea como
        // marcador. Bajar los dos a un tamaño parejo lo convertiría en una tabla.
        <div
          className={`grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 ${
            compact ? 'mt-1' : 'mt-1.5'
          }`}
        >
          {impact.items.map((item) => (
            <div
              key={t(item.label)}
              className={`text-center ${compact ? 'px-0.5 py-1' : 'px-1 py-2'}`}
            >
              <p
                className={`font-bold leading-none text-white tabular-nums ${
                  compact ? 'text-xl' : 'text-3xl'
                }`}
              >
                {/* Prefijo y sufijo van afuera del contador: éste sólo tiene que formatear
                    el número, no cargar con la decoración. */}
                {item.prefix}
                <AnimatedCounter value={item.value} decimals={item.decimals ?? 0} locale={locale} />
                {item.suffix}
              </p>
              {/* El tracking baja en compacto porque las etiquetas están calibradas para
                  entrar en un renglón dentro de una columna de ~95px. `truncate` es la red:
                  sin ella, una etiqueta que no entra envuelve a dos líneas, el bloque crece
                  más de lo que el dorso presupuestó (ver `CoverBack`) y esos px de más se
                  los come la descripción de arriba. Mismo motivo que el `truncate` de la
                  lista de "Qué resuelve", unas líneas más abajo. */}
              <p
                className={`font-mono uppercase text-slate-500 ${
                  compact
                    ? 'mt-0.5 truncate text-[8px] leading-none tracking-[0.06em]'
                    : 'mt-1.5 text-[9px] tracking-[0.15em]'
                }`}
              >
                {t(item.label)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`border-y border-white/10 ${
            compact ? 'mt-1 py-0.5' : 'mt-1.5 space-y-0.5 py-2'
          }`}
        >
          {impact.items.map((item) => (
            <p
              key={t(item)}
              // `truncate` en compacto no es estético: el presupuesto de alto del dorso
              // (ver `CoverBack`) asume UNA línea por ítem. Sin esto, un ítem largo envuelve
              // a dos líneas en pantallas angostas, el bloque crece más de lo calculado, y
              // como es `shrink-0` esos px de más se los come la descripción de arriba —que
              // sí puede encogerse— cortándola a mitad de palabra. Mejor truncar acá, donde
              // se nota menos y no arrastra a otro bloque con él.
              className={`text-slate-300 ${
                compact ? 'truncate text-[10px] leading-[1.2]' : 'text-[13px] leading-snug'
              }`}
            >
              {t(item)}
            </p>
          ))}
        </div>
      )}

      {/* La línea de alcance. Sin esto, "+240% pacientes nuevos" se lee como si lo hubiera
          generado el código de esta carta, cuando son resultados de los clientes de la
          agencia y salen de todo el servicio. En compacto ya viajó arriba, pegada al
          rótulo. */}
      {!compact && note && (
        <p className="mt-2 text-[10px] leading-snug text-slate-500">{note}</p>
      )}

      {/* Texto corrido y no lista: como lista volvían a leerse igual que los bullets que
          este bloque vino a reemplazar. */}
      {tail.length > 0 && (
        <p className="mt-2 text-[12px] leading-snug text-slate-400">{tail.join(' · ')}</p>
      )}
    </div>
  )
}
