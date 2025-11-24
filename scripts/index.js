// Variable global para verificar si las librerías están cargadas
let libreriasListas = false;

// Cargar librerías de forma asíncrona
function cargarLibrerias() {
    return new Promise((resolve, reject) => {
        // Cargar XLSX
        const xlsxScript = document.createElement('script');
        xlsxScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';

        // Cargar jsPDF
        const jspdfScript = document.createElement('script');
        jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

        let xlsxCargado = false;
        let jspdfCargado = false;

        xlsxScript.onload = () => {
            console.log('XLSX cargado');
            xlsxCargado = true;
            if (jspdfCargado) {
                libreriasListas = true;
                resolve();
            }
        };

        jspdfScript.onload = () => {
            console.log('jsPDF cargado');
            jspdfCargado = true;
            if (xlsxCargado) {
                libreriasListas = true;
                resolve();
            }
        };

        xlsxScript.onerror = () => reject(new Error('Error al cargar XLSX'));
        jspdfScript.onerror = () => reject(new Error('Error al cargar jsPDF'));

        document.head.appendChild(xlsxScript);
        document.head.appendChild(jspdfScript);
    });
}

// Cargar librerías al inicio
cargarLibrerias().catch(err => console.error('Error cargando librerías:', err));


// Configuración de jornadas
const CONFIG = {
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJpw5wkDDz9shxQhFgB-xafNUysY1QjgozLOrG9W_jlnhSSvXoGzl90BusJbqA31wf7MK0kPA2hHyQ/pub?gid=481132578&single=true&output=csv",
    JORNADA_ACTUAL: 4
};

const jornadas = {
    1: {
        fecha: "14 - 24 OCTUBRE",
        titulo: "JORNADA 1",
        banner: crearBannerPartidos([
            { local: "RAYO MARIGUANO", visitante: "UNIÓN DEPORTIVA PORRETA", colorLocal: "#158000", colorVisitante: "#244228" },
            { local: "ATLÉTICO MORANTE", visitante: "CUM CITY", colorLocal: "#931400", colorVisitante: "#ffffff" },
            { local: "ASTON BIRRA", visitante: "I.E. SALA", colorLocal: "#2c2c2c", colorVisitante: "#0058cb" }
        ]),
        resultados: crearResultados([
            { local: "RAYO MARIGUANO", visitante: "UNIÓN DEPORTIVA PORRETA", resultado: "3 - 6", fecha: "16 OCT | 19:30h", lugar: "CAMPO FUTSAL CUME", acta: "/actas/j1/rayo-udp.xlsx" },
            { local: "ASTON BIRRA", visitante: "I.E. SALA", resultado: "1 - 6", fecha: "20 OCT | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES", acta: "/actas/j1/aston-iesala.xlsx" },
            { local: "ATLÉTICO MORANTE", visitante: "CUM CITY", resultado: "13 - 0", fecha: "21 OCT | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES", acta: "/actas/j1/morante-city.xlsx" }
        ], "CUM UNITED")
    },
    2: {
        fecha: "25 OCTUBRE - 04 NOVIEMBRE",
        titulo: "JORNADA 2",
        banner: crearBannerPartidos([
            { local: "CUM UNITED", visitante: "UNIÓN DEPORTIVA PORRETA", colorLocal: "#e7ad1b", colorVisitante: "#000000" },
            { local: "I.E. SALA", visitante: "RAYO MARIGUANO", colorLocal: "#0058cb", colorVisitante: "#036700" },
            { local: "ATLÉTICO MORANTE", visitante: "ASTON BIRRA", colorLocal: "#c50000", colorVisitante: "#000000" }
        ]),
        resultados: crearResultados([
            { local: "CUM UNITED", visitante: "UNIÓN DEPORTIVA PORRETA", resultado: "vs", fecha: "24 NOV | 17:30h", lugar:"CIUDAD DEPORTIVA", esAplazado: true },
            { local: "I.E. SALA", visitante: "RAYO MARIGUANO", resultado: "10 - 1", fecha: "27 OCT | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES", acta: "/actas/j2/iesala-rayo.xlsx" },
            { local: "ATLÉTICO MORANTE", visitante: "ASTON BIRRA", resultado: "6 - 2", fecha: "04 NOV | 21:30h", lugar: "CIUDAD DEPORTIVA", acta: "/actas/j2/morante-aston.xlsx" }
        ], "CUM CITY")
    },
    3: {
        fecha: "05 - 15 NOVIEMBRE",
        titulo: "JORNADA 3",
        banner: crearBannerPartidos([
            { local: "CUM CITY", visitante: "CUM UNITED", colorLocal: "#ffffff", colorVisitante: "#e7ad1b" },
            { local: "UNIÓN DEPORTIVA PORRETA", visitante: "I.E. SALA", colorLocal: "#000000", colorVisitante: "#0058cb" },
            { local: "RAYO MARIGUANO", visitante: "ATLÉTICO MORANTE", colorLocal: "#036700", colorVisitante: "#c50000" }
        ]),
        resultados: crearResultados([
            { local: "CUM CITY", visitante: "CUM UNITED", resultado: "3 - 13", fecha: "10 NOV | 19:00h", lugar: "PISTA SAN ANDRÉS", acta: "/actas/j3/united-city.xlsx" },
            { local: "UNIÓN DEPORTIVA PORRETA", visitante: "I.E. SALA", resultado: "6 - 3", fecha: "12 NOV | 21:30h", lugar: "CIUDAD DEPORTIVA", acta: "/actas/j3/udp-iesala.xlsx", incidencias: "/documentos/j3/udp-iesala.pdf" },
            { local: "RAYO MARIGUANO", visitante: "ATLÉTICO MORANTE", resultado: "3 - 8", fecha: "18 NOV | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES", acta: "/actas/j3/rayo-morante.xlsx" }
        ], "ASTON BIRRA")
    },
    4: {
        fecha: "16 - 26 NOVIEMBRE",
        titulo: "JORNADA 4",
        banner: crearBannerPartidos([
            { local: "CUM UNITED", visitante: "I.E. SALA", colorLocal: "#EECEAF", colorVisitante: "#3C4868" },
            { local: "CUM CITY", visitante: "ASTON BIRRA", colorLocal: "#c2ddf2", colorVisitante: "#3B9DB8" },
            { local: "ATLÉTICO MORANTE", visitante: "UNIÓN DEPORTIVA PORRETA", colorLocal: "#BB284F", colorVisitante: "#000000" }
        ]),
        resultados: crearResultados([
            { local: "CUM UNITED", visitante: "I.E. SALA", resultado: "vs", fecha: "POR DEFINIR", esAplazado: true },
            { local: "CUM CITY", visitante: "ASTON BIRRA", resultado: "vs", fecha: "26 NOV | 21:30h", lugar: "CIUDAD DEPORTIVA"},
            { local: "ATLÉTICO MORANTE", visitante: "UNIÓN DEPORTIVA PORRETA", resultado: "vs", fecha: "POR DEFINIR" }
        ], "RAYO MARIGUANO")
    }
};

