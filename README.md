# LaLiga Cecume

Este proyecto es una web para la gestión y visualización de estadísticas de la liga de fútbol Cecume. Está desarrollado principalmente en HTML, CSS y JavaScript, y permite consultar información sobre equipos, goleadores y estadísticas generales de la liga.

## Estructura del proyecto

- **index.html**: Página principal del sitio web.
- **estadisticas.html**: Página dedicada a las estadísticas de la liga.
- **goleadores.html**: Página con información sobre los máximos goleadores.
- **scripts/**: Contiene los archivos JavaScript y datos en formato JSON.
  - `script.js`: Lógica principal de la web.
  - `equipos.json`: Datos de los equipos participantes.
- **styles/**: Archivos CSS para el diseño y estilos de la web.
  - `styles.css`: Estilos generales.
  - `estadisticas.css`: Estilos para la página de estadísticas.
  - `stylesTeams.css`: Estilos para la página de equipos.
  - `preloader.css`: Estilos para el preloader.
- **images/**: Imágenes utilizadas en la web.
  - Logos, escudos de equipos, favicons y otros recursos gráficos.
- **LIGA 24/25.xlsx**: formato que posee el documento excel del cual se sacan los datos

## Características principales

- Visualización de estadísticas de la liga Cecume.
- Consulta de equipos participantes y sus escudos.
- Listado de goleadores y sus estadísticas.
- Diseño responsivo y moderno.

  ## Integración con Google Docs

La web utiliza la API de Google Docs para obtener los datos de la liga. Los datos de equipos, estadísticas y goleadores se gestionan y actualizan directamente 
en las tablas de un documento Excel en Google Docs, permitiendo una administración sencilla y colaborativa de la información.

## Instalación y uso

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/Liga-de-Futbol-CUMe.git
   ```
2. Abre la carpeta del proyecto en tu editor o servidor local.
3. Accede a `index.html` para comenzar a navegar por la web.

## Créditos

- Imágenes y datos proporcionados por la organización Cecume, consejo de estudiantes del centro universitario de Mérida.
- Desarrollado por Javier Conejero.
