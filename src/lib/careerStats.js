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

/**
 * Edad en años enteros a partir de una fecha `YYYY-MM-DD`.
 *
 * Se calcula y no se escribe a mano: un `age: 26` en el data file queda viejo el día del
 * cumpleaños y nadie se acuerda de tocarlo. Es el mismo criterio que ya usaba
 * `experienceStart` para los años de experiencia.
 *
 * No reutiliza `yearsSince` porque esa función asume un ancla `YYYY-MM` y le pega el
 * día 01; acá el día importa.
 */
export function ageFrom(birthDate) {
  const birth = new Date(`${birthDate}T00:00:00`)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  // Todavía no cumplió este año: se resta uno.
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1
  return Math.max(0, age)
}
