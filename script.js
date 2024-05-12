// create a factory function to implement ONE instance of gameboard (not accessible to user)
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];

    let index = 0;
    // create 2D array to simulate ttt box
    for (let i = 0; i < rows; i++) {
        // create a row
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
            // create a column in each row
            gameBoard[i].push(Cell(index));
            index++;
        }
    }

    // update the board with chosen cell
    function updateBoard(token, row, col) {
        // check if square is empty
        for (let k = 0; k < rows; k++) {
            for (let h = 0; h < columns; h++) {
                // if empty, update with token
                if (!gameBoard[row][col].getContent()) {
                    gameBoard[row][col].updateContent(token);
                    return true
                } else {
                    // if found slot and is filled, return false
                    return false
                }
            }
        }
    }

    // return a getboard function to privatise gameBoard var
    const getBoard = () => gameBoard;
    
    return { getBoard, updateBoard }
}

function Cell(index) {
    let indexNo = index;
    let content = "";
    
    const getIndex = () => indexNo;
    const updateContent = (token) => content = token;
    const getContent = () => content;

    return {getIndex, updateContent, getContent}
}

function gameController(playerOneName = "You", playerTwoName = "Computer") {
    // create and get board
    const gameBoard = Gameboard();
    const board = gameBoard.getBoard();
    // const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    // const XTokenArr = [];
    // const OTokenArr = [];

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
    function playRound(row, col) {
        // if returned false, which means illegal move, do not switchPlayer
        // otherwise change turns
        if (gameBoard.updateBoard(currentPlayer.token, row, col)) {
            // after every move, check if someone won
            //if won, alert "won!"
            if (checkWins.call(this, currentPlayer.token, row, col)) {
                alert(`${currentPlayer.name} won!`)
                
            }

            // if no outcome, continue game
            switchPlayer()
        };
    }

    // win con
    return {playRound, board}
}



