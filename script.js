// console.log("Hello World");

// gets the computer player value
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

// initializes scores

let humanScore = 0;
let computerScore = 0;

// whole game logic
function playGame() {
  // result board
  const res = document.querySelector(".results");
  const player = document.createElement("div");
  const computer = document.createElement("div");

  res.appendChild(player);
  res.appendChild(computer);

  //   logic per round
  function playRound(humanSelection, computerSelection) {
    if (humanSelection === computerSelection) {
      console.log("Tie!");
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
      if (humanSelection === "paper" && computerSelection === "rock") {
        console.log("You win! Paper beats Rock");
      } else if (
        humanSelection === "scissors" &&
        computerSelection === "paper"
      ) {
        console.log("You win! Scissors beats Paper");
      } else if (
        humanSelection === "rock" &&
        computerSelection === "scissors"
      ) {
        console.log("You win! Rock beats Scissors");
      }
      humanScore += 1;
    }

    if (humanScore === 5) {
      alert("Game Over\nYou Win!");
    } else {
      if (computerScore === 5) {
        alert("Game Over\nYou lose!");
      }
    }
    player.textContent = `Player: ${humanScore}`;
    computer.textContent = `Computer: ${computerScore}`;
  }

  //   play a round
  const rock = document.querySelector("#rock");
  rock.addEventListener("click", () => {
    const computerSelection = getComputerChoice();
    playRound("rock", computerSelection);
  });

  const paper = document.querySelector("#paper");
  paper.addEventListener("click", () => {
    const computerSelection = getComputerChoice();
    playRound("paper", computerSelection);
  });

  const scissors = document.querySelector("#scissors");
  scissors.addEventListener("click", () => {
    const computerSelection = getComputerChoice();
    playRound("scissors", computerSelection);
  });
}

playGame();
