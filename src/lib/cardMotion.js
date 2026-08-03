/**
 * Constantes de tiempo y transiciones de las cartas que se abren en overlay
 * (ProfileCard del Hero y las figuritas de Proyectos).
 *
 * Viven acá y no en cada componente porque el cierre es una coreografía a tres voces
 * —backdrop, carta grande y carta chica— y las tres tienen que compartir el mismo reloj.
 */

export const FLIP_SPRING = { type: 'spring', stiffness: 220, damping: 26 }

export const EXIT_MS = 320

// Solape entre la carta grande y la chica en el tramo final del cierre. Sin él, en el
// frame del relevo la tipografía pega un salto: el texto de la carta grande escalado a
// 0,37 mide ~9px, pero la carta chica lo dibuja a 12px de verdad. Solo aplica al cierre
// —al abrir, el panel ya se está expandiendo y solaparlos mostraría dos tamaños a la vez.
export const CROSSFADE_MS = 120

export const EXIT_TWEEN = { type: 'tween', duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }

// Spring de la apertura. Más rígido que el del giro: la carta tiene que llegar rápido y
// asentarse, no rebotar.
export const OPEN_SPRING = { type: 'spring', stiffness: 260, damping: 30 }
