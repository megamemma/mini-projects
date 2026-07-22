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