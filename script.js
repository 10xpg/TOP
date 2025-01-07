// Factory for squares on the grid
const Cell = function () {
  let value = "";

  const getValue = () => value;

  const addMarker = (playerMarker) => {
    value = playerMarker;
  };

  return { getValue, addMarker };
};

// Factory for the board
const GameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const grid = [];

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      grid[i].push(Cell());
    }
  }

  const getBoard = () => grid;

  const placeMarker = (row, column, player) => {
    if (getBoard()[row][column].getValue() !== "") {
      console.log("Invalid move! Place your marker in an empty spot!");
      return `That players turn`;
    }
    getBoard()[row][column].addMarker(player);
    console.log(`${player}'s marker placed at (${row}, ${column})`);
  };

  const printGameBoard = () => {
    const gameDisplay = grid.map((row) => row.map((cell) => cell.getValue()));
    console.log(gameDisplay);
  };

  return { getBoard, placeMarker, printGameBoard };
})();

// Factory for creating players
const Player = (function () {
  let playerNames = ["Player One", "Player Two"];
  let playerMarkers = ["X", "O"];
  const players = [];

  const createPlayers = () => {
    for (let i = 0; i < playerNames.length; i++) {
      players.push({
        playerName: playerNames[i],
        playerMarker: playerMarkers[i],
      });
    }
  };

  const getPlayers = () => players;

  return { playerNames, createPlayers, getPlayers };
})();

// Object to control game flow
const GameController = function () {
  const gameBoard = GameBoard;

  const players = Player;
  players.createPlayers();

  let activePlayer = players.getPlayers()[0];

  const switchPlayerTurn = () => {
    if (activePlayer === players.getPlayers()[0]) {
      activePlayer = players.getPlayers()[1];
    } else {
      activePlayer = players.getPlayers()[0];
    }
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameBoard.printGameBoard();
    console.log(`${getActivePlayer().playerName}'s turn.`);
  };

  const playRound = (row, column) => {
    gameBoard.placeMarker(row, column, getActivePlayer().playerMarker);

    // Add check win implementation here

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer };
};

const game = GameController();
