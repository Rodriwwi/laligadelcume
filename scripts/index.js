console.log("🚀 1. Iniciando index.js...");

// ==========================================
// 1. CONFIGURACIÓN SUPABASE
// ==========================================
if (typeof supabase === 'undefined') {
    alert("ERROR CRÍTICO: La librería de Supabase no se ha cargado en el HTML.");
}

const { createClient } = supabase; 

// Tus claves
const SUPABASE_URL = 'https://omuhkqkjwoibsayyvuag.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tdWhrcWtqd29pYnNheXl2dWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NjE0NjMsImV4cCI6MjA4MDIzNzQ2M30.lZgweY5PS3UmF1zJ5ocUuHGmuoyTuVFF_9BS5xw2VXY';

const clienteSupabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log("✅ 2. Supabase configurado");

// Inicializamos jsPDF globalmente
window.jspdf = window.jspdf || {};

// ==========================================
// 2. DICCIONARIO DE ALIAS (Para nombres cortos)
// ==========================================
const ALIAS_EQUIPOS = {
    "RAYO MARIGUANO": "rayo",
    "UNIÓN DEPORTIVA PORRETA": "udp",
    "ATLÉTICO MORANTE": "morante",
    "CUM CITY": "city",
    "ASTON BIRRA": "aston",
    "I.E. SALA": "iesala",
    "CUM UNITED": "united"
};

function obtenerAlias(nombre) {
    // Si el nombre no está en la lista, quitamos espacios y cortamos a 10 letras
    return ALIAS_EQUIPOS[nombre] || nombre.toLowerCase().replace(/\s+/g, '').substring(0, 10);
}

// ==========================================
// 3. DATOS Y JORNADAS
// ==========================================
const CONFIG = {
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJpw5wkDDz9shxQhFgB-xafNUysY1QjgozLOrG9W_jlnhSSvXoGzl90BusJbqA31wf7MK0kPA2hHyQ/pub?gid=481132578&single=true&output=csv",
    JORNADA_ACTUAL: 5
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
            { local: "RAYO MARIGUANO", visitante: "UNIÓN DEPORTIVA PORRETA", resultado: "3 - 6", fecha: "16 OCT | 19:30h", lugar: "CAMPO FUTSAL CUME" },
            { local: "ASTON BIRRA", visitante: "I.E. SALA", resultado: "1 - 6", fecha: "20 OCT | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES" },
            { local: "ATLÉTICO MORANTE", visitante: "CUM CITY", resultado: "13 - 0", fecha: "21 OCT | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES" }
        ], "CUM UNITED", 1) 
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
            { local: "CUM UNITED", visitante: "UNIÓN DEPORTIVA PORRETA", resultado: "3 - 5", fecha: "24 NOV | 17:30h", lugar: "CIUDAD DEPORTIVA", esAplazado: true },
            { local: "I.E. SALA", visitante: "RAYO MARIGUANO", resultado: "10 - 1", fecha: "27 OCT | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES" },
            { local: "ATLÉTICO MORANTE", visitante: "ASTON BIRRA", resultado: "6 - 2", fecha: "04 NOV | 21:30h", lugar: "CIUDAD DEPORTIVA" }
        ], "CUM CITY", 2) 
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
            { local: "CUM CITY", visitante: "CUM UNITED", resultado: "3 - 13", fecha: "10 NOV | 19:00h", lugar: "PISTA SAN ANDRÉS" },
            { local: "UNIÓN DEPORTIVA PORRETA", visitante: "I.E. SALA", resultado: "6 - 3", fecha: "12 NOV | 21:30h", lugar: "CIUDAD DEPORTIVA", incidencias: "/documentos/j3/udp-iesala.pdf" },
            { local: "RAYO MARIGUANO", visitante: "ATLÉTICO MORANTE", resultado: "3 - 8", fecha: "18 NOV | 21:00h", lugar: "POLIDEPORTIVO DIÓCLES" }
        ], "ASTON BIRRA", 3) 
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
            { local: "CUM CITY", visitante: "ASTON BIRRA", resultado: "3 - 5", fecha: "25 NOV | 21:30h", lugar: "CIUDAD DEPORTIVA" },
            { local: "ATLÉTICO MORANTE", visitante: "UNIÓN DEPORTIVA PORRETA", resultado: "1 - 6", fecha: "26 NOV | 21:30h", lugar: "CIUDAD DEPORTIVA" }
        ], "RAYO MARIGUANO", 4) 
    },
    5: {
        fecha: "27 NOVIEMBRE - 07 DICIEMBRE",
        titulo: "JORNADA 5",
        banner: crearBannerPartidos([
            { local: "ASTON BIRRA", visitante: "CUM UNITED", colorLocal: "#3B9DB8", colorVisitante: "#EECEAF" },
            { local: "I.E. SALA", visitante: "ATLÉTICO MORANTE", colorLocal: "#3C4868", colorVisitante: "#BB284F"},
            { local: "CUM CITY", visitante: "RAYO MARIGUANO", colorLocal: "#c2ddf2", colorVisitante: "#036700" }
        ]),
        resultados: crearResultados([
            { local: "ASTON BIRRA", visitante: "CUM UNITED", resultado: "1 - 5", fecha: "03 DIC | 21:00h", lugar: "CIUDAD DEPORTIVA" },
            { local: "I.E. SALA", visitante: "ATLÉTICO MORANTE", resultado: "vs", fecha: "POR DEFINIR", esAplazado: true },
            { local: "CUM CITY", visitante: "RAYO MARIGUANO", resultado: "vs", fecha: "POR DEFINIR" }
        ], "UNIÓN DEPORTIVA PORRETA", 5) 
    }
};

