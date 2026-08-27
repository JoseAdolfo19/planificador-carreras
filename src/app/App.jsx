import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import LoginView from '../components/auth/LoginView'
import DashboardView from '../components/dashboard/DashboardView'
import AppShell from '../components/layout/AppShell'
import Sidebar from '../components/layout/Sidebar'
import usePersistentState from '../hooks/usePersistentState'
import { STORAGE_AUTH, STORAGE_COURSES, STORAGE_PROFILE, STORAGE_TASKS, defaultCourses, defaultProfile, defaultTasks } from '../data/constants'

export default function App() {
  const [tasks, setTasks] = usePersistentState(STORAGE_TASKS, defaultTasks)
  const [courseList, setCourseList] = usePersistentState(STORAGE_COURSES, defaultCourses)
  const [profile, setProfile] = usePersistentState(STORAGE_PROFILE, defaultProfile)
  const [authenticated, setAuthenticated] = usePersistentState(STORAGE_AUTH, false)
  const [activeNav, setActiveNav] = useState('Resumen')
  const [filter, setFilter] = useState('Todas')
  const [courseFilter, setCourseFilter] = useState('Todos')
  const [showModal, setShowModal] = useState(false)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    if (profile.name === 'Juan Perez') setProfile(defaultProfile)
  }, [profile.name, setProfile])
  useEffect(() => {
    setTasks((current) => current.filter((task) => ![1, 2, 3, 4].includes(task.id)))
  }, [setTasks])
  useEffect(() => {
    setCourseList((current) => {
      const existing = new Set(current.map((course) => course.name))
      const missing = defaultCourses.filter((course) => !existing.has(course.name))
      return missing.length ? [...current, ...missing] : current
    })
  }, [setCourseList])
  const courseNames = useMemo(() => courseList.map((course) => course.name), [courseList])
  const visibleTasks = useMemo(() => { let list = tasks; if (filter !== 'Todas') list = list.filter((task) => task.priority === filter); if (courseFilter !== 'Todos') list = list.filter((task) => task.course === courseFilter); return list }, [tasks, filter, courseFilter])
  const coursesWithDeliveries = useMemo(() => courseList.map((course) => { const courseTasks = tasks.filter((task) => task.course === course.name && task.progress !== 100); if (courseTasks.length === 0) return null; const progress = Math.round(courseTasks.reduce((total, task) => total + task.progress, 0) / courseTasks.length); return { ...course, tasks: courseTasks.length, progress } }).filter(Boolean), [courseList, tasks])
  function toggleTask(taskId) { setTasks((current) => current.map((task) => task.id === taskId ? { ...task, progress: task.progress === 100 ? 0 : 100, status: task.progress === 100 ? 'Pendiente' : 'Completada' } : task)) }
  function setTaskProgress(taskId, progress) { const clamped = Math.max(0, Math.min(100, progress)); setTasks((current) => current.map((task) => task.id === taskId ? { ...task, progress: clamped, status: clamped === 100 ? 'Completada' : 'Pendiente' } : task)) }
  function addTask(newTask) { setTasks((current) => [{ id: Date.now(), status: 'Pendiente', ...newTask }, ...current]) }
  function deleteTask(taskId) { setTasks((current) => current.filter((task) => task.id !== taskId)) }
  function announce(message) { setNotice(message); window.setTimeout(() => setNotice(''), 2200) }
  function handleButtonClick(event) { const button = event.target.closest('button'); if (!button || button.dataset.handled) return; const label = button.getAttribute('aria-label') || button.textContent.trim(); if (label === 'Cerrar aviso') button.closest('.status-banner')?.remove(); else if (label === 'Ver notificaciones') announce('No tienes notificaciones nuevas'); else if (label === 'Abrir menu de perfil' || label === 'Perfil') announce('Menu de perfil'); else if (label === 'Configuracion') setActiveNav('Configuracion'); else if (label === 'Mas opciones') announce('Menu de opciones'); else if (label.startsWith('Ver tod')) setActiveNav(button.closest('.courses-panel') ? 'Cursos' : 'Mis tareas'); else if (label.startsWith('Abrir ')) announce(`Abriendo: ${label.slice(6)}`) }
  const completedCount = useMemo(() => tasks.filter((task) => task.progress === 100).length, [tasks])
  const pendingCount = useMemo(() => tasks.filter((task) => task.progress !== 100).length, [tasks])
  const today = new Date(); const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const todayEvents = useMemo(() => tasks.filter((task) => task.calendarDate === todayKey || /^Hoy\b/i.test(task.due || '')).length, [tasks, todayKey])
  const semesterProgress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0
  const shared = { activeNav, setActiveNav, tasks, visibleTasks, filter, setFilter, courseFilter, setCourseFilter, courseNames, toggleTask, setTaskProgress, deleteTask, addTask, announce, notice, courseList, setCourseList, completedCount, pendingCount, semesterProgress, profile, setProfile, setAuthenticated, openTasks: () => setActiveNav('Mis tareas'), openCalendar: () => setActiveNav('Calendario') }
  if (!authenticated) return <LoginView onLogin={() => setAuthenticated(true)} />
  if (activeNav !== 'Resumen') return <AppShell {...shared} />
   return <div className="app-shell" data-notice={notice} onClick={handleButtonClick}><SidebarFallback {...shared} /><main className="main-content"><header className="topbar"><div className="breadcrumb">Workspace <span>/</span> {activeNav}</div><div className="top-actions"><button className="notification" aria-label="Ver notificaciones">♢<i /></button><div className="mini-avatar">JP</div></div></header><DashboardView profileName={profile.name} tasks={tasks} coursesWithDeliveries={coursesWithDeliveries} completedCount={completedCount} pendingCount={pendingCount} todayEvents={todayEvents} openTasks={shared.openTasks} openCalendar={shared.openCalendar} setActiveNav={setActiveNav} announce={announce} courseNames={courseNames} addTask={addTask} showModal={showModal} setShowModal={setShowModal} />{notice && <div className="toast" role="status">{notice}</div>}</main></div>
}

function SidebarFallback(props) { return <Sidebar activeNav={props.activeNav} setActiveNav={props.setActiveNav} pendingCount={props.pendingCount} semesterProgress={props.semesterProgress} profile={props.profile} setProfile={props.setProfile} onLogout={() => props.setAuthenticated(false)} onConfig={() => props.setActiveNav('Configuracion')} /> }
