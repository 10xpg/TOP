// console.log("Hello World");

function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3);

  if (choice === 0) {
    return "rock";
  } else if (choice === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getHumanChoice() {
  let choice = prompt("Let's play Rock, Paper or Scissors: ");

  return choice.toLowerCase();
}

let humanScore = 0;
let computerScore = 0;

function playGame() {
  let humanSelection = getHumanChoice();
  let computerSelection = getComputerChoice();

  function playRound(humanSelection, computerSelection) {
    if (humanSelection === "paper" && computerSelection === "rock") {
      console.log("You win! Paper beats Rock");
      humanScore += 1;
    } else if (humanSelection === "scissors" && computerSelection === "paper") {
      console.log("You win! Scissors beats Paper");
      humanScore += 1;
    } else if (humanSelection === "rock" && computerSelection === "scissors") {
      console.log("You win! Rock beats Scissors");
      humanScore += 1;
    } else if (humanSelection === "rock" && computerSelection === "paper") {
      console.log("You lose! Paper beats Rock");
      computerScore += 1;
    } else if (humanSelection === "paper" && computerSelection === "scissors") {
      console.log("You lose! Scissors beats Paper");
      computerScore += 1;
    } else if (humanSelection === "scissors" && computerSelection === "rock") {
      console.log("You lose! Rock beats Scissors");
      computerScore += 1;
    } else {
      console.log("Tie!");
    }
  }

  playRound(humanSelection, computerSelection);

  console.log("You: ", humanScore);
  console.log("Pc: ", computerScore);
}

rounds = 6;
for (let i = 1; i < rounds; i++) {
  console.log(`Round ${i} `);
  playGame();
}

result = () => {
  if (humanScore > computerScore) {
    alert("You win! " + `You: ${humanScore} - Pc: ${computerScore}`);
  } else if (humanScore < computerScore) {
    alert("You lose! " + `You: ${humanScore} - Pc: ${computerScore}`);
  } else {
    alert("Tie! " + `You: ${humanScore} - Pc: ${computerScore}`);
  }
};
result();
