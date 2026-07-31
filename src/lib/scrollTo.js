/**
 * Único lugar que sabe DÓNDE aterrizar cuando se navega por ancla.
 *
 * El problema que resuelve: apuntar al borde superior de la <section> dejaba un
 * hueco enorme arriba, porque todo el aire vertical vive en el padding de
 * .section-container (py-14 → lg:py-32). Sumado al offset del navbar fijo daban
 * ~200px de vacío antes del título. Acá se descuenta ese padding y se deja solo
 * --nav-gap de aire bajo la barra.
 *
 * Antes la altura del navbar estaba hardcodeada en cuatro lugares con valores
 * distintos (72 en JS, 80 en CSS). Ahora sale de --nav-h en index.css.
 */

const CORRECTION_THRESHOLD = 4

function readPx(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name)
  const value = Number.parseFloat(raw)
  return Number.isFinite(value) ? value : fallback
}

export function getNavHeight() {
  return readPx('--nav-h', 72)
}

export function getNavGap() {
  return readPx('--nav-gap', 32)
}

function maxScrollTop() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
}

/**
 * Timeline y Contact usan .cv-auto (content-visibility: auto): mientras están
 * lejos del viewport el navegador NO las layoutea y usa el alto estimado de
 * contain-intrinsic-size. Medir en ese estado da posiciones falsas —y encima la
 * de Contact depende del alto de Timeline, que está arriba—. Forzamos el render
 * de todas para medir y lo devolvemos atrás enseguida: el resultado es la
 * posición del documento ya renderizado, que es justo donde vamos a terminar.
 */
function measureRendered(measure) {
  const skipped = document.querySelectorAll('.cv-auto')
  skipped.forEach((el) => {
    el.style.contentVisibility = 'visible'
  })
  try {
    return measure()
  } finally {
    skipped.forEach((el) => {
      el.style.contentVisibility = ''
    })
  }
}

/**
 * Posición de scroll absoluta para dejar el contenido de una sección justo
 * debajo del navbar; si la sección entra entera en la pantalla, la centra.
 *
 * Mide el .section-container y le suma su padding computado en vez de medir su
 * primer hijo: los hijos van envueltos en <Reveal>, que aplica translateY
 * durante la animación de entrada, así que su rect miente. El contenedor no
 * tiene transform.
 */
export function getSectionScrollTop(id) {
  const section = document.getElementById(id)
  if (!section) return null

  // El Hero ocupa el viewport completo y ya trae su propio pt-20: su aterrizaje
  // natural es el tope de la página.
  if (id === 'hero') return 0

  const container = section.querySelector('.section-container') ?? section

  // El clamp va adentro a propósito: con las secciones sin renderizar el
  // documento "mide" menos y el máximo de scroll recortaría el destino.
  return measureRendered(() => {
    const rect = container.getBoundingClientRect()
    const styles = getComputedStyle(container)
    const paddingTop = Number.parseFloat(styles.paddingTop) || 0
    const paddingBottom = Number.parseFloat(styles.paddingBottom) || 0

    const contentTop = rect.top + window.scrollY + paddingTop
    const contentHeight = rect.height - paddingTop - paddingBottom
    const gap = getNavGap()
    const leftover = window.innerHeight - contentHeight

    // Contacto entra entero en la pantalla: pegarlo debajo de la barra le deja
    // todo el aire arriba y nada abajo. Proyectos y Trayectoria son más altas
    // que el viewport, así que ahí no hay nada que centrar.
    const top =
      leftover >= gap * 2 ? contentTop - leftover / 2 : contentTop - getNavHeight() - gap

    return Math.min(Math.max(0, top), maxScrollTop())
  })
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollRaw(top, instant) {
  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(top, instant ? { immediate: true } : { duration: 0.5 })
  } else {
    window.scrollTo({ top, behavior: instant ? 'auto' : 'smooth' })
  }
}

/**
 * Segunda pasada al terminar el scroll: Timeline y Contact usan .cv-auto
 * (content-visibility) y mientras están fuera de pantalla el navegador estima su
 * alto, así que la medición inicial puede quedar corrida. Se salta si el usuario
 * tomó el control del scroll en el medio, para no arrancarle la página.
 */
function correctAfterSettle(id, wasInterrupted) {
  if (wasInterrupted()) return
  const target = getSectionScrollTop(id)
  if (target == null) return
  if (Math.abs(target - window.scrollY) <= CORRECTION_THRESHOLD) return
  scrollRaw(target, prefersReducedMotion())
}

export function scrollToSection(id) {
  const target = getSectionScrollTop(id)
  if (target == null) return

  let interrupted = false
  const wasInterrupted = () => interrupted
  const interrupt = () => {
    interrupted = true
  }

  const stopWatching = () => {
    window.removeEventListener('wheel', interrupt)
    window.removeEventListener('touchstart', interrupt)
    window.removeEventListener('keydown', interrupt)
  }

  window.addEventListener('wheel', interrupt, { passive: true, once: true })
  window.addEventListener('touchstart', interrupt, { passive: true, once: true })
  window.addEventListener('keydown', interrupt, { once: true })

  const instant = prefersReducedMotion()
  const lenis = window.__lenis

  if (lenis) {
    lenis.scrollTo(target, {
      immediate: instant,
      onComplete: () => {
        stopWatching()
        correctAfterSettle(id, wasInterrupted)
      },
    })
    // Red de seguridad: si el usuario corta la animación, onComplete no dispara
    // y los listeners quedarían colgados.
    window.setTimeout(stopWatching, 2000)
    return
  }

  window.scrollTo({ top: target, behavior: instant ? 'auto' : 'smooth' })

  let done = false
  const finish = () => {
    if (done) return
    done = true
    window.removeEventListener('scrollend', finish)
    window.clearTimeout(timer)
    stopWatching()
    correctAfterSettle(id, wasInterrupted)
  }

  const timer = window.setTimeout(finish, instant ? 60 : 900)
  window.addEventListener('scrollend', finish)
}
