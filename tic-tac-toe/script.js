/* 
1. Gameboard -> owns the board array. Only objects allowed to touch it.
2. Player -> a factory that makes simple player objects.
3. GameController -> owns the rules: turns, win-check, game state.
4. DisplayController -> the ONLY object allowed to touch the DOM.

GameBoard, GameController, DisplayController are each wrapped in an IIFE (Immediately Invoked Function Expression).
That's the "module pattern": only 1 gameboard needed, 1 game controller, 1 display controller. 
Build object once, return it immediately. Everything inside IIFE that isn't returned 
stays private -- invisible, untouchable from the outside. Thus keeping the global scope clean.
*/

const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""]; // 0-8, flat array of 9 items.

    const getBoard = () => board;

    // Tries placing a mark. True if worked, false if spot was taken (or index invalid) -- so the caller can react.
    const placeMark = (index, mark) => {
        if (index < 0 || index > 8 || board[index] !== "") {
            return false;
        }
        board[index] = mark;
        return true;
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    return { getBoard, placeMark, reset };
})();

// Each call returns a fresh, independent player object. (Since we need >1 players), it's a "factory" then.
const Player = (name, mark) => {
    return { name, mark };
};

// RULES of the game: whose turn, whether a move is legal, if smb won, or the board is full. Uses Gameboard to read/write the board, never touches DOM.
const GameController = (function () {
    let players = [];
    let activePlayerIndex = 0;
    let gameOver = false;
    let winner = null; // will hold the winning player object, or tie;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 6] // diagonals 
    ];

    const startGame = (nameX, name0) => {
        players = [Player(nameX || "Player X", "X"), Player(name0 || "Player 0", "0")];
        activePlayerIndex = 0;
        gameOver = false;
        winner = null;
        Gameboard.reset();
    };

    const getActivePlayer = () => players[activePlayerIndex];

    const switchTurn = () => {
        activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; //returns the winning mark, "x" or "0"
            }
        }
        return null;
    };

    const isBoardFull = () => Gameboard.getBoard().every((cell) => cell !== "");

    // Single entry point for making a move: returns a result object so who called it (console/DOM) "knows" what happened.
    const playRound = (index) => {
        if (gameOver) {
            return { success: false, reason: "Game is already over." };
        } 

        const currentPlayer = getActivePlayer();
        const placed = Gameboard.placeMark(index, currentPlayer.mark);

        if (!placed) {
            return {success: false, reason: "Cell already taken." };
        }

        const winningMark = checkWinner();

        if (winningMark) {
            gameOver = true;
            winner = currentPlayer;
            return { success: true, gameOver: true, winner: currentPlayer };
        }

        if (isBoardFull()) {
            gameOver = true;
            winner = "tie";
            return { success: true, gameOver: true, winner: "tie" };
        }

        switchTurn();
        return { success: true, gameOver: false, nextPlayer: getActivePlayer() };
    };
    const isGameOver = () => gameOver;
    const getWinner = () => winner;

    return {
        startGame,
        playRound,
        getActivePlayer,
        isGameOver,
        getWinner
    };
})();