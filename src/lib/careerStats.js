/**
 * Años transcurridos desde un ancla `YYYY-MM`, con decimales.
 * Vive acá (y no dentro de un componente) porque lo consumen tanto la Trayectoria
 * como los mini-stats del dorso de la tarjeta del Hero.
 */
export function yearsSince(anchor) {
  const start = new Date(`${anchor}-01T00:00:00`)
  const diff = (Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  return Math.max(0, diff)
}
