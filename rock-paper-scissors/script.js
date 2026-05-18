// ==== state ====
let humanScore = 0;
let computerScore = 0;

// ==== DOM ==== 
const resultsDiv = document.getElementById("results");
const scoreDiv = document.getElementById("score");
const buttons = document.querySelectorAll("button");

// ==== logic (functions) ====
function getComputerChoice () {  
    let rand = Math.random();

    if (rand < 1/3) return "rock";
    if (rand < 2/3) return "paper";
    return "scissors"; 
}

function updateScore() {
    scoreDiv.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;
}

function endGame() {
    if (humanScore === 5) {
        resultsDiv.textContent = "Congratulations. You won the game!";
        disableButtons();
    } else if (computerScore === 5) {
        resultsDiv.textContent = "Game over. Computer won the game!";
        disableButtons();
    }
}

function disableButtons() {
    buttons.forEach(function(button) {
        button.disabled = true;
    });
}

//humanChoice is passed via events on click:
function playRound (humanChoice) {
        const computerChoice = getComputerChoice();

        //in case of a tie:
        if (humanChoice === computerChoice) {
            resultsDiv.textContent = `It's a tie! Both chose ${humanChoice}`;
            return;
        }

        if (humanChoice === "rock" && computerChoice === "scissors" ||
            humanChoice === "paper" && computerChoice === "rock" ||
            humanChoice === "scissors" && computerChoice === "paper"
        ) {
            humanScore ++;
            resultsDiv.textContent = `You win! ${humanChoice} beats ${computerChoice}`; 
        }

        else {
            computerScore++;
            resultsDiv.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
        }

        updateScore();
        endGame();
    }

// ==== events ==== 
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => playRound(btn.id));
});

// Instead of repeating next 3 lines, wrap in one action, using .forEach();
// document.getElementById("rock").addEventListener("click", () => playRound("rock"));
// document.getElementById("paper").addEventListener("click", () => playRound("paper"));
// document.getElementById("scissors").addEventListener("click", () => playRound("scissors"));