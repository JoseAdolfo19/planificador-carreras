# Planificador de Carreras

Panel web para organizar actividades académicas, cursos y progreso semanal. La interfaz está construida con React y Vite.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

Clona el repositorio, entra en la carpeta del proyecto e instala las dependencias:

```bash
npm install
```

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Luego abre la URL que muestra Vite, normalmente `http://localhost:5173/`.

Para permitir el acceso desde otros dispositivos de la red local:

```bash
npm run dev -- --host
```

## Funcionamiento

Al abrir la aplicación se muestra el resumen académico de Juan Pérez. La información de tareas y cursos se carga desde datos locales definidos en `src/App.jsx` y se **persiste en el navegador** (localStorage), por lo que tus cambios se mantienen al recargar la página.

### Navegación

Usa el menú lateral para seleccionar Resumen, Mis tareas, Calendario, Cursos o Pomodoro. La sección seleccionada se refleja en la ruta visual superior y permanece activa mientras la aplicación está abierta.

### Tareas

- En **Mis tareas**, selecciona `Todas`, `Urgente`, `Alta` o `Media` para filtrar por prioridad. También puedes filtrar por **curso** con el selector desplegable.
- Pulsa la casilla de una tarea para marcarla como completada. Su progreso cambia a 100% y puedes pulsarla otra vez para devolverla a pendiente.
- Pulsa el **porcentaje** de una tarea para editar su progreso manualmente (0-100%). Pulsa Enter o haz clic fuera para confirmar.
- **Agregar tarea**: pulsa el botón `Agregar tarea` para desplegar un formulario con título, curso, tipo, prioridad, fecha y estimación.
- El botón **✕** de cada tarea la elimina.
- El botón de opciones de cada tarea muestra una confirmación temporal.
- Las tarjetas de **Enfoque recomendado** permiten abrir una confirmación con el nombre de la tarea.

### Agenda y cursos

- La agenda muestra los eventos del martes 25 de agosto, con hora, título y detalle.
- `Agregar al día` y `Agregar curso` funcionan como acciones demostrativas y muestran una confirmación temporal.
- En **Mis cursos** puedes agregar cursos nuevos mediante el formulario desplegable.
- `Ver todos` en cada panel activa la sección relacionada del menú lateral.

### Calendario

- El calendario muestra el mes actual con un selector de días interactivo.
- El punto rojo resalta el día seleccionado y el panel inferior lista las tareas pendientes.
- `Ver todas en Mis tareas` te lleva a la lista completa.

### Otras acciones

- `Nueva actividad` abre un modal con el formulario para crear una tarea real. `Entendido`, el botón de cierre o un clic fuera del modal lo cierra.
- El botón de notificaciones informa si no hay notificaciones nuevas.
- Los botones de perfil y opciones muestran una confirmación temporal.
- El aviso verde puede cerrarse con `×`.

Las confirmaciones aparecen durante unos segundos en la esquina inferior derecha. Los cambios de tareas, cursos, filtros y navegación se guardan automáticamente en localStorage y se mantienen al recargar la página.

## Funciones principales

- Dashboard académico responsive para escritorio, tablet y móvil.
- Agenda diaria con eventos y horarios.
- Seguimiento visual de cursos, tareas y progreso.
- Navegación y controles interactivos implementados con React.

## Comandos disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Compilación de producción
npm run preview   # Previsualización de la compilación
npm run lint      # Revisión del código con Oxlint
npm test          # Tests E2E (Playwright) + auditoría de accesibilidad
```

## Testing

La suite de pruebas usa [Playwright](https://playwright.dev/) y [axe-core](https://www.deque.com/axe/) para validación funcional y de accesibilidad:

- `tests/app.spec.js` — pruebas E2E funcionales: dashboard, tareas (agregar/eliminar/editar progreso/marcar completada), filtros por prioridad y curso, persistencia en localStorage, navegación, modal y responsive.
- `tests/a11y.spec.js` — auditoría de accesibilidad (WCAG 2.x / axe) recorriendo todas las secciones de la app.

Para ejecutarlos, primero arranca el servidor de desarrollo en un terminal y, en otro, lanza los tests:

```bash
npm run dev -- --host 127.0.0.1 --port 5199
npm test
```

Los tests apuntan a `http://127.0.0.1:5199`. Los navegadores de Playwright deben estar descargados (`npx playwright install chromium`).

## Estructura principal

```text
src/
├── App.jsx       # Componentes y estado principal del dashboard
├── App.css       # Estilos del dashboard y diseño responsive
├── index.css     # Estilos globales
├── main.jsx      # Punto de entrada de React
└── assets/       # Recursos estáticos
public/           # Archivos públicos
```

La persistencia usa localStorage con las claves `studyManager.tasks` y `studyManager.courses`.

## Validación

Antes de publicar cambios, ejecuta:

```bash
npm run lint
npm run build
```

El archivo `start_servers.bat` pertenece a una configuración anterior con carpetas separadas de frontend y backend. Para esta versión, utiliza los comandos npm de este README.
