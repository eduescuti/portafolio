/**
 * Trae el calendario de contribuciones del último año y lo escribe en
 * `src/data/github-contributions.json`.
 *
 * Corre en build (`prebuild`), NUNCA en el navegador: la GraphQL API de GitHub exige
 * token, y un token con prefijo VITE_ terminaría dentro del bundle a la vista de
 * cualquiera. Acá el token es una variable de entorno del build (en Vercel: Settings →
 * Environment Variables, SIN prefijo).
 *
 * Dos fuentes, en este orden:
 *   1. GraphQL API, si hay `GITHUB_TOKEN`. Es la oficial y la que da los números exactos.
 *   2. El calendario público de github.com, sin credenciales. Es HTML y por lo tanto
 *      frágil, pero permite que el heatmap funcione en un clon del repo sin configurar
 *      nada.
 *
 * Si las dos fallan no se rompe el build: queda el JSON commiteado, que es el último dato
 * bueno. Un token vencido o un cambio de markup no pueden tumbar un deploy por un
 * gráfico decorativo.
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const LOGIN = process.env.GITHUB_LOGIN || 'eduescuti'
const TOKEN = process.env.GITHUB_TOKEN
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/github-contributions.json')

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
    }
  }`

async function fromGraphQL() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portafolio-build',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  })

  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`)

  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '))

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) throw new Error('respuesta sin contributionCalendar')

  return calendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount }))
}

/**
 * Calendario público. Cada `<td class="ContributionCalendar-day">` trae la fecha y un id;
 * el número real de contribuciones está en el `<tool-tip for="<id>">` correspondiente
 * ("No contributions on…", "1 contribution on…", "7 contributions on…").
 *
 * Se usa el tooltip y no `data-level` porque el nivel es un cubo de 0 a 4 y perdería el
 * total exacto.
 */
async function fromPublicCalendar() {
  const res = await fetch(`https://github.com/users/${LOGIN}/contributions`, {
    headers: { 'User-Agent': 'portafolio-build' },
  })
  if (!res.ok) throw new Error(`calendario público HTTP ${res.status}`)

  const html = await res.text()

  const counts = new Map()
  const tipRe = /<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g
  for (const [, id, text] of html.matchAll(tipRe)) {
    const n = /^(\d+)\s+contribution/.exec(text.trim())
    counts.set(id, n ? Number(n[1]) : 0)
  }

  const days = []
  const cellRe = /<td[^>]*class="ContributionCalendar-day"[^>]*>/g
  for (const [tag] of html.matchAll(cellRe)) {
    const date = /data-date="([^"]+)"/.exec(tag)?.[1]
    const id = /\sid="([^"]+)"/.exec(tag)?.[1]
    if (!date) continue
    days.push({ date, count: counts.get(id) ?? 0 })
  }

  if (days.length === 0) throw new Error('el calendario público no devolvió días')
  return days
}

async function main() {
  let days
  let source

  if (!TOKEN) {
    // Sin este aviso la ruta sin token es silenciosa y hace creer que el número está bien.
    // El calendario público sólo cuenta contribuciones PÚBLICAS, salvo que el perfil tenga
    // activado "Include private contributions on my profile" (Settings → Profile), que es
    // lo que hace que el total coincida con el que se ve estando logueado.
    console.warn(
      '[github] Sin GITHUB_TOKEN: se usa el calendario público.\n' +
        '         Si "Include private contributions on my profile" está activo en el\n' +
        '         perfil, el total es correcto igual. Si no, deja afuera los repos\n' +
        '         privados. Ver PLAN_FIGURITAS_V2.md §2.'
    )
  }

  try {
    days = TOKEN ? await fromGraphQL() : await fromPublicCalendar()
    source = TOKEN ? 'graphql' : 'public'
  } catch (err) {
    if (TOKEN) {
      console.warn(`[github] GraphQL falló (${err.message}); probando el calendario público.`)
      days = await fromPublicCalendar()
      source = 'public'
    } else {
      throw err
    }
  }

  // Orden cronológico: las dos fuentes lo entregan distinto (GraphQL va semana por
  // semana; el HTML va fila por fila, o sea todos los domingos, después todos los lunes…).
  // Ordenar por fecha deja las dos en el mismo formato, que es el que espera el componente.
  days.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))

  const start = days[0].date
  const payload = {
    updated: new Date().toISOString().slice(0, 10),
    login: LOGIN,
    // De dónde salió el número. Sirve para depurar un total que no cuadra sin tener que
    // adivinar si el build corrió con token o sin él.
    source,
    total: days.reduce((sum, d) => sum + d.count, 0),
    start,
    // Día de la semana del primer dato (0 = domingo). El componente lo necesita para
    // ubicar la primera columna: si el calendario no arranca un domingo, sin esto todas
    // las celdas quedan corridas una fila.
    startWeekday: new Date(`${start}T00:00:00Z`).getUTCDay(),
    max: days.reduce((m, d) => Math.max(m, d.count), 0),
    // Array plano de enteros a propósito: ~1kB contra los ~25kB que ocuparía repetir una
    // fecha por día. La grilla se reconstruye a partir de `start` y del índice.
    days: days.map((d) => d.count),
  }

  await writeFile(OUT, `${JSON.stringify(payload)}\n`, 'utf8')
  console.log(
    `[github] ${payload.total} contribuciones · ${payload.days.length} días · desde ${payload.start} · fuente: ${source}.`
  )
}

main().catch((err) => {
  console.warn(`[github] No se pudo actualizar (${err.message}). Se conserva el JSON commiteado.`)
})
