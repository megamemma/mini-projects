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