const grid = document.getElementById("calendar-grid");
let dragged = null;


// DATE:
const now = new Date();


const year = now.getFullYear();
const month = now.getMonth();
const today = now.getDate();

const totalDays = new Date(year, month + 1, 0).getDate();

let startOffset = new Date(year, month, 1).getDay() - 1;

// FIX SUNDAY:
if (startOffset < 0) {
    startOffset = 6;
} 

// MONTH TITLES:
const monthNames = [
  "January","February",
  "March","April", "May",
  "June","July","August",
  "September","October","November",
  "December"
];

document.querySelector("h1").textContent = `${monthNames[month]} ${year}`;

// SAVED COMPLETED LESSONS:
const savedDone = JSON.parse(localStorage.getItem("doneLessons")) || [];

// SCHEDULE:
const events = [
    {id: 1, name: "Max", days: [1, 8, 15, 26, 29], length: 60 },
    {id: 2, name: "Vova", days: [5, 12, 19, 26], length: 40 },
    {id: 3, name: "Asya", days: [5, 10, 11, 20, 25], length: 40 },
    {id: 4, name: "Maya", days: [14, 20], length: 60 },
    {id: 5, name: "Vika", days: [15, 20, 24, 28, 31], length: 60 },
    {id: 6, name: "Sasha", days: [6, 13, 20, 27], length: 60 },
    {id: 7, name: "Delya", days: [2, 15, 22, 29], length: 40},
    {id: 8, name: "Igor", days: [24, 31], length: 60},
    {id: 9, name: "Alexandra", days: [3, 10, 24], length: 60},
];

// RENDER EVENTS:
function renderDay(day, cell) {
    const dayEvents = events.filter(e => e.days.includes(day));

    dayEvents.forEach(e => {
            const el = document.createElement("div");

            el.className = "event";
            el.textContent = e.name;
            el.dataset.id = e.id;
            
            el.draggable = true;

            // UNIQUE STORAGE KEY:
            const lessonKey = `${day}-${e.id}`;

            // RESTORE SAVED DATE:
            if (savedDone.includes(lessonKey)) {
                el.classList.add("done");
            }

            // CLICK TO COMPLETE:
            el.addEventListener("click", () => {
                el.classList.toggle("done");
                if (el.classList.contains("done")){
                    if (!savedDone.includes(lessonKey)) {
                        savedDone.push(lessonKey);
                    }
                } else {
                    const index = savedDone.indexOf(lessonKey);

                    if (index > -1) {
                        savedDone.splice(index, 1);
                    }
                }

                localStorage.setItem (
                    "doneLessons",
                    JSON.stringify(savedDone)
                );
            });
            
            // DRAG:
            el.addEventListener("dragstart", () => {
                dragged = { el, id: e.id };
            });

            cell.appendChild(el);
    });
}

// EMPTY CELLS BEFORE MONTH START: 
for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "cell empty";
    grid.appendChild(empty);
}

// MAIN CALENDAR:
for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");

    cell.className = "cell";
    
    // PAST DAYS:
    if (day < today) {
        cell.classList.add("past"); 
    }

    // DATE:
    cell.innerHTML = `<div class="date">${day}</div>`;

    // EVENTS:
    renderDay(day, cell);

    // DRAG OVER:
    cell.addEventListener("dragover", e =>  {
        e.preventDefault()
    });

    // DROP:
    cell.addEventListener("drop", () => {
        if (dragged) {
            cell.appendChild(dragged.el);
        }
    });

    grid.appendChild(cell);
}
