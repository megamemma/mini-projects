const grid = document.getElementById("calendar-grid");
const totalDays = 31;
const startOffset = 4; //May 1 2026 started on Friday
const today = 18;

let dragged = null;

for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "cell";
    grid.appendChild(empty);
}

for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (day < today) cell.classList.add("past");

    cell.innerHTML = `<div class="date">${day}</div>`;

    if (day === 19) {
        ["Max", "Vovka"].forEach(name => {
            const event = document.createElement("div");
            event.className = "event";
            event.textContent = name;
            event.draggable = true;

            event.addEventListener("click", () => {
                event.classList.toggle("done");
            });

            event.addEventListener("dragstart", () => {
                dragged = event;
            });

            cell.appendChild(event);
        });
    }

    cell.addEventListener("dragover", e => e.preventDefault());
    cell.addEventListener("drop", () => {
        if (dragged) cell.appendChild(dragged);
    });

    grid.appendChild(cell);
}