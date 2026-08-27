export const STORAGE_TASKS = 'studyManager.tasks'
export const STORAGE_COURSES = 'studyManager.courses'
export const STORAGE_PROFILE = 'studyManager.profile'
export const STORAGE_AUTH = 'studyManager.authenticated'
export const LOGIN_EMAIL = '60021765@ieslasalle.edu.pe'
export const LOGIN_PASSWORD = 'jose.iberico.as'

export const defaultTasks = [
  { id: 1, title: 'Terminar informe de mercado', course: 'Administracion', type: 'Trabajo', due: 'Hoy, 18:00', priority: 'Urgente', progress: 40, estimate: '2 h', status: 'En progreso' },
  { id: 2, title: 'Repasar elasticidad y demanda', course: 'Economia', type: 'Estudio', due: 'Manana, 09:00', priority: 'Alta', progress: 20, estimate: '1 h', status: 'Pendiente' },
  { id: 3, title: 'Preparar exposicion grupal', course: 'Comunicacion', type: 'Exposicion', due: 'Jue, 14:30', priority: 'Media', progress: 65, estimate: '1.5 h', status: 'En progreso' },
  { id: 4, title: 'Resolver practica 04', course: 'Matematicas', type: 'Practica', due: 'Vie, 20:00', priority: 'Baja', progress: 0, estimate: '45 min', status: 'Pendiente' },
]
export const defaultCourses = [
  { name: 'Administracion', code: 'ADM-204', color: 'coral', progress: 72, tasks: 8 },
  { name: 'Economia', code: 'ECO-110', color: 'blue', progress: 54, tasks: 5 },
  { name: 'Comunicacion', code: 'COM-101', color: 'yellow', progress: 86, tasks: 3 },
  { name: 'Matematicas', code: 'MAT-102', color: 'green', progress: 40, tasks: 4 },
]
export const defaultProfile = { name: 'Juan Perez', detail: 'Estudiante · 4to semestre' }
export const priorityOptions = ['Urgente', 'Alta', 'Media', 'Baja']
export const courseColors = ['coral', 'blue', 'yellow', 'green']
export const typeOptions = ['Trabajo', 'Estudio', 'Exposicion', 'Practica', 'Proyecto', 'Examen']
export const navItems = [['⌂', 'Resumen'], ['✓', 'Mis tareas'], ['▦', 'Calendario'], ['◫', 'Cursos']]
