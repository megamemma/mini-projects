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
    return prompt("Pick rock, paper or scissors").toLowerCase();
}

function playGame() {
//keeping score for the computer and the user:
let humanScore = 0;
let computerScore = 0;

    function playRound (humanChoice, computerChoice) {
        //in case of a tie:
        if (humanChoice === computerChoice) {
            console.log(`It's a tie! Both chose ${humanChoice}`);
            return;
        }
        //in case of human winning:
        if (humanChoice === "rock" && computerChoice === "scissors" ||
            humanChoice === "paper" && computerChoice === "rock" ||
            humanChoice === "scissors" && computerChoice === "paper"
        ) {
            humanScore ++;
            console.log(`You win! ${humanChoice} beats ${computerChoice}`); 
        }
        //in case of computer winning, so, not a tie, not user's win:
        else {
            computerScore++;
            console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
        }
    }

// Playing 5 rounds "manually", before the loops in-depth knowledge:
const humanSelection1 = getHumanChoice();
const computerSelection1 = getComputerChoice();
playRound(humanSelection1, computerSelection1);

const humanSelection2 = getHumanChoice();
const computerSelection2 = getComputerChoice();
playRound(humanSelection2, computerSelection2);

const humanSelection3 = getHumanChoice();
const computerSelection3 = getComputerChoice();
playRound(humanSelection3, computerSelection3);

const humanSelection4 = getHumanChoice();
const computerSelection4 = getComputerChoice();
playRound(humanSelection4, computerSelection4);

const humanSelection5 = getHumanChoice();
const computerSelection5 = getComputerChoice();
playRound(humanSelection5, computerSelection5);

console.log("--- FINAL SCORE ---");
console.log(`Human: ${humanScore} | Computer: ${computerScore}`);

if (humanScore > computerScore) {
        console.log("Congrats! You are the overall winner!");
    } else if (humanScore < computerScore) {
        console.log("Game over! Computer wins the match.");
    } else {
        console.log("Overall result: It's a draw!");
    }

}

playGame();