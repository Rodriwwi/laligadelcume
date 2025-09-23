document.addEventListener("DOMContentLoaded", async () => {
    const plantillaPath = "excels/plantilla_Acta.xlsx";
    const equiposPath = "excels/equipos_actas.xlsx";

    let equiposData = {};

    // --- Cargar datos de los equipos ---
    try {
        const responseEquipos = await fetch(equiposPath);
        const arrayBufferEquipos = await responseEquipos.arrayBuffer();
        const workbookEquipos = XLSX.read(arrayBufferEquipos, { type: "array" });

        // Guardamos datos de cada equipo
        workbookEquipos.SheetNames.forEach(sheetName => {
            const sheet = workbookEquipos.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });
            equiposData[sheetName] = data;
        });
    } catch (err) {
        console.error("Error cargando equipos:", err);
        alert("No se pudo cargar el archivo de equipos. Revisa la ruta y el servidor.");
        return;
    }

    // --- Cargar plantilla ---
    let workbookPlantilla;
    try {
        const responsePlantilla = await fetch(plantillaPath);
        const arrayBufferPlantilla = await responsePlantilla.arrayBuffer();
        workbookPlantilla = XLSX.read(arrayBufferPlantilla, { type: "array" });
    } catch (err) {
        console.error("Error cargando plantilla:", err);
        alert("No se pudo cargar la plantilla. Revisa la ruta y el servidor.");
        return;
    }

    // --- Llenar selects ---
    const selectLocal = document.getElementById("equipoLocal");
    const selectVisitante = document.getElementById("equipoVisitante");
    selectLocal.innerHTML = '<option value="">Selecciona un equipo</option>';
    selectVisitante.innerHTML = '<option value="">Selecciona un equipo</option>';

    Object.keys(equiposData).forEach(team => {
        const optionLocal = document.createElement("option");
        optionLocal.value = team;
        optionLocal.textContent = team;
        selectLocal.appendChild(optionLocal);

        const optionVisitante = document.createElement("option");
        optionVisitante.value = team;
        optionVisitante.textContent = team;
        selectVisitante.appendChild(optionVisitante);
    });

    // --- Generar Acta ---
    document.getElementById("generarActa").addEventListener("click", () => {
        const equipoLocal = selectLocal.value;
        const equipoVisitante = selectVisitante.value;
        const arbitro = document.getElementById("arbitro").value;
        const hora = document.getElementById("hora").value;

        if (!equipoLocal || !equipoVisitante) {
            alert("Selecciona ambos equipos.");
            return;
        }

        const actaSheet = XLSX.utils.sheet_to_json(workbookPlantilla.Sheets["ACTA"], { header: 1, raw: false, defval: "" });

        // --- Rellenar celdas de texto ---
        actaSheet[1][2] = equipoLocal;       // C2:H2
        actaSheet[2][2] = equipoVisitante;   // C3:H3
        actaSheet[2][12] = arbitro;          // M3:S3
        actaSheet[2][19] = hora;             // T3:V4

        // --- Jugadores locales ---
        const jugadoresLocal = equiposData[equipoLocal].slice(4, 15); // A5:B15
        jugadoresLocal.forEach((row, idx) => {
            actaSheet[6 + idx][0] = row[0];  // Foto A7:A21
            actaSheet[6 + idx][1] = row[1];  // Nombre B7:C21 (duplicamos)
            actaSheet[6 + idx][2] = row[1];
        });

        // --- Jugadores visitantes ---
        const jugadoresVisitante = equiposData[equipoVisitante].slice(4, 15);
        jugadoresVisitante.forEach((row, idx) => {
            actaSheet[6 + idx][11] = row[0];  // Foto L7:L21
            actaSheet[6 + idx][12] = row[1];  // Nombres M7:Q21 (duplicamos)
            actaSheet[6 + idx][13] = row[1];
            actaSheet[6 + idx][14] = row[1];
            actaSheet[6 + idx][15] = row[1];
            actaSheet[6 + idx][16] = row[1];
        });

        // --- Escudos ---
        actaSheet[21][4] = equiposData[equipoLocal][0][0];       // E22:G23
        actaSheet[21][20] = equiposData[equipoVisitante][0][0];  // U22:V23

        // --- Convertimos de nuevo a sheet y workbook ---
        const newSheet = XLSX.utils.aoa_to_sheet(actaSheet);
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, "ACTA");

        // --- Descargar archivo ---
        XLSX.writeFile(newWorkbook, `Acta_${equipoLocal}_vs_${equipoVisitante}.xlsx`);
    });
});
