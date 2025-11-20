// --- Navbar responsive toggle ---
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    // Helper to toggle aria-expanded
    function setExpanded(isOpen) {
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    // Toggle function
    function toggleMenu(e) {
        if (e) e.preventDefault();
        navLinks.classList.toggle("show");
        const isOpen = navLinks.classList.contains("show");
        setExpanded(isOpen);
    }

    // Add both events
    menuToggle.addEventListener("click", toggleMenu);
    menuToggle.addEventListener("touchstart", toggleMenu);

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
            setExpanded(false);
        }
    }, { passive: true });

    // Cerrar menú cuando se redimensiona la ventana a pantalla grande
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900 && navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
            setExpanded(false);
        }
    });
});

const calendarEl = document.getElementById('calendar');
const monthYearEl = document.getElementById('monthYear');
const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Jornadas
const jornadas = [
    {
        start: '2025-10-14', end: '2025-10-24', label: 'J1',
        matches: [
            { local: { name: 'RAYO MARIGUANO', logo: 'images/Escudos/RAYO MARIGUANO.png' }, visitante: { name: 'UDP', logo: 'images/Escudos/UNIÓN DEPORTIVA PORRETA.png' } },
            { local: { name: 'ATLÉTICO MORANTE', logo: 'images/Escudos/ATLÉTICO MORANTE.png' }, visitante: { name: 'CUM CITY', logo: 'images/Escudos/CUM CITY.png' } },
            { local: { name: 'ASTON BIRRA', logo: 'images/Escudos/ASTON BIRRA.png' }, visitante: { name: 'I.E SALA', logo: 'images/Escudos/I.E. SALA.png' } },
        ]
    },
    {
        start: '2025-10-25', end: '2025-11-04', label: 'J2',
        matches: [
            { local: { name: 'CUM UNITED', logo: 'images/Escudos/CUM UNITED.png' }, visitante: { name: 'UDP', logo: 'images/Escudos/UNIÓN DEPORTIVA PORRETA.png' } },
            { local: { name: 'I.E SALA', logo: 'images/Escudos/I.E. SALA.png' }, visitante: { name: 'RAYO MARIGUANO', logo: 'images/Escudos/RAYO MARIGUANO.png' } },
            { local: { name: 'ATLÉTICO MORANTE', logo: 'images/Escudos/ATLÉTICO MORANTE.png' }, visitante: { name: 'ASTON BIRRA', logo: 'images/Escudos/ASTON BIRRA.png' } },
        ]
    },
    {
        start: '2025-11-05', end: '2025-11-15', label: 'J3',
        matches: [
            { local: { name: 'CUM CITY', logo: 'images/Escudos/CUM CITY.png' }, visitante: { name: 'CUM UNITED', logo: 'images/Escudos/CUM UNITED.png' } },
            { local: { name: 'UDP', logo: 'images/Escudos/UNIÓN DEPORTIVA PORRETA.png' }, visitante: { name: 'I.E SALA', logo: 'images/Escudos/I.E. SALA.png' } },
            { local: { name: 'RAYO MARIGUANO', logo: 'images/Escudos/RAYO MARIGUANO.png' }, visitante: { name: 'ATLÉTICO MORANTE', logo: 'images/Escudos/ATLÉTICO MORANTE.png' } },
        ]
    },
    {
        start: '2025-11-16', end: '2025-11-26', label: 'J4',
        matches: [
            { local: { name: 'CUM UNITED', logo: 'images/Escudos/CUM UNITED.png' }, visitante: { name: 'I.E SALA', logo: 'images/Escudos/I.E. SALA.png' } },
            { local: { name: 'CUM CITY', logo: 'images/Escudos/CUM CITY.png' }, visitante: { name: 'ASTON BIRRA', logo: 'images/Escudos/ASTON BIRRA.png' } },
            { local: { name: 'UDP', logo: 'images/Escudos/UNIÓN DEPORTIVA PORRETA.png' }, visitante: { name: 'ATLÉTICO MORANTE', logo: 'images/Escudos/ATLÉTICO MORANTE.png' } },
        ]
    },
    {
        start: '2025-11-27', end: '2025-12-07', label: 'J5',
        matches: [
            { local: { name: 'ASTON BIRRA', logo: 'images/Escudos/ASTON BIRRA.png' }, visitante: { name: 'CUM UNITED', logo: 'images/Escudos/CUM UNITED.png' } },
            { local: { name: 'I.E SALA', logo: 'images/Escudos/I.E. SALA.png' }, visitante: { name: 'ATLÉTICO MORANTE', logo: 'images/Escudos/ATLÉTICO MORANTE.png' } },
            { local: { name: 'CUM CITY', logo: 'images/Escudos/UNIÓN DEPORTIVA PORRETA.png' }, visitante: { name: 'RAYO MARIGUANO', logo: 'images/Escudos/RAYO MARIGUANO.png' } },
        ]
    },
    {
        start: '2025-12-08', end: '2025-12-19', label: 'J6',
        matches: [
            { local: { name: 'CUM UNITED', logo: 'images/Escudos/CUM UNITED.png' }, visitante: { name: 'ATLÉTICO MORANTE', logo: 'images/Escudos/ATLÉTICO MORANTE.png' } },
            { local: { name: 'RAYO MARIGUANO', logo: 'images/Escudos/RAYO MARIGUANO.png' }, visitante: { name: 'ASTON BIRRA', logo: 'images/Escudos/ASTON BIRRA.png' } },
            { local: { name: 'UDP', logo: 'images/Escudos/UNIÓN DEPORTIVA PORRETA.png' }, visitante: { name: 'CUM CITY', logo: 'images/Escudos/CUM CITY.png' } },
        ]
    },
    // Fin primera vuelta.
];

const monthNames = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

function renderCalendar(month, year) {
    calendarEl.innerHTML = '';
    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    dayNames.forEach(day => {
        const el = document.createElement('div');
        el.classList.add('day-header');
        el.textContent = day;
        calendarEl.appendChild(el);
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = (firstDay.getDay() + 6) % 7;
    const totalDays = lastDay.getDate();

    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyEl = document.createElement('div');
        emptyEl.classList.add('day', 'empty');
        calendarEl.appendChild(emptyEl);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        dayEl.textContent = day;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayEl.classList.add('today');
        }

        jornadas.forEach(j => {
            const start = new Date(j.start);
            const end = new Date(j.end);
            const current = new Date(dateStr);
            if (current >= start && current <= end) {
                const tag = document.createElement('div');
                tag.classList.add('jornada');
                tag.textContent = j.label;
                dayEl.appendChild(tag);
                dayEl.addEventListener('click', () => openModal(j));
            }
        });

        calendarEl.appendChild(dayEl);
    }
}

// Navegación de meses
document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Modal de jornadas
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const matchesContainer = document.getElementById('matchesContainer');

function openModal(jornada) {
    modalTitle.textContent = jornada.label;
    matchesContainer.innerHTML = '';
    jornada.matches.forEach(m => {
        const div = document.createElement('div');
        div.classList.add('match');
        div.innerHTML = `
                    <div><img src="${m.local.logo}" alt="${m.local.name}"> ${m.local.name}</div>
                    <div>-</div>
                    <div>${m.visitante.name} <img src="${m.visitante.logo}" alt="${m.visitante.name}"></div>
                `;
        matchesContainer.appendChild(div);
    });
    modal.style.display = 'flex';
}

closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

renderCalendar(currentMonth, currentYear);