// Funciones auxiliares
function crearBannerPartidos(partidos) {
    return partidos.map(p => `
                <div class="partido-card">
                    <img src="images/Escudos/${p.local}.png" class="escudo" alt="Escudo ${p.local}" loading="lazy">
                    <div class="linea" style="--linea-color: ${p.colorLocal};"></div>
                    <span class="nombre-equipo">${p.local}</span>
                    <span class="vs">VS</span>
                    <span class="nombre-equipo">${p.visitante}</span>
                    <div class="linea" style="--linea-color: ${p.colorVisitante};"></div>
                    <img src="images/Escudos/${p.visitante}.png" class="escudo" alt="Escudo ${p.visitante}" loading="lazy">
                </div>
            `).join('');
}

function crearResultados(partidos, arbitro) {
    const partidosHTML = partidos.map(p => {
        const botonesHTML = [];
        if (p.acta) botonesHTML.push(`<button class="btn-acta" onclick="generarActaDesdeArchivo('${p.acta}')">ACTA</button>`);
        if (p.incidencias) botonesHTML.push(`<button class="btn-inci" onclick="window.open('${p.incidencias}', '_blank')">INCIDENCIAS</button>`);

        const lugarHTML = p.lugar ? `<p class="lugar">${p.lugar}</p>` : '';
        const aplazadoLabel = p.esAplazado ? '<p class="lugar" style="font-size:0.4em;">[APLAZADO]</p>' : '';

        return `
                    <div class="partido-card-resultado">
                        <div class="resultado-superior">
                            <img src="images/Escudos/${p.local}.png" class="escudo-equipo" alt="Escudo ${p.local}" loading="lazy">
                            <span class="resultado">${p.resultado}</span>
                            <img src="images/Escudos/${p.visitante}.png" class="escudo-equipo" alt="Escudo ${p.visitante}" loading="lazy">
                        </div>
                        ${aplazadoLabel}
                        <p class="fecha-hora">${p.fecha}</p>
                        ${lugarHTML}
                        ${botonesHTML.join('')}
                    </div>
                `;
    }).join('');

    return `
                <section class="resultado-partido-container">
                    ${partidosHTML}
                </section>
                <div class="arbitro-info">
                    <span class="texto-arbitro">ARBITRA: ${arbitro}</span>
                    <img src="images/Escudos/${arbitro}.png" alt="Escudo ${arbitro}" class="escudo-arbitro" loading="lazy">
                </div>
            `;
}

