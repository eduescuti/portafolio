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
  phone: '+54 11-3878-2797',
  age: 26,
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
  { name: 'Laravel', category: 'backend' },
  { name: 'PHP', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Flask', category: 'backend' },
  { name: 'PostgreSQL', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'Supabase', category: 'data' },
  { name: 'Docker', category: 'tools' },
  { name: 'Filament', category: 'tools' },
  { name: 'n8n', category: 'tools' },
  { name: 'Git', category: 'tools' },
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
        'Automation creation using Supabase crons and n8n workflows.',
        'Analytics dashboard with charts, CSV data upload and survey management.',
      ],
    },
    tech: ['React', 'Supabase', 'PostgreSQL', 'n8n', 'Brevo', 'Recharts'],
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
      es: 'Panel web para clientes médicos con autenticación Supabase, visualización de métricas de email marketing, funnels de encuestas, carga de datos CSV y estandarización de información. Incluye gráficos interactivos con Recharts y gestión de roles admin/cliente.',
      en: 'Web panel for medical clients with Supabase authentication, email marketing metrics visualization, survey funnels, CSV data upload and data standardization. Includes interactive charts with Recharts and admin/client role management.',
    },
    tech: ['React', 'Vite', 'Supabase', 'MUI', 'Recharts', 'Tailwind'],
    highlights: {
      es: ['Auth con roles', 'Gráficos interactivos', 'Carga CSV', 'Panel admin'],
      en: ['Role-based auth', 'Interactive charts', 'CSV upload', 'Admin panel'],
    },
    color: 'from-blue-600 to-indigo-700',
    icon: 'BarChart3',
  },
  {
    id: 'crm-whapp',
    folder: 'AnderssonConsultores/CRM',
    title: { es: 'CRM WhatsApp', en: 'WhatsApp CRM' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'CRM para facilitar el manejo de conversaciones de WhatsApp por secretarias. Backend Node.js con Supabase como base de datos, drag & drop de conversaciones entre secciones, filtros y respuestas rápidas.',
      en: 'CRM to streamline WhatsApp conversation management for secretaries. Node.js backend with Supabase as database, drag & drop conversations between sections, filters and quick replies.',
    },
    tech: ['React', 'Node.js', 'Supabase', 'PostgreSQL'],
    highlights: {
      es: ['Drag & drop', 'Filtros', 'Respuestas rápidas', 'Tiempo real'],
      en: ['Drag & drop', 'Filters', 'Quick replies', 'Real-time'],
    },
    color: 'from-emerald-600 to-teal-700',
    icon: 'MessageSquare',
  },
  {
    id: 'edge-functions',
    folder: 'AnderssonConsultores/Edge Functions',
    title: { es: 'Edge Functions & Automatizaciones', en: 'Edge Functions & Automations' },
    subtitle: { es: 'Andersson Consultores', en: 'Andersson Consultores' },
    description: {
      es: 'Funciones serverless en Supabase para envío de emails, registro de encuestas, webhooks de Brevo y crons automatizados. Workflows en n8n para seguimiento de conversaciones y retargeting.',
      en: 'Supabase serverless functions for email sending, survey registration, Brevo webhooks and automated crons. n8n workflows for conversation follow-up and retargeting.',
    },
    tech: ['Supabase', 'n8n', 'Brevo', 'PostgreSQL', 'JWT'],
    highlights: {
      es: ['Serverless', 'Crons', 'Webhooks', 'n8n workflows'],
      en: ['Serverless', 'Crons', 'Webhooks', 'n8n workflows'],
    },
    color: 'from-violet-600 to-purple-700',
    icon: 'Zap',
  },
  {
    id: 'estetica-app',
    folder: 'estetica-app',
    title: { es: 'Sistema de Turnos — Estética', en: 'Appointment System — Beauty Salon' },
    subtitle: { es: 'Alexandria Solutions', en: 'Alexandria Solutions' },
    description: {
      es: 'Plataforma de gestión de turnos para centros de estética con paneles separados para administradores y clientes. Gestión de servicios, empleados, citas y pagos mediante Laravel Filament con entorno Docker.',
      en: 'Appointment management platform for beauty centers with separate panels for administrators and clients. Services, employees, appointments and payments management using Laravel Filament with Docker environment.',
    },
    tech: ['Laravel', 'Filament', 'PHP', 'MySQL', 'Docker'],
    highlights: {
      es: ['Panel admin', 'Panel cliente', 'Turnos', 'Pagos'],
      en: ['Admin panel', 'Client panel', 'Appointments', 'Payments'],
    },
    color: 'from-rose-500 to-pink-600',
    icon: 'Calendar',
  },
  {
    id: 'uca-planner',
    folder: 'uca-planner',
    title: { es: 'UCA Planner', en: 'UCA Planner' },
    subtitle: { es: 'Proyecto universitario UCA', en: 'UCA university project' },
    description: {
      es: 'Organizador de horarios favorito de la UCA. Permite armar cronogramas visuales de materias y realizar inscripciones a comisiones. Backend Flask con MySQL, roles de administrador y alumno, y gestión completa de cursos, materias y comisiones.',
      en: 'UCA\'s favorite schedule organizer. Allows building visual subject timetables and enrolling in course sections. Flask backend with MySQL, admin and student roles, and full management of courses, subjects and sections.',
    },
    tech: ['Python', 'Flask', 'MySQL', 'JavaScript', 'HTML/CSS'],
    highlights: {
      es: ['Organizador visual', 'Inscripciones', 'Roles admin/alumno', 'MySQL'],
      en: ['Visual scheduler', 'Enrollments', 'Admin/student roles', 'MySQL'],
    },
    color: 'from-amber-500 to-orange-600',
    icon: 'GraduationCap',
  },
]

export const aboutText = {
  es: 'Sólida formación en diversos lenguajes de programación, en busca de trabajos part-time o pasantías para compaginar mis estudios con la adquisición de experiencia práctica. Dispuesto a enfrentar nuevos desafíos y seguir aprendiendo, con el objetivo de contribuir de manera significativa a cualquier equipo o proyecto del que participe.',
  en: 'Solid background in various programming languages, seeking part-time positions or internships to balance my studies with practical workplace experience. Willing to take on new challenges and continue learning, with the aim of contributing meaningfully to any team or project I am involved in.',
}

export const navLinks = [
  { id: 'hero', es: 'Inicio', en: 'Home' },
  { id: 'about', es: 'Sobre mí', en: 'About' },
  { id: 'experience', es: 'Experiencia', en: 'Experience' },
  { id: 'projects', es: 'Proyectos', en: 'Projects' },
  { id: 'skills', es: 'Skills', en: 'Skills' },
  { id: 'contact', es: 'Contacto', en: 'Contact' },
]