// ==========================================
// 4. FUNCIONES DE RENDERIZADO (HTML)
// ==========================================
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

// AQUÍ GENERAMOS EL BOTÓN OCULTO CON EL ID CALCULADO
function crearResultados(partidos, arbitro, numJornada) {
    const partidosHTML = partidos.map(p => {
        
        // 1. Calculamos el ID automáticamente
        const aliasLocal = obtenerAlias(p.local);
        const aliasVisitante = obtenerAlias(p.visitante);
        const idCalculado = `j${numJornada}_${aliasLocal}_${aliasVisitante}`;

        // 2. Botón ACTA (Oculto por defecto: display:none)
        const botonActaHTML = `
            <button class="btn-acta btn-acta-auto" 
                    data-id="${idCalculado}" 
                    onclick="window.generarActaDesdeArchivo('${idCalculado}')"
                    style="display:none;">
                ACTA
            </button>
        `;

        const botonesHTML = [botonActaHTML];
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

function cargarClasificacion() {
    const tableBody = document.querySelector("#tablaEstadisticas tbody");
    if(!tableBody) return;

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
                            <img src="images/Escudos/${teamName}.png" alt="${teamName}" style="height: 20px; margin-right: 8px; vertical-align: middle;">
                            ${teamName}
                        </td>
                        ${cols.slice(2, 10).map(col => `<td>${col}</td>`).join('')}
                    `;
                    fragment.appendChild(tr);
                }
            });
            tableBody.appendChild(fragment);
        })
        .catch(err => {
            console.error(err);
        });
}

function inicializarNavbar() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    if(!menuToggle) return;
    menuToggle.addEventListener("click", (e) => {
        e?.preventDefault();
        const isOpen = navLinks.classList.toggle("show");
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

function inicializarSelectorJornadas() {
    const selector = document.getElementById("selector-jornada");
    const fecha = document.getElementById("fecha-jornada");
    const titulo = document.getElementById("titulo-jornada");
    const banner = document.getElementById("banner-partidos");
    const resultados = document.getElementById("resultados");
    if(!selector) return;

    const cargarJornada = (id) => {
        const j = jornadas[id];
        if(j) {
            fecha.textContent = j.fecha;
            titulo.textContent = j.titulo;
            banner.innerHTML = j.banner;
            resultados.innerHTML = j.resultados;
            
            // IMPORTANTE: Cada vez que cambiamos jornada, buscamos actas
            verificarActasDisponibles();
        }
    };
    cargarJornada(CONFIG.JORNADA_ACTUAL);
    selector.addEventListener("change", (e) => cargarJornada(e.target.value));
}

// ==========================================
// 5. DETECCIÓN DE ACTAS (NUEVO)
// ==========================================
async function verificarActasDisponibles() {
    console.log("🔵 Comprobando actas en la nube...");

    if (!clienteSupabase) return;

    // 1. Pedir lista de archivos
    const { data, error } = await clienteSupabase
        .storage
        .from('actas')
        .list('', { limit: 100 });

    if (error) {
        console.error("❌ Error leyendo Supabase:", error.message);
        return;
    }

    const archivosEnNube = data.map(f => f.name.toLowerCase()); // Normalizamos a minúsculas
    console.log("☁️ Archivos:", archivosEnNube);

    // 2. Buscar botones y activarlos si coincide
    const botones = document.querySelectorAll('.btn-acta-auto');
    let activados = 0;

    botones.forEach(btn => {
        const idBoton = btn.getAttribute('data-id'); 
        const nombreEsperado = `${idBoton}.xlsx`.toLowerCase();

        if (archivosEnNube.includes(nombreEsperado)) {
            console.log(`✅ Acta encontrada: ${idBoton}`);
            btn.style.display = 'inline-block';
            activados++;
        } else {
            btn.style.display = 'none';
        }
    });
    console.log(`🏁 ${activados} botones activados.`);
}

document.addEventListener("DOMContentLoaded", () => {
    cargarClasificacion();
    inicializarNavbar();
    inicializarSelectorJornadas();
});

// ==========================================
// 6. GENERACIÓN DE ACTAS (TU LÓGICA)
// ==========================================
window.generarActaDesdeArchivo = async function(actaId) {
    if (!clienteSupabase) { alert("Error de conexión."); return; }
    if (typeof XLSX === 'undefined' || typeof window.jspdf === 'undefined') {
        alert('Cargando librerías... espera un segundo.');
        return;
    }

    try {
        console.log('🔍 Descargando acta:', actaId);

        const { data } = clienteSupabase.storage.from('actas').getPublicUrl(`${actaId}.xlsx`);
        const response = await fetch(data.publicUrl);
        if (!response.ok) throw new Error('Acta no encontrada en la nube');

        const arrayBuffer = await response.arrayBuffer();
        if (arrayBuffer.byteLength < 500) throw new Error('Archivo corrupto.');

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
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

        await generarPDF(partidoData);

    } catch (error) {
        console.error(error);
        alert(`No se pudo abrir el acta.\nID: ${actaId}`);
    }
}

// ---------------------------------------------------------
// FUNCIONES DE DISEÑO ORIGINALES
// ---------------------------------------------------------
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

    // Colores
    const colorPrimario = [239, 51, 64];
    const colorSecundario = [33, 33, 33];
    const colorGris = [100, 100, 100];
    const colorGrisClaro = [240, 240, 240];

    // Fondo
    doc.setFillColor(250, 250, 252); doc.rect(0, 0, pageWidth, pageHeight, 'F');
    doc.setFillColor(...colorPrimario); doc.rect(0, 0, pageWidth, 8, 'F');

    // Logo
    try {
        const logo = await loadImage("images/logoLigaRojo.png");
        const ratio = Math.min(240 / logo.width, 170 / logo.height);
        doc.addImage(logo, "PNG", pageWidth / 2 - (logo.width*ratio)/2, 20, logo.width*ratio, logo.height*ratio);
    } catch (e) {}

    // Textos
    doc.setFont("helvetica", "bold"); doc.setFontSize(26); doc.setTextColor(...colorPrimario);
    doc.text("ACTA DEL PARTIDO", pageWidth / 2, 120, { align: "center" });
    doc.setDrawColor(...colorPrimario); doc.setLineWidth(2); doc.line(pageWidth / 2 - 120, 127, pageWidth / 2 + 120, 127);

    doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(...colorGris);
    doc.text(`Árbitro: ${partidoData.arbitro}`, pageWidth / 2, 145, { align: "center" });
    doc.text(`Hora de inicio: ${partidoData.hora}`, pageWidth / 2, 160, { align: "center" });

    // Marcador
    const yMarcador = 225;
    const anchoMarcador = 600;
    const xInicioMarcador = pageWidth / 2 - anchoMarcador / 2;

    doc.setFillColor(...colorSecundario);
    doc.roundedRect(xInicioMarcador, yMarcador - 40, anchoMarcador, 80, 8, 8, 'F');

    // Escudos
    try {
        const el = await loadImage(`images/Escudos/${partidoData.equipoLocal}.png`);
        doc.addImage(el, "PNG", xInicioMarcador + 25, yMarcador - 27, 55, 55);
    } catch (e) { }
    try {
        const ev = await loadImage(`images/Escudos/${partidoData.equipoVisitante}.png`);
        doc.addImage(ev, "PNG", xInicioMarcador + anchoMarcador - 80, yMarcador - 27, 55, 55);
    } catch (e) { }

    // Equipos
    doc.setFont("helvetica", "bold"); doc.setTextColor(255, 255, 255); doc.setFontSize(15);
    doc.text(partidoData.equipoLocal, xInicioMarcador + 95, yMarcador - 8);
    doc.text(partidoData.equipoVisitante, xInicioMarcador + anchoMarcador - 95, yMarcador - 8, { align: "right" });

    // Resultado
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageWidth / 2 - 45, yMarcador + 2, 90, 30, 5, 5, 'F');
    doc.setFontSize(28); doc.setTextColor(...colorSecundario);
    doc.text(`${partidoData.golesLocal}  -  ${partidoData.golesVisitante}`, pageWidth / 2, yMarcador + 24, { align: "center" });

    // Tablas
    const yTabla = yMarcador + 70;
    dibujarTabla(doc, "EQUIPO LOCAL", partidoData.jugadoresLocal, 40, yTabla, colorPrimario, colorSecundario, colorGris, colorGrisClaro);
    dibujarTabla(doc, "EQUIPO VISITANTE", partidoData.jugadoresVisitante, pageWidth - 400, yTabla, colorPrimario, colorSecundario, colorGris, colorGrisClaro);

    // Footer
    const yFooter = pageHeight - 30;
    doc.setFontSize(8); doc.setTextColor(...colorGris); doc.setFont("helvetica", "italic");
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Documento generado el ${fecha}\nFirmado: ${partidoData.arbitro}, Árbitro.`, pageWidth / 2, yFooter, { align: "center" });
    
    // Barra
    doc.setFillColor(...colorPrimario); doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');

    // Abrir
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
}

function dibujarTabla(doc, titulo, jugadores, xInicio, yInicio, colorPrimario, colorSecundario, colorGris, colorGrisClaro) {
    let y = yInicio;
    doc.setFillColor(...colorPrimario); doc.roundedRect(xInicio, y, 360, 30, 5, 5, 'F');
    doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.setTextColor(255, 255, 255);
    doc.text(titulo, xInicio + 180, y + 20, { align: "center" });
    y += 35;

    doc.setFillColor(...colorGrisClaro); doc.rect(xInicio, y, 360, 25, 'F');
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...colorSecundario);
    doc.text("JUGADOR", xInicio + 10, y + 17);
    doc.text("GOLES", xInicio + 240, y + 17, { align: "center" });
    doc.text("TA", xInicio + 290, y + 17, { align: "center" });
    doc.text("TR", xInicio + 330, y + 17, { align: "center" });
    y += 25;

    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    jugadores.forEach((j, index) => {
        if (index % 2 === 0) { doc.setFillColor(248, 248, 250); doc.rect(xInicio, y, 360, 22, 'F'); }
        doc.setTextColor(...colorSecundario);
        
        let nombreMostrar = j.nombre;
        if (doc.getTextWidth(nombreMostrar) > 220) {
            while (doc.getTextWidth(nombreMostrar + "...") > 220 && nombreMostrar.length > 0) nombreMostrar = nombreMostrar.slice(0, -1);
            nombreMostrar += "...";
        }
        doc.text(nombreMostrar, xInicio + 10, y + 15);

        if (j.goles > 0) {
            doc.setFillColor(16, 204, 191); doc.circle(xInicio + 240, y + 10, 8, 'F');
            doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold");
            doc.text(String(j.goles), xInicio + 240, y + 14, { align: "center" });
            doc.setFont("helvetica", "normal");
        } else { doc.setTextColor(...colorGris); doc.text("-", xInicio + 240, y + 15, { align: "center" }); }

        if (j.amarillas > 0) {
            doc.setFillColor(255, 193, 7); doc.roundedRect(xInicio + 282, y + 4, 16, 12, 2, 2, 'F');
            doc.setTextColor(...colorSecundario); doc.setFont("helvetica", "bold");
            doc.text(String(j.amarillas), xInicio + 290, y + 14, { align: "center" });
            doc.setFont("helvetica", "normal");
        } else { doc.setTextColor(...colorGris); doc.text("-", xInicio + 290, y + 15, { align: "center" }); }

        if (j.rojas > 0) {
            doc.setFillColor(244, 67, 54); doc.roundedRect(xInicio + 322, y + 4, 16, 12, 2, 2, 'F');
            doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold");
            doc.text(String(j.rojas), xInicio + 330, y + 14, { align: "center" });
            doc.setFont("helvetica", "normal");
        } else { doc.setTextColor(...colorGris); doc.text("-", xInicio + 330, y + 15, { align: "center" }); }
        y += 22;
    });
    doc.setDrawColor(...colorGrisClaro); doc.setLineWidth(1);
    doc.roundedRect(xInicio, yInicio + 35, 360, y - yInicio - 35, 5, 5, 'S');
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src;
    });
}