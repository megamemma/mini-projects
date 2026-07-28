// GET THE DATE 
const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const currentDate = date.getDate();


const MONTHS = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
// SET MONTH:
document.getElementById("title").textContent = MONTHS[currentMonth]; 

// EDIT HABIT TITLE NAME:
const habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = () => {
    const habit = prompt(`What's your habit`, habitTitle.textContent);
    habitTitle.textContent = habit && habit.trim() ? habit : "Click to set your habit";
};

const tracker = document.getElementById("tracker");
const totalDaysDisplay = document.getElementById("totalDays");

let daysCompleted = 0;
const storagePrefix = `habit_${currentYear}_${currentMonth}_`;

//GENERATE MONTH DAYS:
for (let i = 1; i <= daysInMonth; i++ ){
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = i;
    dayDiv.dataset.day = i;

    if (i === currentDate) {
        dayDiv.classList.add("today");
    }

    //CHECK localStorage state:
    const isCompleted = localStorage.getItem(storagePrefix + i) === "true";
    if (isCompleted) {
        dayDiv.classList.add("completed");
        daysCompleted++ ;
    }

    dayDiv.onclick = () => {
        if (i > currentDate) return;
        
        const key = storagePrefix + i;
        const currentStatus = localStorage.getItem(key) === "true";

        if (currentStatus) {
            localStorage.setItem(key, "false");
            dayDiv.classList.remove("completed");
            daysCompleted --;
        } else {
            localStorage.setItem(key, "true");
            dayDiv.classList.add("completed");
            daysCompleted++ ;
            if (daysCompleted === currentDate) alert("Doing great.");
        }
        updateCounter();
    };

    tracker.appendChild(dayDiv);
}

function updateCounter() {
    totalDaysDisplay.textContent = `${daysCompleted}/${daysInMonth}`;
}

//RESET BUTTON:
document.getElementById("resetButton").onclick = () => {
    for (let i = 1; i <= daysInMonth; i++) {
        localStorage.removeItem(storagePrefix + i);
    }
    document.querySelectorAll(".day").forEach(el => el.classList.remove("completed"));
    daysCompleted = 0;
    updateCounter();
};
