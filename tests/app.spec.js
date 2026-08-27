import { test, expect } from '@playwright/test'

const BASE = 'http://127.0.0.1:5199'

// Limpia localStorage antes de cada test para garantizar un estado aislado
test.beforeEach(async ({ page }) => {
  await page.goto(BASE)
  await page.evaluate(() => window.localStorage.clear())
  await page.goto(BASE)
  await page.getByLabel('Correo electrónico').fill('60021765@ieslasalle.edu.pe')
  await page.getByLabel('Contraseña').fill('jose.iberico.as')
  await page.getByRole('button', { name: 'Entrar' }).click()
})

test.describe('Dashboard (Resumen)', () => {
  test('renderiza el dashboard con titulo y metricas', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Buenos dias, Juan/ })).toBeVisible()
    await expect(page.getByText('Completadas')).toBeVisible()
    await expect(page.getByText('Por completar')).toBeVisible()
    await expect(page.getByText('Cumplimiento')).toBeVisible()
  })

  test('las metricas muestran valores dinamicos de las tareas', async ({ page }) => {
    // 4 tareas iniciales, 0 completadas
    const cards = page.locator('.metric-card')
    await expect(cards).toHaveCount(4)
    // "Por completar" debe ser 4
    await expect(page.locator('.metric-card', { hasText: 'Por completar' }).locator('strong')).toHaveText('4')
  })

  test('permite editar y conservar el perfil', async ({ page }) => {
    await page.getByRole('button', { name: 'Editar perfil' }).click()
    await page.getByLabel('Nombre').fill('Maria Lopez')
    await page.getByLabel('Información académica').fill('Estudiante · 5to semestre')
    await page.getByRole('button', { name: 'Guardar', exact: true }).click()
    await expect(page.locator('.profile-card strong')).toHaveText('Maria Lopez')
    await expect(page.locator('.profile-card span')).toHaveText('Estudiante · 5to semestre')
    await page.reload()
    await expect(page.locator('.profile-card strong')).toHaveText('Maria Lopez')
  })

  test('permite cerrar sesión y volver a entrar', async ({ page }) => {
    await page.getByRole('button', { name: 'Editar perfil' }).click()
    await page.getByRole('button', { name: 'Cerrar sesión' }).click()
    await expect(page.getByRole('heading', { name: 'Inicia sesión' })).toBeVisible()
    await page.getByLabel('Correo electrónico').fill('60021765@ieslasalle.edu.pe')
    await page.getByLabel('Contraseña').fill('jose.iberico.as')
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page.getByRole('heading', { name: /Buenos dias, Juan/ })).toBeVisible()
  })
})

test.describe('Tareas', () => {
  test('navega a Mis tareas y muestra la tabla', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await expect(page.getByRole('heading', { name: 'Mis tareas' })).toBeVisible()
    await expect(page.locator('.task-row')).toHaveCount(4)
  })

  test('agrega una tarea nueva', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await page.getByRole('button', { name: 'Agregar tarea' }).click()
    await page.locator('.task-form input[placeholder*="Titulo"]').fill('Tarea de prueba E2E')
    await page.getByRole('button', { name: 'Crear tarea' }).click()
    await expect(page.getByText('Tarea de prueba E2E')).toBeVisible()
  })

  test('marca una tarea como completada', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    const firstTask = page.locator('.task-row').first()
    const checkbox = firstTask.locator('.check-box')
    await checkbox.click()
    await expect(firstTask.locator('.check-box')).toHaveClass(/checked/)
    await expect(firstTask.locator('.progress-value-button')).toHaveText('100%')
  })

  test('actualiza el progreso del semestre al completar una tarea', async ({ page }) => {
    await expect(page.locator('.semester-card .semester-line b')).toHaveText('0%')
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await page.locator('.task-row').first().locator('.check-box').click()
    await expect(page.locator('.semester-card .semester-line b')).toHaveText('25%')
    await expect(page.locator('.semester-card .progress-track span')).toHaveAttribute('style', 'width: 25%;')
  })

  test('edita el progreso de una tarea manualmente', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    const firstTask = page.locator('.task-row').first()
    await firstTask.locator('.progress-value-button').click()
    const input = firstTask.locator('.progress-input')
    await input.fill('55')
    await input.press('Enter')
    await expect(firstTask.locator('.progress-value-button')).toHaveText('55%')
  })

  test('elimina una tarea', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    const countBefore = await page.locator('.task-row').count()
    await page.locator('.task-row').first().locator('.icon-button[title="Eliminar tarea"]').click()
    const countAfter = await page.locator('.task-row').count()
    expect(countAfter).toBe(countBefore - 1)
  })

  test('filtra por prioridad', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await page.getByRole('button', { name: 'Urgente', exact: true }).click()
    const pills = page.locator('.priority-pill')
    await expect(pills).toHaveCount(1)
    await expect(pills.first()).toHaveText('Urgente')
  })

  test('filtra por curso', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await page.locator('.course-select').selectOption('Economia')
    const rows = page.locator('.task-row')
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i)).toContainText('Economia')
    }
  })
})

