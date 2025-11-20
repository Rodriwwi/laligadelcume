document.addEventListener("DOMContentLoaded", async () => {
    // --- URLs ---
    const urlGoleadoresCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJpw5wkDDz9shxQhFgB-xafNUysY1QjgozLOrG9W_jlnhSSvXoGzl90BusJbqA31wf7MK0kPA2hHyQ/pub?gid=526830534&single=true&output=csv";
    const urlClasificacionCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJpw5wkDDz9shxQhFgB-xafNUysY1QjgozLOrG9W_jlnhSSvXoGzl90BusJbqA31wf7MK0kPA2hHyQ/pub?gid=481132578&single=true&output=csv";
    const urlClasificacionTSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJpw5wkDDz9shxQhFgB-xafNUysY1QjgozLOrG9W_jlnhSSvXoGzl90BusJbqA31wf7MK0kPA2hHyQ/pub?gid=481132578&single=true&output=tsv";

    // --- Función para CSV ---
    async function getCSV(url) {
        const res = await fetch(url);
        const text = await res.text();
        const sep = text.includes(";") ? ";" : ",";
        return text.trim().split("\n").map(r => r.split(sep).map(c => c.trim().replace(/^"|"$/g, "")));
    }

    try {
        // ================= GOLEADORES =================
        const goleadoresRaw = await getCSV(urlGoleadoresCSV);

        const filasGoleadores = goleadoresRaw
            .filter(r => r.length >= 3 && r[0] && r[1] && r[2])
            .map(r => ({
                equipo: r[0],
                jugador: r[1],
                goles: parseInt(r[2]) || 0
            }))
            .sort((a, b) => b.goles - a.goles)
            .slice(0, 20);

        const tbodyG = document.querySelector("#tablaGoleadores tbody");
        tbodyG.innerHTML = "";
        filasGoleadores.forEach((d, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td class="equipo-cell">
                    <img class="equipo-logo" src="images/Escudos/${d.equipo}.png" alt="${d.equipo}"> ${d.equipo}
                </td>
                <td>${d.jugador}</td>
                <td>${d.goles}</td>
            `;
            tbodyG.appendChild(tr);
        });

        // ================= CLASIFICACIÓN PARA TABLAS =================
        const clasificacionRaw = await getCSV(urlClasificacionCSV);
        const equiposClas = clasificacionRaw.slice(1, 8).map(r => r[1]);
        const golesAFavor = clasificacionRaw.slice(1, 8).map(r => parseInt(r[7]) || 0);
        const golesEnContra = clasificacionRaw.slice(1, 8).map(r => parseInt(r[8]) || 0);

        // --- Equipos más goleadores ---
        const tbodyMas = document.querySelector("#tablaMasGoleadores tbody");
        tbodyMas.innerHTML = "";
        const masGoleadores = equiposClas.map((eq, i) => ({ equipo: eq, goles: golesAFavor[i] }))
            .sort((a, b) => b.goles - a.goles);
        masGoleadores.forEach((e, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td class="equipo-cell">
                    <img class="equipo-logo" src="images/Escudos/${e.equipo}.png" alt="${e.equipo}"> ${e.equipo}
                </td>
                <td>${e.goles}</td>
            `;
            tbodyMas.appendChild(tr);
        });

        // --- Equipos menos goleados ---
        const tbodyMenos = document.querySelector("#tablaMenosGoleados tbody");
        tbodyMenos.innerHTML = "";
        const menosGoleados = equiposClas.map((eq, i) => ({ equipo: eq, golesContra: golesEnContra[i] }))
            .sort((a, b) => a.golesContra - b.golesContra);
        menosGoleados.slice(0, 7).forEach((e, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td class="equipo-cell">
                    <img class="equipo-logo" src="images/Escudos/${e.equipo}.png" alt="${e.equipo}"> ${e.equipo}
                </td>
                <td>${e.golesContra}</td>
            `;
            tbodyMenos.appendChild(tr);
        });

        // ================= CLASIFICACIÓN 2º-8º =================
        const responseTSV = await fetch(urlClasificacionTSV);
        const textTSV = await responseTSV.text();
        const clasificacionTSV = textTSV.trim().split("\n").map(r => r.split("\t").map(c => c.trim()));
        const filas2a8 = clasificacionTSV.slice(2, 8);

        const listaClasificacion = document.getElementById("listaClasificacion");
        listaClasificacion.innerHTML = "";
        filas2a8.forEach((fila, i) => {
            const posicion = i + 2;
            const equipo = fila[1];
            const puntos = fila[2];
            if (equipo && puntos) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class="posicion">${posicion}</div>
                    <div class="equipo-info">
                        <img src="images/Escudos/${equipo}.png" alt="${equipo}"> ${equipo}
                    </div>
                    <div class="puntos">${puntos}</div>
                `;
                listaClasificacion.appendChild(li);
            }
        });

    } catch (err) {
        console.error("Error cargando datos:", err);
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (!menuToggle || !navLinks) return;

    // Evitar doble click con flag
    let isAnimating = false;

    function setExpanded(isOpen) {
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        if (isAnimating) return;
        isAnimating = true;

        navLinks.classList.toggle("show");
        const isOpen = navLinks.classList.contains("show");
        setExpanded(isOpen);

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    // Solo un evento (click es suficiente, funciona en móvil y escritorio)
    menuToggle.addEventListener("click", toggleMenu);

    // Cerrar menú cuando se hace click fuera
    document.addEventListener("click", function (event) {
        // Solo si la ventana es menor a 900px
        if (window.innerWidth <= 900) {
            const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
                setExpanded(false);
            }
        }
    });

    // Cerrar menú cuando se redimensiona a pantalla grande
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900 && navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
            setExpanded(false);
        }
    });

    // Cerrar menú cuando se hace click en un enlace (opcional pero útil)
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 900 && navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
                setExpanded(false);
            }
        });
    });
});