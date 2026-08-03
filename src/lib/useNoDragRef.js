import { useCallback } from 'react'

/**
 * Ref callback que corta el `pointerdown` ANTES de que llegue a la carta que gira.
 *
 * Se pone en cualquier control interactivo que viva DENTRO de una `FlipCard`: flechas de
 * la galería, "Ir al proyecto", "Copiar link". Sin esto, apretar uno de esos controles y
 * mover el dedo arrastra la carta además de accionar el control.
 *
 * Tiene que ser un listener NATIVO sobre el propio control y no un `onPointerDown` de
 * React: Motion escucha el drag con un listener nativo puesto sobre la carta, mientras que
 * React escucha en la raíz del árbol. Un `stopPropagation` de React correría cuando el
 * evento nativo ya pasó por la carta — demasiado tarde para evitar que el gesto arranque.
 *
 * No hace falta remover el listener: React llama al callback con `null` cuando el nodo se
 * desmonta, y ese nodo se va del DOM con su listener encima.
 */
export function useNoDragRef() {
  return useCallback((node) => {
    if (node) node.addEventListener('pointerdown', (e) => e.stopPropagation())
  }, [])
}
