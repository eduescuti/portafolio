import { useEffect } from 'react'
import Lenis from 'lenis'
import { scrollToSection } from '../lib/scrollTo'

/**
 * Smooth-scroll inercial global con Lenis (decisión #H).
 * - Se desactiva si el usuario prefiere movimiento reducido.
 * - Intercepta los clicks en anclas (#id) para aterrizar con el offset correcto.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // En táctil/mobile el scroll nativo ya es fluido y acelerado; Lenis (JS + RAF)
    // pelea con el scroll táctil y es la causa principal del "scroll trabado" en celular.
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (prefersReduced || isTouch) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    window.__lenis = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  // La intercepción de anclas va fuera del efecto de Lenis a propósito: antes
  // vivía dentro y se salteaba en táctil/reduced-motion, así que ahí los links
  // del Hero (#projects, #contact) caían al scroll nativo y aterrizaban con el
  // padding entero de la sección como hueco. scrollToSection() ya elige por
  // dentro entre Lenis y el scroll nativo.
  useEffect(() => {
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const id = href.slice(1)
      if (!document.getElementById(id)) return
      e.preventDefault()
      scrollToSection(id)
    }

    document.addEventListener('click', onAnchorClick)
    return () => document.removeEventListener('click', onAnchorClick)
  }, [])

  return null
}
