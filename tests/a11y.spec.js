import { test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const BASE = 'http://127.0.0.1:5199'
const SECTIONS = ['Resumen', 'Mis tareas', 'Calendario', 'Cursos', 'Configuracion']

test('auditoria de accesibilidad completa', async ({ page }) => {
  await page.goto(BASE)
  await page.getByLabel('Correo electrónico').fill('60021765@ieslasalle.edu.pe')
  await page.getByLabel('Contraseña').fill('jose.iberico.as')
  await page.getByRole('button', { name: 'Entrar' }).click()
  const allViolations = []

  for (const section of SECTIONS) {
    // Navegar a cada seccion
    if (section === 'Resumen') {
      await page.locator('.nav-item', { hasText: 'Resumen' }).click()
    } else {
      await page.locator('.nav-item', { hasText: section }).click()
    }
    await page.waitForTimeout(200)

    const results = await new AxeBuilder({ page }).analyze()
    allViolations.push(...results.violations.map((v) => ({ section, ...v })))
  }

  console.log(`VIOLACIONES TOTALES: ${allViolations.length}`)
  for (const v of allViolations) {
    console.log(`\n[${v.section}] [${v.impact}] ${v.id}: ${v.help}`)
    for (const n of v.nodes.slice(0, 5)) {
      console.log(`  - ${n.target.join(' ')}`)
    }
  }
})