// Cargar tabla de clasificación
function cargarClasificacion() {
    const tableBody = document.querySelector("#tablaEstadisticas tbody");

    fetch(CONFIG.SHEET_URL)
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.text();
        })
        .then(data => {
            const rows = data.split("\n").slice(1).filter(row => row.trim());
            const fragment = document.createDocumentFragment();

            rows.forEach((row, index) => {
                const cols = row.split(",").map(col => col.trim());
                if (cols.length >= 10) {
                    const tr = document.createElement("tr");
                    if (index < 4) tr.classList.add("playoff");

                    const teamName = cols[1];

                    tr.innerHTML = `
                                <td>${cols[0]}</td>
                                <td>
                                    <img src="images/Escudos/${teamName}.png" 
                                         alt="${teamName} logo" 
                                         style="height: 20px; margin-right: 8px; vertical-align: middle;"
                                         loading="lazy">
                                    ${teamName}
                                </td>
                                ${cols.slice(2, 10).map(col => `<td>${col}</td>`).join('')}
                            `;

                    fragment.appendChild(tr);
                }
            });

            tableBody.appendChild(fragment);
        })
        .catch(error => {
            console.error('Error al cargar la clasificación:', error);
            tableBody.innerHTML = '<tr><td colspan="10" style="text-align: center;">Error al cargar los datos</td></tr>';
        });
}

// Navegación responsiva
function inicializarNavbar() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    function toggleMenu(e) {
        e?.preventDefault();
        const isOpen = navLinks.classList.toggle("show");
        menuToggle.setAttribute('aria-expanded', isOpen);
    }

    menuToggle.addEventListener("click", toggleMenu);

    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Selector de jornadas
function inicializarSelectorJornadas() {
    const selector = document.getElementById("selector-jornada");
    const fecha = document.getElementById("fecha-jornada");
    const titulo = document.getElementById("titulo-jornada");
    const banner = document.getElementById("banner-partidos");
    const resultados = document.getElementById("resultados");

    // Cargar jornada actual
    const jornadaActual = jornadas[CONFIG.JORNADA_ACTUAL];
    fecha.textContent = jornadaActual.fecha;
    titulo.textContent = jornadaActual.titulo;
    banner.innerHTML = jornadaActual.banner;
    resultados.innerHTML = jornadaActual.resultados;

    selector.addEventListener("change", (e) => {
        const jornada = jornadas[e.target.value];
        fecha.textContent = jornada.fecha;
        titulo.textContent = jornada.titulo;
        banner.innerHTML = jornada.banner;
        resultados.innerHTML = jornada.resultados;
    });
}

// Generación de PDFs
async function generarActaDesdeArchivo(rutaArchivo) {
    // Verificar que las librerías estén cargadas
    if (!libreriasListas) {
        alert('Las librerías aún se están cargando. Por favor, espera un momento e inténtalo de nuevo.');
        console.log('Esperando a que las librerías se carguen...');
        return;
    }

    if (typeof XLSX === 'undefined') {
        alert('Error: La librería XLSX no está cargada. Por favor, recarga la página.');
        console.error('XLSX no está definido');
        return;
    }

    if (typeof window.jspdf === 'undefined') {
        alert('Error: La librería jsPDF no está cargada. Por favor, recarga la página.');
        console.error('jsPDF no está definido en window.jspdf');
        return;
    }

    try {
        console.log('Cargando acta desde:', rutaArchivo);
        const response = await fetch(rutaArchivo);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        console.log('Archivo cargado, procesando...');
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const get = (cell) => (sheet[cell]?.v || "");

        const partidoData = {
            equipoLocal: get("C2"),
            equipoVisitante: get("C3"),
            arbitro: get("M3"),
            hora: get("T3"),
            golesLocal: get("M23"),
            golesVisitante: get("M24"),
            jugadoresLocal: extraerJugadores(sheet, 'A', 'B', 'D', 'F', 'G'),
            jugadoresVisitante: extraerJugadores(sheet, 'L', 'M', 'R', 'S', 'T')
        };

        console.log('Datos extraídos:', partidoData);
        console.log('Generando PDF...');
        await generarPDF(partidoData);
    } catch (error) {
        console.error('Error detallado al generar el acta:', error);
        alert(`Error al generar el acta: ${error.message}\n\nRevisa la consola para más detalles.`);
    }
}

