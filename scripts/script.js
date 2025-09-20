document.addEventListener("DOMContentLoaded", function () {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJpw5wkDDz9shxQhFgB-xafNUysY1QjgozLOrG9W_jlnhSSvXoGzl90BusJbqA31wf7MK0kPA2hHyQ/pub?gid=247176705&single=true&output=csv";
  const tableBody = document.querySelector("#tablaEstadisticas tbody");

  fetch(sheetUrl)
    .then(response => response.text())
    .then(data => {
      const rows = data.split("\n").slice(1); // quitamos cabecera
      rows.forEach((row, index) => {
        const cols = row.split(","); // o split(",") según tu CSV
        if (cols.length >= 10) {
          const tr = document.createElement("tr");

          // Agregamos clase 'playoff' a las primeras 4 filas
          if (index < 4) {
            tr.classList.add("playoff");
          }

          // POS
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[0].trim()}));

          // NOMBRE + LOGO
          const tdNombre = document.createElement("td");

          const logoImg = document.createElement("img");
          const teamName = cols[1].trim();
          logoImg.src = `images/Escudos/${teamName}.png`; // ruta de la carpeta
          logoImg.alt = `${teamName} logo`;
          logoImg.style.height = "20px";
          logoImg.style.marginRight = "8px";
          logoImg.style.verticalAlign = "middle";

          tdNombre.appendChild(logoImg);
          tdNombre.appendChild(document.createTextNode(teamName));

          tr.appendChild(tdNombre);

          // PJ
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[2].trim()}));
          // PG
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[3].trim()}));
          // PE
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[4].trim()}));
          // PP
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[5].trim()}));
          // PTS
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[6].trim()}));
          // GF
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[7].trim()}));
          // GC
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[8].trim()}));
          // DG
          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[9].trim()}));

          tableBody.appendChild(tr);
        }
      });
    })
    .catch(error => console.error("Error cargando los datos:", error));
});
