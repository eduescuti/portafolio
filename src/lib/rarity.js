/**
 * Rarezas de las cartas, al estilo de las figuritas coleccionables.
 *
 * La rareza se comunica con TRES señales que se refuerzan, no con una:
 *
 *   1. El borde. `rare` es un color plano y apagado; `epic` un degradado de dos tonos;
 *      `legendary` uno de tres (violeta → magenta → turquesa). Que la más común sea la
 *      más sobria es lo que hace que las otras dos se noten.
 *   2. La cantidad de gemas en la carta CERRADA (1, 2 o 3). Es la señal que se lee de un
 *      vistazo sin abrir nada, y la que faltaba: con sólo el color del borde, un violeta
 *      y un azul a la misma opacidad son el mismo borde sobre una portada oscura.
 *   3. El barrido en hover: iridescente en `legendary`, blanco en `epic`, ninguno en
 *      `rare`.
 *
 * `prism` NO agrega ninguna animación: recolorea el barrido que la carta ya tenía.
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
  },
  epic: {
    key: 'epic',
    label: { es: 'Épica', en: 'Epic' },
    prism: false,
    gems: 2,
    hoverSweep: 'default',
    border: 'holo-border--epic',
    gem: 'bg-[linear-gradient(135deg,#a78bfa,#4f8cff)]',
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