function extraerJugadores(sheet, colConv, colNombre, colGoles, colAmar, colRojas) {
    const jugadores = [];
    for (let i = 7; i <= 18; i++) {
        const convocado = sheet[`${colConv}${i}`]?.v;
        const nombre = sheet[`${colNombre}${i}`]?.v;
        if (convocado && nombre) {
            jugadores.push({
                nombre,
                goles: sheet[`${colGoles}${i}`]?.v || 0,
                amarillas: sheet[`${colAmar}${i}`]?.v || 0,
                rojas: sheet[`${colRojas}${i}`]?.v || 0
            });
        }
    }
    return jugadores;
}

async function generarPDF(partidoData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Colores corporativos
    const colorPrimario = [239, 51, 64];
    const colorSecundario = [33, 33, 33];
    const colorGris = [100, 100, 100];
    const colorGrisClaro = [240, 240, 240];

    // Fondo
    doc.setFillColor(250, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    doc.setFillColor(...colorPrimario);
    doc.rect(0, 0, pageWidth, 8, 'F');

    // Logo
    try {
        const logo = await loadImage("/images/logoLigaRojo.png");
        const ratio = Math.min(240 / logo.width, 170 / logo.height);
        const logoWidth = logo.width * ratio;
        const logoHeight = logo.height * ratio;
        doc.addImage(logo, "PNG", pageWidth / 2 - logoWidth / 2, 20, logoWidth, logoHeight);
    } catch (e) {
        console.log("Logo no disponible");
    }

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(...colorPrimario);
    doc.text("ACTA DEL PARTIDO", pageWidth / 2, 120, { align: "center" });
    doc.setDrawColor(...colorPrimario);
    doc.setLineWidth(2);
    doc.line(pageWidth / 2 - 120, 127, pageWidth / 2 + 120, 127);

    // Info del partido
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...colorGris);
    doc.text(`Árbitro: ${partidoData.arbitro}`, pageWidth / 2, 145, { align: "center" });
    doc.text(`Hora de inicio: ${partidoData.hora}`, pageWidth / 2, 160, { align: "center" });

    // Marcador
    const yMarcador = 225;
    const anchoMarcador = 600;
    const altoMarcador = 80;
    const xInicioMarcador = pageWidth / 2 - anchoMarcador / 2;

    doc.setFillColor(...colorSecundario);
    doc.roundedRect(xInicioMarcador, yMarcador - 40, anchoMarcador, altoMarcador, 8, 8, 'F');

    // Escudos
    try {
        const escudoLocal = await loadImage(`/images/Escudos/${partidoData.equipoLocal}.png`);
        doc.addImage(escudoLocal, "PNG", xInicioMarcador + 25, yMarcador - 27, 55, 55);
    } catch (e) { }

    try {
        const escudoVisitante = await loadImage(`/images/Escudos/${partidoData.equipoVisitante}.png`);
        doc.addImage(escudoVisitante, "PNG", xInicioMarcador + anchoMarcador - 80, yMarcador - 27, 55, 55);
    } catch (e) { }

    // Nombres de equipos
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.text(partidoData.equipoLocal, xInicioMarcador + 95, yMarcador - 8);
    doc.text(partidoData.equipoVisitante, xInicioMarcador + anchoMarcador - 95, yMarcador - 8, { align: "right" });

    // Marcador central
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageWidth / 2 - 45, yMarcador + 2, 90, 30, 5, 5, 'F');
    doc.setFontSize(28);
    doc.setTextColor(...colorSecundario);
    doc.text(`${partidoData.golesLocal}  -  ${partidoData.golesVisitante}`, pageWidth / 2, yMarcador + 24, { align: "center" });

    // Tablas de jugadores
    const yTabla = yMarcador + 70;
    dibujarTabla(doc, "EQUIPO LOCAL", partidoData.jugadoresLocal, 40, yTabla, colorPrimario, colorSecundario, colorGris, colorGrisClaro);
    dibujarTabla(doc, "EQUIPO VISITANTE", partidoData.jugadoresVisitante, pageWidth - 400, yTabla, colorPrimario, colorSecundario, colorGris, colorGrisClaro);

    // Footer
    const yFooter = pageHeight - 30;
    doc.setFontSize(8);
    doc.setTextColor(...colorGris);
    doc.setFont("helvetica", "italic");
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Documento generado el ${fecha}\nFirmado: ${partidoData.arbitro}, Árbitro.`, pageWidth / 2, yFooter, { align: "center" });

    // Barra inferior
    doc.setFillColor(...colorPrimario);
    doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');

    // Abrir PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
}

function dibujarTabla(doc, titulo, jugadores, xInicio, yInicio, colorPrimario, colorSecundario, colorGris, colorGrisClaro) {
    let y = yInicio;

    // Título
    doc.setFillColor(...colorPrimario);
    doc.roundedRect(xInicio, y, 360, 30, 5, 5, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(titulo, xInicio + 180, y + 20, { align: "center" });

    y += 35;

    // Cabecera
    doc.setFillColor(...colorGrisClaro);
    doc.rect(xInicio, y, 360, 25, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colorSecundario);
    doc.text("JUGADOR", xInicio + 10, y + 17);
    doc.text("GOLES", xInicio + 240, y + 17, { align: "center" });
    doc.text("TA", xInicio + 290, y + 17, { align: "center" });
    doc.text("TR", xInicio + 330, y + 17, { align: "center" });

    y += 25;

    // Jugadores
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    jugadores.forEach((j, index) => {
        if (index % 2 === 0) {
            doc.setFillColor(248, 248, 250);
            doc.rect(xInicio, y, 360, 22, 'F');
        }

        doc.setTextColor(...colorSecundario);

        let nombreMostrar = j.nombre;
        if (doc.getTextWidth(nombreMostrar) > 220) {
            while (doc.getTextWidth(nombreMostrar + "...") > 220 && nombreMostrar.length > 0) {
                nombreMostrar = nombreMostrar.slice(0, -1);
            }
            nombreMostrar += "...";
        }
        doc.text(nombreMostrar, xInicio + 10, y + 15);

        // Goles
        if (j.goles && j.goles > 0) {
            doc.setFillColor(16, 204, 191);
            doc.circle(xInicio + 240, y + 10, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.text(String(j.goles), xInicio + 240, y + 14, { align: "center" });
            doc.setFont("helvetica", "normal");
        } else {
            doc.setTextColor(...colorGris);
            doc.text("-", xInicio + 240, y + 15, { align: "center" });
        }

        // Tarjetas amarillas
        if (j.amarillas && j.amarillas > 0) {
            doc.setFillColor(255, 193, 7);
            doc.roundedRect(xInicio + 282, y + 4, 16, 12, 2, 2, 'F');
            doc.setTextColor(...colorSecundario);
            doc.setFont("helvetica", "bold");
            doc.text(String(j.amarillas), xInicio + 290, y + 14, { align: "center" });
            doc.setFont("helvetica", "normal");
        } else {
            doc.setTextColor(...colorGris);
            doc.text("-", xInicio + 290, y + 15, { align: "center" });
        }

        // Tarjetas rojas
        if (j.rojas && j.rojas > 0) {
            doc.setFillColor(244, 67, 54);
            doc.roundedRect(xInicio + 322, y + 4, 16, 12, 2, 2, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.text(String(j.rojas), xInicio + 330, y + 14, { align: "center" });
            doc.setFont("helvetica", "normal");
        } else {
            doc.setTextColor(...colorGris);
            doc.text("-", xInicio + 330, y + 15, { align: "center" });
        }

        y += 22;
    });

    // Borde
    doc.setDrawColor(...colorGrisClaro);
    doc.setLineWidth(1);
    doc.roundedRect(xInicio, yInicio + 35, 360, y - yInicio - 35, 5, 5, 'S');
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    cargarClasificacion();
    inicializarNavbar();
    inicializarSelectorJornadas();
});