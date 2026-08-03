/**
 * Geometría destino de una carta abierta. La calcula JS y JS también la escribe como
 * left/top/width/height inline: si el tamaño lo pusiera CSS y la posición la calculara
 * acá, cualquier cambio en una clase desincronizaría el FLIP sin aviso.
 *
 * `ratio` es ancho/alto. La carta del Hero es 3/4 = 0,75 (vertical) y las figuritas de
 * proyecto 3/2 (horizontal), en todos los tamaños de pantalla.
 *
 * `peek` es cuánto tiene que sobrar a cada lado para que asomen las cartas vecinas del
 * mazo. Sin él, la carta activa se come todo el ancho útil y el mazo deja de leerse como
 * mazo. Sólo lo usa el carrusel de desktop: en mobile las cartas se apilan hacia abajo y
 * el asome lo da el scroll, no el ancho.
 *
 * `gutter` es el aire total que se le deja al viewport a los costados. Es configurable
 * porque la figurita cerrada de proyecto ocupa todo el ancho de la columna (o sea, el
 * ancho de pantalla menos el padding de la sección): si la carta abierta reservara más
 * aire que ese padding, abrirla la haría MÁS CHICA que la figurita que se tocó.
 *
 * INVARIANTE: este ratio y el `aspect-[…]` de la carta chica tienen que ser el mismo
 * número. Con los dos rects proporcionales el FLIP escala parejo en X e Y; si difieren,
 * la imagen se estira durante la apertura y el cierre.
 */
export function computeTarget(ratio, { max = 340, reserve = 108, peek = 0, gutter = 40 } = {}) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const width = Math.max(200, Math.min(max, vw - gutter - peek * 2, (vh - reserve) * ratio))
  const height = width / ratio
  return {
    width,
    height,
    left: (vw - width) / 2,
    top: (vh - height) / 2,
  }
}

/**
 * Distancia horizontal entre el centro de la carta activa y el de una vecina.
 *
 * Sale de despejar cuánto tiene que correrse la vecina para que sobresalga exactamente
 * `peek` píxeles por el costado de la activa: la vecina mide `width * scale`, así que su
 * borde externo queda en `d + width * scale / 2` y el de la activa en `width / 2`.
 */
export function neighborOffset(width, peek, scale = 0.82) {
  return peek + width * (0.5 - scale / 2)
}
