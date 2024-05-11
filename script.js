// create a factory function to implement ONE instance of gameboard (not accessible to user)
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];

    // create 2D array to simulate ttt box
    for (let i = 0; i < rows; i++) {
    // create a row
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
            // create a column in each row
            gameBoard[i].push(" ");
        }
    }

    // update the board with chosen cell
    function updateBoard(token, row, col) {
        // check if square is empty
        for (let k = 0; k < rows; k++) {
            for (let h = 0; h < columns; h++) {
                // if empty, update with token
                if (gameBoard[row][col] === " ") {
                    gameBoard[row][col] = token;
                    return
                } else {
                    // if found slot and is filled, return 
                    return false
                }
            }
        }
    }

    // return a getboard function to privatise gameBoard var
    const getBoard = () => gameBoard;
    
    return { getBoard, updateBoard }
}

function gameController(playerOneName = "You", playerTwoName = "Computer") {
    // create the board
    const gameBoard = Gameboard();
    const board = gameBoard.getBoard();

    // create players
    const p1 = {name: playerOneName, token: "X"};
    const p2 = {name: playerTwoName, token: "O"};

    // initialise first player to go
    let currentPlayer = p1;

    // alternate between turns
    function switchPlayer() {
        currentPlayer = (currentPlayer === p1) ? p2 : p1;
    }

    // play a round
    function playRound() {
        // if returned false, which means illegal move, do not switchPlayer
        if (gameBoard.updateBoard("x", 1, 1)) switchPlayer();
    }

    // win con
    return { playRound }
}