test.describe('Persistencia localStorage', () => {
  test('las tareas se conservan al recargar', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await page.getByRole('button', { name: 'Agregar tarea' }).click()
    await page.locator('.task-form input[placeholder*="Titulo"]').fill('Tarea persistente')
    await page.getByRole('button', { name: 'Crear tarea' }).click()
    await expect(page.getByText('Tarea persistente')).toBeVisible()

    // Recargar
    await page.reload()
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await expect(page.getByText('Tarea persistente')).toBeVisible()
  })
})

test.describe('Navegacion', () => {
  test('calendario muestra el mes actual', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Calendario' }).click()
    await expect(page.locator('.calendar-grid')).toBeVisible()
    await expect(page.locator('.calendar-month')).toBeVisible()
  })

  test('seleccionar una fecha permite agregar una tarea con sus detalles', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Calendario' }).click()
    await page.getByRole('button', { name: /Seleccionar 15 de/ }).click()
    await page.getByLabel('Tarea', { exact: true }).fill('Entrega de ensayo')
    await page.getByLabel('Profesor').fill('Ana Torres')
    await page.getByLabel('Importancia').selectOption('Urgente')
    await page.getByLabel('Me dieron la tarea').fill('2026-08-10')
    await page.getByLabel('Fecha de entrega').fill('2026-08-15')
    await page.getByRole('button', { name: 'Guardar tarea' }).click()
    await expect(page.getByText('Entrega de ensayo')).toBeVisible()
    await expect(page.locator('.calendar-task')).toContainText('Administracion')
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await expect(page.locator('.task-row', { hasText: 'Entrega de ensayo' }).locator('.priority-pill')).toHaveText('Urgente')
  })

  test('cursos muestra la lista y permite agregar', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Cursos' }).click()
    await expect(page.locator('.course-row')).toHaveCount(4)
    await page.getByRole('button', { name: 'Agregar curso' }).click()
    await page.locator('.task-form input[placeholder*="Nombre"]').fill('Nuevo Curso E2E')
    await page.getByRole('button', { name: 'Crear curso' }).click()
    await expect(page.getByText('Nuevo Curso E2E')).toBeVisible()
  })

  test('edita un curso', async ({ page }) => {
    await page.locator('.nav-item', { hasText: 'Cursos' }).click()
    await page.getByRole('button', { name: 'Editar Administracion' }).click()
    await page.locator('.course-edit-form .form-input').fill('Administracion Editada')
    await page.getByRole('button', { name: 'Guardar' }).click()
    await expect(page.getByText('Administracion Editada')).toBeVisible()
  })

  test('elimina un curso (acepta dialogo)', async ({ page }) => {
    page.on('dialog', (dialog) => dialog.accept())
    await page.locator('.nav-item', { hasText: 'Cursos' }).click()
    const countBefore = await page.locator('.course-row').count()
    await page.getByRole('button', { name: 'Eliminar Economia' }).click()
    await expect(page.locator('.course-row')).toHaveCount(countBefore - 1)
    await expect(page.getByText('Economia')).toHaveCount(0)
  })

  test('configuracion muestra el panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Configuracion' }).click()
    await expect(page.getByRole('heading', { name: 'Configuracion' })).toBeVisible()
  })

  test('modal Nueva actividad crea tarea real', async ({ page }) => {
    await page.getByRole('button', { name: 'Nueva actividad' }).click()
    await page.locator('.modal input[placeholder*="Titulo"]').fill('Tarea desde modal')
    await page.locator('.modal').getByRole('button', { name: 'Crear tarea' }).click()
    // El modal se cierra y aparece la notificacion
    await expect(page.locator('.toast')).toBeVisible()
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await expect(page.getByText('Tarea desde modal')).toBeVisible()
  })
})

test.describe('Responsive', () => {
  test('funciona en movil (sidebars colapsado)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.locator('.nav-item', { hasText: 'Mis tareas' }).click()
    await expect(page.getByRole('heading', { name: 'Mis tareas' })).toBeVisible()
  })
})
