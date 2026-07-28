// GET THE DATE 

const date = new Date();

const currentMonth = date.getMonth();
const currentDay = date.getDay();
const currentDate = date.getDate();
const currentYear = date.getFullYear();

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// SET THE CORRECT MONTH:
const title = document.getElementById("title");
title.innerHTML = MONTHS[currentMonth]; 

// UPDATE THE CALENDAR INFO:
const habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = function () {
    let habits = prompt(`What's your habit`, habitTitle.innerHTML);
    if(habits.length == 0) {
        habitTitle.innerHTML = `Click to set your habit`;
    } else {
        habitTitle.innerHTML = habits;
    }
}

const daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInThisMonth = daysInTheMonthList[currentMonth];

let daysCompleted = 0;
const totalDays = document.getElementById("totalDays");
totalDays.innerHTML = "0/" + daysInThisMonth;


// SET UP THE CALENDAR DAYS: 
let dayCount = 0;
let rowCount = 0;
const days = document.getElementsByClassName("days");

for (let i = 0; i < days.length; i++) {
    let day = days[rowCount].getElementsByClassName("day");
    for (var j=0; j < day.length; j++) {
        if(dayCount == currentDate - 1) {
            day[j].setAttribute("style", "background-color: rgb(251, 187, 187)")
            day[j].setAttribute("style", "border: 2px solid black");
        }

        if(dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount + 1));
            dayCount++;
        } else {
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color: white");
        }
    } 
    rowCount++;
}

// INITIALIZE COMPLETED ARRAY: 
let completed = new Array(31);
for (let i = 0; i < dayCount; i++) {
    let tempString = 
        "" + (currentMonth + 1) + "-" + (i+1) + "-" + currentYear;
        let tempDay = localStorage.getItem(tempString);
        if (tempDay == null || tempDay == "false" ) {
            localStorage.setItem(tempString, "false");
        } else if (tempDay == "true") {
            daysCompleted++ ;
        }
        totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}

// CHECK STORAGE AND UPDATE COMPLETED ARRAY:

for (let i = 0; i < currentDate; i++) {
    let tempstring = 
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;

        let chosenDay = localStorage.getItem(tempString);
        let chosenDayDiv = document.getElementById("day" + (i + 1));
        if (chosenDay === "true") {
            chosenDayDiv.style.backgroundColor = "pink";
        } else if (chosenDay === "false") {
            chosenDayDiv.style.backgroundColor = "white";
        }
}

// UPDATE COMPLETED ON CALENDAR:
const dayDivs = document.querySelectorAll(".day");
for (let i = 0; i < currentDate; i++ ){
    dayDivs[i].onclick = function (e) {
        let num = e.target.innerText;
        let selectedDate = document.getElementById(e.target.id);
        let storageString = 
            "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
        if (localStorage.getItem(storageString) === "false") {
            selectedDate.style.backgroundColor = "pink";
            localStorage.setItem(storageString, true);
            daysCompleted++ ;
        } else if (localStorage.getItem(storageString) === "true") {
            selectedDate.style.backgroundColor = "white";
            localStorage.setItem(storageString, false);
            daysCompleted-- ;
        }
        totalDays.innerHTML = daysCompleted + "/" + dayCount;
        if (daysCompleted === currentDate) {
            alert("Doing great.");
        }
    }
}

// RESET BUTTON:
const resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
    for (let i = 0; i < dayCount; i ++ ){
        let tempStrings = 
            "" + (currentMonth + 1) + "-" + (i+1) + "-" + currentYear;
        localStorage.setItem(tempStrings, "false");
        const curDay = document.getElementById("day" + (i+1));
        curDay.style.backgroundColor = "white";
    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}