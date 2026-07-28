import { useEffect } from 'react'

/**
 * Congela el scroll de la página mientras el componente que lo llama esté montado.
 *
 * `body { overflow: hidden }` solo no alcanza en desktop: corta el scroll del usuario,
 * pero el scroll PROGRAMÁTICO sigue permitido, y Lenis scrollea exactamente así
 * (escucha la rueda sobre window y llama a scrollTo). Sin pausarlo, la página seguía
 * corriendo por debajo de la carta abierta. En táctil no se notaba porque ahí Lenis
 * ni se instancia.
 *
 * La compensación del ancho de la barra de scroll no es cosmética: al ocultarla el
 * viewport se ensancha y el contenido se corre unos píxeles. La carta abierta arranca
 * su FLIP desde un rect medido ANTES del bloqueo, así que ese corrimiento la haría
 * empezar desalineada respecto de la carta chica.
 */
export function useScrollLock() {
  useEffect(() => {
    const { body } = document
    const lenis = window.__lenis
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    const gap = window.innerWidth - document.documentElement.clientWidth

    lenis?.stop()
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
      lenis?.start()
    }
  }, [])
}
