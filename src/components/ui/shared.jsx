import { useState } from 'react'

export function Metric({ icon, label, value, detail, tone, onOpenTasks }) {
  const isClickable = Boolean(onOpenTasks)
  const cls = `metric-card ${tone} ${isClickable ? 'clickable' : ''}`
  const inner = <><div className="metric-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></>
  return isClickable ? <button type="button" className={cls} onClick={onOpenTasks}>{inner}</button> : <article className={cls}>{inner}</article>
}

export function FocusTask({ task, rank }) {
  return <article className={`focus-task priority-${task.priority.toLowerCase()}`}>
    <div className="rank">0{rank}</div><div className="focus-content"><div className="task-title-line"><h3>{task.title}</h3><span className="priority-dot" /></div><span className="course-label">{task.course} <i>·</i> {task.type}</span><div className="focus-meta"><span>⌛ {task.estimate}</span><span>Entrega: <b>{task.due}</b></span></div><div className="progress-track"><span style={{ width: `${task.progress}%` }} /></div></div><button className="arrow-button" aria-label={`Abrir ${task.title}`}>↗</button>
  </article>
}

export function AgendaItem({ time, title, meta, color, active }) {
  return <div className={`agenda-item ${active ? 'active' : ''}`}><time>{time}</time><div className={`agenda-dot ${color}`} /><div><strong>{title}</strong><span>{meta}</span></div></div>
}

export function CourseRow({ course, onEdit, onDelete }) {
  return <div className="course-row"><div className={`course-badge ${course.color}`}>{course.name.slice(0, 2).toUpperCase()}</div><div className="course-info"><strong>{course.name}</strong><span>{course.code} · {course.tasks} tareas pendientes</span><div className="progress-track"><span className={course.color} style={{ width: `${course.progress}%` }} /></div></div><b>{course.progress}%</b>{(onEdit || onDelete) && <div className="course-actions">{onEdit && <button className="course-action" onClick={onEdit} aria-label={`Editar ${course.name}`} title="Editar curso">✎</button>}{onDelete && <button className="course-action danger" onClick={onDelete} aria-label={`Eliminar ${course.name}`} title="Eliminar curso">✕</button>}</div>}</div>
}

export function TaskRow({ task, onToggle, onProgress, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(task.progress)
  function commit() { onProgress(task.id, Number(draft) || 0); setEditing(false) }
  return <div className="task-row"><button className={`check-box ${task.progress === 100 ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label={`Marcar ${task.title} como completada`}>{task.progress === 100 && '✓'}</button><div className="task-row-title"><strong>{task.title}</strong><span>{task.course} <i>·</i> {task.type}</span></div><span className={`priority-pill ${task.priority.toLowerCase()}`}>{task.priority}</span><span className="task-due">{task.due}</span><div className="row-progress">{editing ? <><input className="progress-input" type="number" min="0" max="100" value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e) => e.key === 'Enter' && commit()} /><span>%</span></> : <button className="progress-value-button" onClick={() => { setDraft(task.progress); setEditing(true) }} title="Editar progreso">{task.progress}%</button>}<div className="progress-track"><span style={{ width: `${task.progress}%` }} /></div></div><button className="icon-button" aria-label="Mas opciones" title="Eliminar tarea" onClick={onDelete}>✕</button></div>
}
