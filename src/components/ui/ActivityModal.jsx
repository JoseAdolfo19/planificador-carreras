import { TaskForm } from '../tasks/TasksView'

export default function ActivityModal({ onClose, onAdd, courses, announce }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Cerrar modal">×</button><h2>Nueva actividad</h2><p className="modal-copy">Describe tu nueva tarea o actividad para anadirla a tu plan.</p><TaskForm onAdd={(task) => { onAdd(task); onClose(); announce('Nueva actividad agregada') }} courses={courses} /></div></div>
}
