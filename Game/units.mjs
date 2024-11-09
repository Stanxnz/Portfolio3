import { translate } from "../utils/language.mjs";

const units = {
    carrier: { size: 5, id: () => translate("shipCarrier"), symbole: "O" },
    battleship: { size: 4, id: () => translate("shipBattleship"), symbole: "K" },
    cruiser: { size: 3, id: () => translate("shipCruiser"), symbole: "T" },
    submarine: { size: 3, id: () => translate("shipSubmarine"), symbole: "X" },
    destroyer: { size: 2, id: () => translate("shipDestroyer"), symbole: "Q" }
};

export default units;
