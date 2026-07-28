import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiMui,
  SiHtml5,
  SiPython,
  SiRedis,
  SiPhp,
  SiFlask,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiPhpmyadmin,
  SiN8N,
  SiGit,
  SiGithub,
  SiBrevo,
  SiDocker,
  SiFilament,
  SiClaudecode,
  SiCursor,
  SiXampp,
  SiJsonwebtokens,
  SiChatwoot,
  SiNodedotjs,
  SiClaude,
  SiWhatsapp
} from 'react-icons/si'
// AWS no está en Simple Icons (Amazon lo sacó por su política de marca), así que el
// único logo disponible en react-icons viene del set de Font Awesome. Cuesta ~2 kB.
import { FaAws } from 'react-icons/fa'

// Sin ícono a propósito: SiComposer pesa 39 kB él solo (el logo es una ilustración
// completa, no un glifo) y engordaba el bundle un 9% por un chip. Sin ícono, TechRow
// lo deja fuera de las tiras; sigue apareciendo como texto en la grilla de Skills.

// Mapa único de íconos de tecnologías, reutilizable en proyectos y trayectoria.
export const techIcons = {
  React: SiReact,
  JavaScript: SiJavascript,
  Typescript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Material UI': SiMui,
  'HTML / CSS': SiHtml5,
  'HTML/CSS': SiHtml5,
  Python: SiPython,
  Redis: SiRedis,
  PHP: SiPhp,
  Flask: SiFlask,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  phpMyAdmin: SiPhpmyadmin,
  XAMPP: SiXampp,
  n8n: SiN8N,
  Git: SiGit,
  GitHub: SiGithub,
  Brevo: SiBrevo,
  Docker: SiDocker,
  Filament: SiFilament,
  'Claude Code': SiClaudecode,
  'AI Cursor': SiCursor,
  Claude: SiClaude,
  AWS: FaAws,
  JWT: SiJsonwebtokens,
  Chatwoot: SiChatwoot,
  'Node.js': SiNodedotjs,
  Whatsapp: SiWhatsapp
}
