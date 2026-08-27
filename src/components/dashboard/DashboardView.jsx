import ActivityModal from "../ui/ActivityModal";
import { AgendaItem, CourseRow, FocusTask, Metric } from "../ui/shared";

export default function DashboardView({
  profileName,
  todayTasks,
  tasks,
  coursesWithDeliveries,
  completedCount,
  pendingCount,
  todayEvents,
  openTasks,
  openCalendar,
  setActiveNav,
  announce,
  courseNames,
  addTask,
  showModal,
  setShowModal,
}) {
  return (
    <>
      <div className="content-wrap">
        <section className="welcome-row">
          <div>
            <p className="eyebrow warm">MARTES, 25 DE AGOSTO DE 2026</p>
            <h1>
                Buenos dias, {profileName.split(" ")[0]} <span>✦</span>
            </h1>
            <p className="subtitle">
              Tienes un dia importante por delante. Vamos paso a paso.
            </p>
          </div>
          <button className="primary-button" onClick={() => setShowModal(true)}>
            <span>＋</span> Nueva actividad
          </button>
        </section>
        <section className="status-banner">
          <div className="status-symbol">✓</div>
          <div>
            <strong>Todo bajo control</strong>
            <p>
              Has completado {completedCount} de tus tareas. Manten el ritmo.
            </p>
          </div>
          <div className="banner-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <button className="close-button" aria-label="Cerrar aviso">
            ×
          </button>
        </section>
        <section className="metric-grid" aria-label="Resumen academico">
          <Metric
            icon="▣"
            label="Completadas"
            value={completedCount}
            detail="Ir a Mis tareas"
            tone="coral"
            onOpenTasks={openTasks}
          />
          <Metric
            icon="✓"
            label="Por completar"
            value={pendingCount}
            detail="Ir a Mis tareas"
            tone="blue"
            onOpenTasks={openTasks}
          />
          <Metric
            icon="▦"
            label="Eventos hoy"
            value={todayEvents}
            detail="Ver calendario"
            tone="yellow"
            onOpenTasks={openCalendar}
          />
          <Metric
            icon="↗"
            label="Cumplimiento"
            value={
              tasks.length
                ? Math.round((completedCount / tasks.length) * 100)
                : 0
            }
            detail="Vas muy bien"
            tone="green"
          />
        </section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">ENFOQUE RECOMENDADO</p>
            <h2>¿Que deberias hacer ahora?</h2>
          </div>
          <button className="text-button">
            Ver todas <span>→</span>
          </button>
        </div>
        <section className="focus-grid">
          {tasks.slice(0, 3).map((task, index) => (
            <FocusTask key={task.id} task={task} rank={index + 1} />
          ))}
        </section>
        <div className="dashboard-grid">
          <section className="panel agenda-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">MARTES, 25 AGO</p>
                <h2>Tu agenda de hoy</h2>
              </div>
              <button className="text-button" onClick={openCalendar}>
                Ver todas <span>→</span>
              </button>
            </div>
            <div className="timeline">
              {todayTasks.length === 0 ? (
                <p className="empty-state">No hay eventos programados para hoy.</p>
              ) : todayTasks.map((task) => (
                <AgendaItem
                  key={task.id}
                  time={task.due?.includes(",") ? task.due.split(",").pop().trim() : "Todo el día"}
                  title={task.title}
                  meta={`${task.course} · ${task.type}`}
                  color="coral"
                />
              ))}
            </div>
            <button
              className="outline-button full-width"
              onClick={() => announce("Nueva actividad agregada al dia")}
            >
              ＋ Agregar al dia
            </button>
          </section>
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">PROXIMAS ENTREGAS</p>
                <h2>Cursos con entrega</h2>
              </div>
              <button
                className="text-button"
                onClick={() => setActiveNav("Cursos")}
              >
                Ver todas <span>→</span>
              </button>
            </div>
            <div className="course-list">
              {coursesWithDeliveries.slice(0, 3).map((course) => (
                <CourseRow key={course.name} course={course} />
              ))}
              {coursesWithDeliveries.length === 0 && (
                <p className="empty-state">
                  No hay cursos con entregas pendientes.
                </p>
              )}
            </div>
            <button
              className="outline-button full-width"
              onClick={() => setActiveNav("Cursos")}
            >
              ＋ Agregar curso
            </button>
          </section>
        </div>
      </div>
      {showModal && (
        <ActivityModal
          onClose={() => setShowModal(false)}
          onAdd={addTask}
          courses={courseNames}
          announce={announce}
        />
      )}
    </>
  );
}
