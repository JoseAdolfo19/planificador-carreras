export const STORAGE_TASKS = 'studyManager.tasks'
export const STORAGE_COURSES = 'studyManager.courses'
export const STORAGE_PROFILE = 'studyManager.profile'
export const STORAGE_AUTH = 'studyManager.authenticated'
export const LOGIN_EMAIL = '60021765@ieslasalle.edu.pe'
export const LOGIN_PASSWORD = 'jose.iberico.as'

export const defaultTasks = []
export const defaultCourses = [
  { name: 'Legislacion laboral', code: 'LEG-201', color: 'coral', progress: 0, tasks: 0 },
  { name: 'Legislacion Mercantil y Societaria', code: 'LEG-202', color: 'blue', progress: 0, tasks: 0 },
  { name: 'Interpretacion y produccion de textos', code: 'TEX-103', color: 'yellow', progress: 0, tasks: 0 },
  { name: 'Registro de Libros Auxiliares', code: 'RLA-105', color: 'green', progress: 0, tasks: 0 },
  { name: 'Ofimatica', code: 'OFI-101', color: 'coral', progress: 0, tasks: 0 },
  { name: 'Administracion Empresarial', code: 'ADM-204', color: 'blue', progress: 0, tasks: 0 },
  { name: 'Planeamiento Estrategico', code: 'PLA-301', color: 'yellow', progress: 0, tasks: 0 },
]
export const defaultProfile = { name: 'Jose Adolfo Iberico Suña', detail: 'Estudiante · 4to semestre' }
export const priorityOptions = ['Urgente', 'Alta', 'Media', 'Baja']
export const courseColors = ['coral', 'blue', 'yellow', 'green']
export const typeOptions = ['Trabajo', 'Estudio', 'Exposicion', 'Practica', 'Proyecto', 'Examen']
export const navItems = [['⌂', 'Resumen'], ['✓', 'Mis tareas'], ['▦', 'Calendario'], ['◫', 'Cursos']]
