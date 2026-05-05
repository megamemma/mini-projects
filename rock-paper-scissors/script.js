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
playRound(getHumanChoice(), getComputerChoice());
playRound(getHumanChoice(), getComputerChoice());
playRound(getHumanChoice(), getComputerChoice());
playRound(getHumanChoice(), getComputerChoice());
playRound(getHumanChoice(), getComputerChoice()); 

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