/**
 * Rarezas de las cartas, al estilo de las figuritas coleccionables.
 *
 * La rareza se comunica con CUATRO señales que se refuerzan, no con una:
 *
 *   1. El borde. `rare` es un color plano y apagado; `epic` un degradado de dos tonos;
 *      `legendary` uno de tres (violeta → magenta → turquesa). Que la más común sea la
 *      más sobria es lo que hace que las otras dos se noten.
 *   2. La cantidad de gemas en la carta CERRADA (1, 2 o 3). Es la señal que se lee de un
 *      vistazo sin abrir nada, y la que faltaba: con sólo el color del borde, un violeta
 *      y un azul a la misma opacidad son el mismo borde sobre una portada oscura.
 *   3. El barrido en hover: iridescente en `legendary`, blanco en `epic`, ninguno en
 *      `rare`.
 *   4. El halo (`glow`): la iluminación que la carta proyecta sobre el fondo, en el mismo
 *      color que su gema. Es la señal que traía la carta del Hero y que a las figuritas
 *      les faltaba — sin ella se leían como recortes planos y no como cartas iluminadas.
 *
 * `prism` NO agrega ninguna animación: recolorea el barrido que la carta ya tenía.
 *
 * `glow` va como `linear-gradient` arbitrario y no como `from-*`/`to-*` por lo mismo que
 * `gem`: es UNA clase que describe el degradado completo, así el escáner de Tailwind la
 * encuentra literal en este archivo y no depende de que quien la use recuerde sumar
 * `bg-gradient-to-br`. Las opacidades ya vienen horneadas en el color porque la capa que
 * lo monta anima su propia opacidad (0 → 1) en el hover.
 *
 * La transparencia va en hex de 8 dígitos y NO en `rgba()`: con un `rgba(...)` adentro,
 * Tailwind infiere que el valor arbitrario de `bg-[…]` es un color, no una imagen, y
 * termina descartando la clase — el halo no se generaba en el CSS y no se veía nada.
 * El formato es el mismo que ya usaba `gem`, que por eso nunca tuvo el problema.
 */
export const RARITY = {
  legendary: {
    key: 'legendary',
    label: { es: 'Legendaria', en: 'Legendary' },
    prism: true,
    gems: 3,
    hoverSweep: 'prism',
    border: 'holo-border--legendary',
    gem: 'bg-[linear-gradient(135deg,#8b5cf6,#ec4899_45%,#2dd4bf)]',
    // El violeta arrancó al 50% de opacidad (`80`) y se notaba MUCHO más fuerte que el
    // halo de `epic`/`rare` (que rondan 30-42%): la legendaria se leía como si tuviera
    // otro tipo de efecto, no la misma familia con un color distinto. Bajado a 36%
    // (`5c`) y con la turquesa un poco más atrás (30%, `4d`) para que el conjunto quede
    // parejo con las otras dos rarezas — sigue siendo la única con tres colores, que es
    // la señal que la distingue, sólo que ya no grita al lado de sus vecinas.
    glow: 'bg-[linear-gradient(135deg,#8b5cf65c,#ec48995c_45%,#2dd4bf4d)]',
  },
  epic: {
    key: 'epic',
    label: { es: 'Épica', en: 'Epic' },
    prism: false,
    gems: 2,
    hoverSweep: 'default',
    border: 'holo-border--epic',
    gem: 'bg-[linear-gradient(135deg,#a78bfa,#4f8cff)]',
    glow: 'bg-[linear-gradient(135deg,#a78bfa6b,#4f8cff61)]',
  },
  rare: {
    key: 'rare',
    label: { es: 'Rara', en: 'Rare' },
    prism: false,
    gems: 1,
    // Sin barrido: la carta común no brilla. Es la ausencia lo que le da valor al brillo
    // de las otras dos.
    hoverSweep: false,
    border: 'holo-border--rare',
    gem: 'bg-[#4f8cff]',
    // La común SÍ tiene halo, a diferencia del barrido: el halo es lo que hace que la
    // carta se despegue del fondo, y dejar seis figuritas sin despegar para castigar a
    // tres sería castigar a la grilla entera. Lo que la distingue es el color, que es el
    // mismo azul del acento del sitio — el más sobrio de los tres.
    glow: 'bg-[linear-gradient(135deg,#4f8cff61,#4f46e547)]',
  },
}

export const DEFAULT_RARITY = 'rare'

export function getRarity(key) {
  return RARITY[key] || RARITY[DEFAULT_RARITY]
}

/** Tono del barrido que le corresponde a una rareza en la carta abierta. */
export function sweepTone(key) {
  return getRarity(key).prism ? 'prism' : 'default'
}
