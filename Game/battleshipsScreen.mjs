import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../consts.mjs";
import { print } from "../utils/io.mjs";
import { translate } from "../utils/language.mjs";

const createBattleshipScreen = () => {
    // ... existing code ...

    return {
        isDrawn: false,
        next: null,
        transitionTo: null,

        init: function (firstPBoard, secondPBoard) {
            firstPlayerBoard = firstPBoard;
            secondPlayerBoard = secondPBoard;
        },

        draw: function (dr) {
            if (!this.isDrawn) {
                this.isDrawn = true;
                print(translate("battleshipGameMessage"));
            }
        }
    };
};

export default createBattleshipScreen;
