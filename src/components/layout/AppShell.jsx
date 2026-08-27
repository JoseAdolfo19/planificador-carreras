import Sidebar from './Sidebar'
import TasksView from '../tasks/TasksView'
import CalendarView from '../calendar/CalendarView'
import CoursesView from '../courses/CoursesView'
import SettingsView from '../settings/SettingsView'

export default function AppShell({ activeNav, setActiveNav, notice, ...props }) {
  if (activeNav === 'Configuracion') return <SettingsView setActiveNav={setActiveNav} announce={props.announce} notice={notice} />
  const titles = { 'Mis tareas': 'Mis tareas', Calendario: 'Calendario academico', Cursos: 'Mis cursos' }
  const descriptions = { 'Mis tareas': 'Organiza tus actividades y revisa su progreso.', Calendario: 'Consulta tu agenda diaria y tus proximos eventos.', Cursos: 'Revisa el avance de tus cursos activos.' }
  return <div className="app-shell" data-notice={notice}><Sidebar activeNav={activeNav} setActiveNav={setActiveNav} pendingCount={props.pendingCount} semesterProgress={props.semesterProgress} profile={props.profile} setProfile={props.setProfile} onLogout={() => props.setAuthenticated(false)} onConfig={() => setActiveNav('Configuracion')} /><main className="main-content"><header className="topbar"><div className="breadcrumb">Workspace <span>/</span> {activeNav}</div><div className="top-actions"><button className="notification" onClick={() => props.announce('No tienes notificaciones nuevas')} aria-label="Ver notificaciones">♢<i /></button><button className="mini-avatar" onClick={() => props.announce('Perfil de Juan Perez')} aria-label="Abrir perfil">JP</button></div></header><div className="section-view"><div className="section-view-header"><p className="eyebrow warm">WORKSPACE / {activeNav.toUpperCase()}</p><h1>{titles[activeNav]}</h1><p className="subtitle">{descriptions[activeNav]}</p></div>{activeNav === 'Mis tareas' && <TasksView {...props} />}{activeNav === 'Calendario' && <CalendarView tasks={props.tasks} addTask={props.addTask} courseNames={props.courseNames} openTasks={props.openTasks} announce={props.announce} />}{activeNav === 'Cursos' && <CoursesView courseList={props.courseList} tasks={props.tasks} setCourseList={props.setCourseList} setTasks={props.setTasks} announce={props.announce} openTasks={props.openTasks} />}</div></main>{notice && <div className="toast" role="status">{notice}</div>}</div>
}
