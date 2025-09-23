document.addEventListener("DOMContentLoaded", function () {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJpw5wkDDz9shxQhFgB-xafNUysY1QjgozLOrG9W_jlnhSSvXoGzl90BusJbqA31wf7MK0kPA2hHyQ/pub?gid=247176705&single=true&output=csv";
  const tableBody = document.querySelector("#tablaEstadisticas tbody");

  // Carga de CSV
  fetch(sheetUrl)
    .then(response => response.text())
    .then(data => {
      const rows = data.split("\n").slice(1); // quitamos cabecera
      rows.forEach((row, index) => {
        const cols = row.split(",");
        if (cols.length >= 10) {
          const tr = document.createElement("tr");

          if (index < 4) tr.classList.add("playoff");

          tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[0].trim()}));

          const tdNombre = document.createElement("td");
          const logoImg = document.createElement("img");
          const teamName = cols[1].trim();
          logoImg.src = `images/Escudos/${teamName}.png`;
          logoImg.alt = `${teamName} logo`;
          logoImg.style.height = "20px";
          logoImg.style.marginRight = "8px";
          logoImg.style.verticalAlign = "middle";
          tdNombre.appendChild(logoImg);
          tdNombre.appendChild(document.createTextNode(teamName));
          tr.appendChild(tdNombre);

          // Otros campos
          for (let i = 2; i <= 9; i++) {
            tr.appendChild(Object.assign(document.createElement("td"), {textContent: cols[i].trim()}));
          }

          tableBody.appendChild(tr);
        }
      });
    })
    .catch(error => console.error("Error cargando los datos:", error));

  // --- Script para desplegables de los equipos ---
  document.querySelectorAll('.equipo-card').forEach(card => {
    card.addEventListener('click', () => {
      const detalle = card.querySelector('.equipo-detalle');
      if (card.classList.contains('expanded')) {
        detalle.style.maxHeight = '0px';
        card.classList.remove('expanded');
      } else {
        card.classList.add('expanded');
        // Ajuste automático del max-height según contenido
        detalle.style.maxHeight = detalle.scrollHeight + 'px';
      }
    });
  });
});
