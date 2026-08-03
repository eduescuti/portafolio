/**
 * Un proyecto no es una carta: es un mazo.
 *
 * Índice 0 es la portada —la imagen de `/public/projects/`, con toda la información del
 * proyecto en el dorso— y del 1 en adelante va una carta por cada captura, cada una con
 * su propio texto describiendo esa pantalla puntual.
 */

/**
 * Cuánto asoma cada carta vecina por el costado de la activa, en el carrusel de desktop.
 * Lo comparten `computeTarget` (que le resta este margen al ancho de la carta activa) y
 * `DesktopDeck` (que ubica las vecinas y las flechas): si se desincronizan, las vecinas se
 * van de pantalla o las flechas se montan encima de la carta.
 */
export const DECK_PEEK = 96

/**
 * Acepta el formato viejo (un string suelto con la ruta) además del nuevo. Una preview
 * sin texto no rompe nada: su carta muestra el pie con el nombre del proyecto y listo.
 */
export function normalizePreview(p) {
  return typeof p === 'string' ? { src: p, title: null, description: null } : p
}

export function buildDeck(project) {
  const cover = { key: `${project.id}-cover`, kind: 'cover', src: project.imageBackground }
  const shots = (project.previews ?? []).map(normalizePreview).map((p, i) => ({
    key: `${project.id}-shot-${i}`,
    kind: 'shot',
    index: i,
    ...p,
  }))
  return [cover, ...shots]
}
