import { useCallback, useEffect, useRef } from 'react'
import { getSectionScrollTop } from './scrollTo'

const PARAM = 'card'
const BACK_PARAM = 'back'
const INDEX_PARAM = 'i'

/**
 * Link directo a una carta del mazo. Formato `?card=<id>&i=<índice>&back=1`.
 *
 * `i` apunta a una carta puntual del mazo (0 es la portada) y `back=1` la abre ya girada,
 * que es para lo que sirve compartir un proyecto: que el otro caiga en la información y no
 * en la foto.
 *
 * Se descarta el hash (`#/proyecto/…`): la navegación del sitio ya usa hashes de ancla
 * (`#projects`, `#contact`) y mezclar los dos esquemas rompe `scrollToSection`.
 */
export function buildCardUrl(id, { back = true, index = 0 } = {}) {
  const url = new URL(window.location.href)
  url.hash = ''
  url.search = ''
  url.searchParams.set(PARAM, id)
  if (index > 0) url.searchParams.set(INDEX_PARAM, String(index))
  if (back) url.searchParams.set(BACK_PARAM, '1')
  return url.toString()
}

function cleanUrl() {
  const url = new URL(window.location.href)
  url.searchParams.delete(PARAM)
  url.searchParams.delete(BACK_PARAM)
  url.searchParams.delete(INDEX_PARAM)
  window.history.replaceState(null, '', url)
}

/** Deja la sección de Proyectos en pantalla sin animar: el destino es medible enseguida. */
function jumpToProjects() {
  const top = getSectionScrollTop('projects')
  if (top == null) return
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(top, { immediate: true })
  else window.scrollTo({ top, behavior: 'auto' })
}

/**
 * Sincroniza la figurita abierta con la URL y el historial.
 *
 * - Abrir empuja una entrada (`pushState`), así el botón Atrás cierra la carta.
 * - Cerrar a mano reemplaza la entrada limpiando el query: no acumula basura en el
 *   historial y Atrás sigue llevando a donde el usuario estaba antes de abrir.
 * - Cerrar POR el botón Atrás no toca el historial —ya se movió solo—. Esa es la razón
 *   de `fromPopRef`: sin la bandera, el cierre disparado por `popstate` volvería a
 *   escribir en el historial y se pelearía con la navegación del navegador.
 *
 * La cadena popstate → onPop → cerrar la carta → `closeCard()` es SÍNCRONA a propósito,
 * para que la bandera se consuma en el mismo tick en que se puso.
 */
export function useCardLink({ projects, onDeepLink, onPop }) {
  const fromPopRef = useRef(false)
  const onPopRef = useRef(onPop)
  const onDeepLinkRef = useRef(onDeepLink)
  onPopRef.current = onPop
  onDeepLinkRef.current = onDeepLink

  const pushCard = useCallback((id) => {
    const url = new URL(window.location.href)
    url.searchParams.set(PARAM, id)
    url.searchParams.delete(BACK_PARAM)
    url.searchParams.delete(INDEX_PARAM)
    window.history.pushState({ card: id }, '', url)
  }, [])

  const closeCardUrl = useCallback(() => {
    if (fromPopRef.current) {
      fromPopRef.current = false
      return
    }
    cleanUrl()
  }, [])

  useEffect(() => {
    const onPopState = () => {
      fromPopRef.current = true
      onPopRef.current?.()
      fromPopRef.current = false
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Apertura por link directo, una sola vez por carga.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get(PARAM)
    if (!id) return

    const project = projects.find((p) => p.id === id)
    // Un id inválido no rompe nada: se limpia el query y la página queda normal.
    if (!project) {
      cleanUrl()
      return
    }

    const back = params.get(BACK_PARAM) === '1'
    // Un índice inválido no rompe nada: el mazo lo acota a su cantidad de cartas.
    const index = Math.max(0, Number.parseInt(params.get(INDEX_PARAM) ?? '0', 10) || 0)

    // Dos frames antes de avisar: uno para que el salto de scroll se aplique y otro para
    // que el layout de la grilla quede asentado. Recién ahí el rect de la figurita sirve
    // como origen del FLIP.
    jumpToProjects()
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => onDeepLinkRef.current?.({ id, back, index }))
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [projects])

  return { pushCard, closeCardUrl }
}
