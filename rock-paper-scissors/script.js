// ==== state ====
let humanScore = 0;
let computerScore = 0;

// ==== DOM ==== 
const resultsDiv = document.getElementById("results");
const scoreDiv = document.getElementById("score");
const buttons = document.querySelectorAll("button");
const ptsLeft = document.getElementById("pts-left");

// ==== logic (functions) ====
function getComputerChoice () {  
    let r = Math.random();

    if (r < 1/3) return "rock";
    if (r < 2/3) return "paper";
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

function updatePtsLeft() {
    ptsLeft.textContent = 5 - Math.max(humanScore, computerScore);
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
        updatePtsLeft();
    }

// ==== events ====
// pass the button value on click to playRound as human's choice

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => playRound(btn.id));
}); 