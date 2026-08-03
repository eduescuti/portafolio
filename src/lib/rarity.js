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
    hoverSweep: 'prism', // El Efecto del hover tiene que comenzar apenas se hace el hover sin tardar ningun tiempo
    border: 'holo-border--legendary',
    gem: 'bg-[linear-gradient(135deg,#8b5cf6,#ec4899_15%,#2dd4bf)]',
    glow: 'bg-[linear-gradient(135deg,#8b5cf65c_10%,#ec48995c_15%,#2dd4bf4d_80%)]', // Mejorar este linear gradient para que sea más predominante el turquesa
  },
  epic: {
    key: 'epic',
    label: { es: 'Épica', en: 'Epic' },
    prism: false,
    gems: 2,
    hoverSweep: 'default', // El Efecto del hover tiene que comenzar apenas se hace el hover sin tardar ningun tiempo
    border: 'holo-border--epic',
    gem: 'bg-[linear-gradient(135deg,#a78bfa,#4f8cff)]',
    glow: 'bg-[linear-gradient(135deg,#6835ffcc_10%,#545ff85d_15%)]', // Mejorar este linear gradient para que sea más predominante el violeta
  },
  rare: {
    key: 'rare',
    label: { es: 'Rara', en: 'Rare' },
    prism: false,
    gems: 1,
    hoverSweep: false,
    border: 'holo-border--rare',
    gem: 'bg-[linear-gradient(135deg,#dd8c0a_10%,#4f8cff)]',
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
