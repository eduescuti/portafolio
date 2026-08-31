import { useEffect, useState } from 'react'

/**
 * El aviso que señala hacia arriba cuando la barra está escondida.
 *
 * El problema que resuelve: el navbar se auto-oculta apenas el mouse baja (ver Navbar),
 * y con la barra fuera de pantalla el botón de idioma deja de existir para el visitante
 * — no hay nada que sugiera que el sitio está en dos idiomas. Este aviso ocupa ese hueco:
 * aparece justo cuando la barra NO está, y dice que arriba hay algo y hacia dónde ir.
 *
 * Por eso la condición es la inversa de la del header, y por eso vive FUERA de él: el
 * header se va de pantalla con `-translate-y-full`, así que un aviso montado adentro se
 * iría con él exactamente cuando tiene que verse.
 *
 * Se alinea con el mismo `max-w-6xl` + padding que usa la barra, no con el borde de la
 * ventana: así la flecha cae bajo el botón real y no unos píxeles al costado en pantallas
 * anchas, donde el contenedor está centrado y el botón no toca el borde.
 *
 * Vive sólo en la primera pantalla del Hero. Es `fixed`, así que sin la condición de
 * scroll se quedaría clavado arriba y bajaría con el visitante, pasándole por encima a
 * la foto y después al arranque de Proyectos: un cartel que persigue. Apenas la página
 * se mueve, entonces, se retira. Igual el aviso no tiene nada que hacer más abajo — el
 * momento en que enterarse de que hay otro idioma sirve para algo es la portada, cuando
 * el visitante todavía está decidiendo cómo recorrer el sitio.
 *
 * No se descarta nunca, tampoco después de usar el botón de idioma: no es un cartel de
 * "ya entendiste, listo", es la única señal visible de que el sitio está en dos idiomas
 * mientras la barra no está. Si desapareciera al primer clic, quien volviera al idioma
 * anterior se quedaría sin nada que se lo indique.
 *
 * Sólo desktop. En táctil no hay hover —la barra va y viene con la dirección del scroll—
 * y un cartel que aparece cada vez que alguien baja el dedo sería un estorbo, no una guía.
 */

// Mismo umbral con el que el navbar decide que ya no estás "arriba de todo", para que el
// aviso y el fondo de la barra no cambien de opinión en momentos distintos.
const UMBRAL_ARRIBA = 40

export default function LanguageHint({ navbarHidden }) {
  const [arriba, setArriba] = useState(true)

  // Un listener de scroll y no un IntersectionObserver: lo que hay que saber no es si el
  // Hero está en pantalla —lo está durante toda su altura— sino si la página se movió de
  // arriba de todo, y eso el observer sólo lo avisa al cruzar un umbral, no de continuo.
  // Se lee al montar además de al scrollear, porque el navegador restaura la posición
  // anterior en las recargas y ahí no dispara ningún evento.
  useEffect(() => {
    const onScroll = () => setArriba(window.scrollY <= UMBRAL_ARRIBA)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 hidden transition-opacity duration-500 ease-out md:block ${
        navbarHidden && arriba ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl justify-end px-6 pt-16 md:px-10">
        <div className="flex flex-col items-end gap-0.5">
          {/* El margen derecho corre la flecha hasta el centro del botón de idioma. Sin él
              quedaría alineada con el texto, que es bastante más ancho que el botón, y la
              punta terminaría señalando aire a la derecha. El `pt` del contenedor la baja
              lo justo para que la punta caiga sobre el botón y no lo pase de largo. */}
          <svg
            width="58"
            height="66"
            viewBox="0 0 58 66"
            fill="none"
            className="mr-5 block"
            style={{ filter: 'drop-shadow(0 1px 10px rgba(10,22,40,.9))' }}
          >
            <path
              pathLength="1"
              d="M14 64 C 12 42, 22 20, 46 7"
              stroke="#fff"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hint-stroke"
            />
            <line
              pathLength="1" x1="46" y1="7" x2="32" y2="9"
              stroke="#fff" strokeWidth="2.1" strokeLinecap="round"
              className="hint-stroke hint-stroke--tip"
            />
            <line
              pathLength="1" x1="46" y1="7" x2="45" y2="22"
              stroke="#fff" strokeWidth="2.1" strokeLinecap="round"
              className="hint-stroke hint-stroke--tip"
            />
          </svg>

          {/* Alto fijo y las dos frases superpuestas: si se apilaran en el flujo, el
              bloque cambiaría de alto en cada relevo y la flecha temblaría. */}
          <div className="relative h-[46px] w-[260px]">
            {['English Version', 'Versión en Español'].map((frase, i) => (
              <span
                key={frase}
                className={`absolute inset-x-0 top-0 text-right font-hand text-[34px] font-semibold leading-[46px] text-white [text-shadow:0_1px_14px_rgba(10,22,40,.85)] hint-phrase ${
                  i === 1 ? 'hint-phrase--b' : ''
                }`}
              >
                {frase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
