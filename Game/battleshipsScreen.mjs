import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../consts.mjs";
import { print, clearScreen } from "../utils/io.mjs";
import { translate } from "../utils/language.mjs";
import KeyBoardManager from "../utils/io.mjs";

const createBattleshipScreen = () => {
    let currentPlayer = FIRST_PLAYER;
    let firstPlayerBoard = null;
    let secondPlayerBoard = null;
    let currentBoard = null;
    let opponentBoard = null;
    let cursorRow = 0;
    let cursorColumn = 0;

    function swapPlayer() {
        currentPlayer *= -1;
        [currentBoard, opponentBoard] = currentPlayer === FIRST_PLAYER
            ? [firstPlayerBoard, secondPlayerBoard]
            : [secondPlayerBoard, firstPlayerBoard];
    }

    function checkWinCondition(board) {
        return board.ships.flat().every(cell => cell === 0 || cell === "X");
    }

    return {
        isDrawn: false,
        next: null,
        transitionTo: null,

        init: function (firstPBoard, secondPBoard) {
            firstPlayerBoard = firstPBoard;
            secondPlayerBoard = secondPBoard;
            currentBoard = firstPlayerBoard;
            opponentBoard = secondPlayerBoard;
        },

        update: function (dt) {
            if (KeyBoardManager.isUpPressed()) {
                cursorRow = Math.max(0, cursorRow - 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isDownPressed()) {
                cursorRow = Math.min(GAME_BOARD_DIM - 1, cursorRow + 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isLeftPressed()) {
                cursorColumn = Math.max(0, cursorColumn - 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isRightPressed()) {
                cursorColumn = Math.min(GAME_BOARD_DIM - 1, cursorColumn + 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isEnterPressed()) {
                this.fireAtPosition();
                this.isDrawn = false;
            }
        },

        fireAtPosition: function () {
            const targetCell = opponentBoard.ships[cursorRow][cursorColumn];
            if (targetCell === "X" || targetCell === "O") {
                return; 
            }
            if (targetCell === 0) {
                opponentBoard.ships[cursorRow][cursorColumn] = "O"; 
                print(translate("miss"));
            } else {
                opponentBoard.ships[cursorRow][cursorColumn] = "X"; 
                print(translate("hit"));
            }
            if (checkWinCondition(opponentBoard)) {
                this.transitionTo = "win";
                this.next = null;
                print(translate("winMessage"));
            } else {
                swapPlayer();
            }
        },

        draw: function () {
            if (this.isDrawn) return;
            this.isDrawn = true;

            clearScreen();
            print(translate("playerTurn") + ": " + (currentPlayer === FIRST_PLAYER ? "Player 1" : "Player 2") + "\n\n");

            let output = "  ";
            for (let i = 0; i < GAME_BOARD_DIM; i++) {
                output += " " + String.fromCharCode(65 + i);
            }
            output += '\n';

            for (let row = 0; row < GAME_BOARD_DIM; row++) {
                output += String(row + 1).padStart(2, ' ') + " ";
                for (let col = 0; col < GAME_BOARD_DIM; col++) {
                    if (row === cursorRow && col === cursorColumn) {
                        output += "[" + (opponentBoard.ships[row][col] || " ") + "] ";
                    } else {
                        output += " " + (opponentBoard.ships[row][col] || " ") + "  ";
                    }
                }
                output += " " + (row + 1) + "\n";
            }

            output += "  ";
            for (let i = 0; i < GAME_BOARD_DIM; i++) {
                output += " " + String.fromCharCode(65 + i);
            }
            output += "\n\n";
            output += translate("controls") + "\n";
            output += translate("controlsArrowKeys") + "\n";
            output += translate("controlsEnterFire") + "\n";

            print(output);
        }
    };
};

export default createBattleshipScreen;
