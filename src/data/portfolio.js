export const profile = {
  name: 'Eduardo Escuti',
  role: {
    es: 'Estudiante de Ingeniería en Informática',
    en: 'Software Engineering Student',
  },
  university: {
    es: 'Universidad Católica Argentina (UCA)',
    en: 'Argentina Catholic University (UCA)',
  },
  location: {
    es: 'Recoleta, Ciudad Autónoma de Buenos Aires',
    en: 'Recoleta, Buenos Aires City, Argentina',
  },
  email: 'eduescuti99@gmail.com',
  phone: '+54 9 11-3878-2797',
  age: 26,
  linkedin: 'https://www.linkedin.com/in/eduardo-escuti',
  instagram: 'https://www.instagram.com/eduescuti',
  cv: {
    es: '/cv-eduardo-escuti.pdf',
    en: '/cv-eduardo-escuti-en.pdf',
  },
}

export const skills = [
  { name: 'React', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Material UI', category: 'frontend' },
  { name: 'HTML / CSS', category: 'frontend' },
  { name: 'UX', category: 'frontend' },
  { name: 'Python', category: 'backend' },
  { name: 'Supabase', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'PHP', category: 'backend' },
  { name: 'Flask', category: 'backend' },
  { name: 'Laravel', category: 'backend' },
  { name: 'PostgreSQL', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'Supabase', category: 'data' },
  { name: 'Redis', category: 'data' },
  { name: 'phpMyAdmin', category: 'data' },
  { name: 'n8n', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'Brevo', category: 'tools' },
  { name: 'SendGrid', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'AI Cursor', category: 'ai' },
  { name: 'Claude Code', category: 'ai' },
  { name: 'Composer', category: 'ai' },
  { name: 'Sonnet', category: 'ai' },
  { name: 'Opus', category: 'ai' },
]

export const experience = [
  {
    id: 'andersson',
    company: 'Andersson Consultores',
    period: { es: 'Abr 2025 — Actualidad', en: 'Apr 2025 — Present' },
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    highlights: {
      es: [
        'Desarrollo backend y frontend con React, Supabase y PostgreSQL.',
        'Integración de APIs como Supabase Edge Functions y Brevo para email marketing.',
        'Creación de automatizaciones con crons de Supabase y workflows en n8n.',
        'Dashboard analítico con gráficos, carga de datos CSV y gestión de encuestas.',
      ],
      en: [
        'Backend & frontend development with React, Supabase and PostgreSQL.',
        'Integration of APIs such as Supabase Edge Functions and Brevo for email marketing.',
        'Automation with Supabase crons and n8n workflows.',
        'Analytics dashboard with charts, CSV data upload and survey management.',
      ],
    },
    tech: ['React', 'Supabase', 'PostgreSQL', 'n8n', 'Brevo', 'Redis'],
  },
  {
    id: 'alexandria',
    company: 'Alexandria Solutions',
    period: { es: 'Ene 2025 — Jun 2025', en: 'Jan 2025 — Jun 2025' },
    role: { es: 'Desarrollador Web', en: 'Web Developer' },
    highlights: {
      es: [
        'Sistema de turnos con Laravel + Filament como framework principal.',
        'Entorno de desarrollo containerizado con Docker.',
        'Gestión de base de datos con phpMyAdmin y MySQL.',
      ],
      en: [
        'Appointment scheduling system using Laravel + Filament as the main framework.',
        'Containerized development environment with Docker.',
        'Database management with phpMyAdmin and MySQL.',
      ],
    },
    tech: ['Laravel', 'Filament', 'PHP', 'MySQL', 'Docker'],
  },
]

export const education = [
  {
    institution: { es: 'Universidad Católica Argentina', en: 'Argentina Catholic University' },
    degree: { es: 'Ingeniería en Informática', en: 'Software Engineering' },
    period: { es: 'Mar 2023 — Actualidad', en: 'Mar 2023 — Present' },
  },
  {
    institution: { es: 'Universidad de Buenos Aires', en: 'University of Buenos Aires (UBA)' },
    degree: { es: 'Ingeniería en Informática (sin finalizar)', en: 'Software Engineering (not completed)' },
    period: { es: 'Mar 2018 — Dic 2022', en: 'Mar 2018 — Dec 2022' },
  },
  {
    institution: { es: 'Colegio Champagnat', en: 'Champagnat School' },
    degree: { es: 'Primaria y Secundaria', en: 'Primary & Secondary' },
    period: { es: '2003 — 2017', en: '2003 — 2017' },
  },
]

export const projects = [
  {
    id: 'dashboard-ac',
    folder: 'AnderssonConsultores/Dashboard',
    title: { es: 'Dashboard Analítico AC', en: 'AC Analytics Dashboard' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'Panel para clientes médicos, con roles admin y cliente sobre Supabase.',
      en: 'Medical client panel with admin and client roles, built on Supabase.',
    },
    tech: ['React', 'Supabase', 'UX/UI Design', 'APIs', 'Recharts', 'Email Marketing'],
    highlights: {
      es: ['Dashboard Analítico', 'Gráficos interactivos', 'Carga de Archivos', 'Panel admin'],
      en: ['Analytics Dashboard', 'Interactive charts', 'File Upload', 'Admin panel'],
    },
    color: 'from-blue-600 to-indigo-700',
    icon: 'BarChart3',
    url: 'https://app.anderssonconsultores.com',
    imageBackground: '/projects/dashboard-ac-preview.png',
  },
  {
    id: 'edge-functions',
    folder: 'AnderssonConsultores/Edge Functions',
    title: { es: 'Edge Functions & Automatizaciones', en: 'Edge Functions & Automations' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'Automatizaciones serverless para emails, encuestas y seguimiento de leads.',
      en: 'Serverless automations for emails, surveys and lead follow-up.',
    },
    tech: ['Supabase', 'Brevo', 'PostgreSQL', 'JWT', 'Webhooks'],
    highlights: {
      es: ['Serverless', 'Crons', 'Edge Functions', 'Webhooks', 'n8n workflows'],
      en: ['Serverless', 'Crons', 'Edge Functions', 'Webhooks', 'n8n workflows'],
    },
    color: 'from-violet-600 to-purple-700',
    icon: 'Zap',
    url: 'https://supabase.com/',
    imageBackground: '/projects/supabase.png',
  },
  {
    id: 'crm-whapp',
    folder: 'AnderssonConsultores/CRM',
    title: { es: 'CRM WhatsApp', en: 'WhatsApp CRM' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'CRM para secretarias: gestión de conversaciones de WhatsApp sobre Chatwoot.',
      en: 'CRM for secretaries: WhatsApp conversation management built on Chatwoot.',
    },
    tech: ['n8n', 'Chatwoot', 'PostgreSQL', 'AI Agents', 'Bots'],
    highlights: {
      es: ['Filtros', 'Respuestas rápidas', 'Tiempo real', 'AI Response'],
      en: ['Filters', 'Quick replies', 'Real-time', 'AI Response'],
    },
    color: 'from-emerald-600 to-teal-700',
    icon: 'MessageSquare',
    url: 'https://chatwoot.com/',
    imageBackground: '/projects/wapp2.png',
  },
  {
    id: 'estetica-app',
    folder: 'estetica-app',
    title: { es: 'Sistema de Turnos — Estética', en: 'Appointment System — Beauty Salon' },
    subtitle: { es: 'Alexandria Solutions', en: 'Alexandria Solutions' },
    description: {
      es: 'Gestión de turnos para centros de estética, construido con Laravel Filament.',
      en: 'Appointment management for beauty centers, built with Laravel Filament.',
    },
    tech: ['Laravel', 'Filament', 'PHP', 'MySQL', 'Docker'],
    highlights: {
      es: ['Panel admin', 'Panel cliente', 'Turnos', 'Pagos'],
      en: ['Admin panel', 'Client panel', 'Appointments', 'Payments'],
    },
    color: 'from-pink-600 to-dark-700',
    icon: 'Calendar',
  },
  {
    id: 'uca-planner',
    folder: 'uca-planner',
    title: { es: 'UCA Planner', en: 'UCA Planner' },
    subtitle: { es: 'Proyecto universitario UCA', en: 'UCA university project' },
    description: {
      es: 'Organizador de horarios para estudiantes de la UCA, con backend en Flask.',
      en: 'Schedule organizer for UCA students, backend built with Flask.',
    },
    tech: ['Python', 'Flask', 'MySQL', 'JavaScript', 'HTML/CSS'],
    highlights: {
      es: ['Organizador visual', 'Inscripciones', 'Roles admin/alumno', 'MySQL'],
      en: ['Visual scheduler', 'Enrollments', 'Admin/student roles', 'MySQL'],
    },
    color: 'from-blue-800 to-black-800',
    icon: 'GraduationCap',
  },
  {
    id: 'coming-soon',
    folder: '...',
    title: { es: 'Proximamente...', en: 'Coming soon...' },
    subtitle: { es: 'Desarrollando algo propio', en: 'Developing something on my own' },
    description: {
      es: 'Intentando tambien de emprender por mi cuenta y desarrollando un proyecto personal.',
      en: 'Also trying to venture on my own, I am developing a personal project that will be available soon.',
    },
    tech: ['AWS', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'AI Agents'],
    highlights: {
      es: ['Aplicacion Web', 'Futura App Móvil', 'Integración con AI Agents', 'Redis'],
      en: ['Web Application', 'Future Mobile App', 'Integration with AI Agents', 'Redis'],
    },
    color: 'from-blue-800 to-darkblue-600',
    icon: 'Zap',
    imageBackground: '/projects/app.png',
  },
]

export const aboutText = {
  es: [
    'Soy estudiante de Ingeniería en Informática avanzado en la UCA y actualmente me desempeño como Full Stack Developer en AnderssonConsultores.',
    'Tengo experiencia desarrollando soluciones SaaS con frameworks modernos, bases de datos y herramientas de automatización.',
    'Busco seguir creciendo como profesional IT y colaborar en proyectos que generen impacto.',
  ],
  en: [
    'I am a Software Engineering student advanced at UCA and currently working as a Full Stack Developer at AnderssonConsultores.',
    'Experience building SaaS solutions with modern frameworks, databases and automation tools.',
    'Looking to keep growing as an IT professional and collaborate on impactful projects.',
  ],
}

export const navLinks = [
  { id: 'hero', es: 'Inicio', en: 'Home' },
  { id: 'about', es: 'Sobre mí', en: 'About' },
  { id: 'experience', es: 'Experiencia', en: 'Experience' },
  { id: 'projects', es: 'Proyectos', en: 'Projects' },
  { id: 'skills', es: 'Skills', en: 'Skills' },
  { id: 'contact', es: 'Contacto', en: 'Contact' },
]
