function getComputerChoice () {  
    let randomNum = Math.random();

    if (randomNum < 1/3) {
        return "rock";
    } else if (randomNum < 2/3) {
        return "paper";
    } else {
        return "scissors";
    } 
}

function getHumanChoice () {
    let userChoice = prompt("Pick rock, paper or scissors");
    return userChoice.toLowerCase();
}

const computerChoice = getComputerChoice();
const humanChoice = getHumanChoice();

console.log(`Computer chose: ${computerChoice}, User chose: ${humanChoice}`);