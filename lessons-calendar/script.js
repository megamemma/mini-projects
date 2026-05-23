const grid = document.getElementById("calendar-grid");
const totalDays = 31;
const startOffset = 4; //May 1 2026 started on Friday
const today = 24; 

let dragged = null;

// DATA
const events = [
    {id: 1, name: "Max", days: [1, 8, 15, 26], length: 60 },
    {id: 2, name: "Vova", days: [5, 12, 19, 26], length: 40 },
    {id: 3, name: "Asya", days: [5, 10, 11, 20, 25], length: 40 },
    {id: 4, name: "Maya", days: [14, 20, 27], length: 60 },
    {id: 5, name: "Vika", days: [15, 20, 24, 28, 31], length: 60 },
    {id: 6, name: "Sasha", days: [6, 13, 20, 27], length: 60 },
    {id: 7, name: "Delya", days: [2, 15, 22, 29], length: 40},
    {id: 8, name: "Igor", days: [24, 31], length: 60},
    {id: 9, name: "Alexandra", days: [3, 10, 24], length: 60},
];

// RENDER EVENTS FOR ONE DAY:
function renderDay(day, cell) {
    const dayEvents = events.filter(e => e.days.includes(day));

    dayEvents.forEach(e => {
            const el = document.createElement("div");
            el.className = "event";
            el.textContent = e.name;
            el.dataset.id = e.id;
            el.draggable = true;

            el.addEventListener("click", () => {
                el.classList.toggle("done");
            });

            el.addEventListener("dragstart", () => {
                dragged = { el, id: e.id };
            });

        cell.appendChild(el);
    });
}

// EMPTY OFFSET:
for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "cell";
    grid.appendChild(empty);
}

// MAIN GRID:
for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (day < today) cell.classList.add("past");

    cell.innerHTML = `<div class="date">${day}</div>`;

    renderDay(day, cell);

    cell.addEventListener("dragover", e => e.preventDefault());

    cell.addEventListener("drop", () => {
        if (dragged) cell.appendChild(dragged.el);
    });

    grid.appendChild(cell);
}
