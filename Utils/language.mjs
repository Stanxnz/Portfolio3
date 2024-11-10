const LANGUAGES = {
    en: {
        startGame: "Start Game",
        exitGame: "Exit Game",
        changeLanguage: "Change Language",
        resolutionError: "Your screen resolution is too low to start the game. Please resize your terminal window",
        shipPlacementPrompt1: "SHIP PLACEMENT\nFirst player get ready.\nPlayer two look away",
        shipPlacementPrompt2: "SHIP PLACEMENT\nSecond player get ready.\nPlayer one look away",
        battleshipGameMessage: "There should be a battleship game here",
        shipPlacementPhase: "Ship Placement Phase",
        controls: "Controls",
        controlsArrowKeys: "Arrow keys: Move cursor",
        controlsRotate: "R: Rotate ship",
        controlsEnter: "Enter: Place ship",
        shipsToPlace: "Ships to place",
        spaces: "spaces",
        shipCarrier: "Carrier",
        shipBattleship: "Battleship",
        shipCruiser: "Cruiser",
        shipSubmarine: "Submarine",
        shipDestroyer: "Destroyer",
        playerTurn: "Player Turn",
        hit: "Hit!",
        miss: "Miss!",
        winMessage: "Congratulations! You've won the game!",
        controlsEnterFire: "Enter: Fire at target"
    },
    nl: {
        startGame: "Start Spel",
        exitGame: "Afsluiten Spel",
        changeLanguage: "Wijzig Taal",
        resolutionError: "Uw schermresolutie is te laag om het spel te starten. Pas het vensterformaat aan",
        shipPlacementPrompt1: "SCHIPPLAATSING\nEerste speler, maak je klaar.\nSpeler twee kijk weg",
        shipPlacementPrompt2: "SCHIPPLAATSING\nTweede speler, maak je klaar.\nSpeler één kijk weg",
        battleshipGameMessage: "Hier zou een zeeslagspel moeten zijn",
        shipPlacementPhase: "Scheepsplaatsingsfase",
        controls: "Bediening",
        controlsArrowKeys: "Pijltjestoetsen: Verplaats cursor",
        controlsRotate: "R: Draai schip",
        controlsEnter: "Enter: Plaats schip",
        shipsToPlace: "Schepen om te plaatsen",
        spaces: "ruimtes",
        shipCarrier: "Vliegdekschip",
        shipBattleship: "Slagschip",
        shipCruiser: "Kruiser",
        shipSubmarine: "Onderzeeër",
        shipDestroyer: "Torpedobootjager",
        playerTurn: "Beurt Speler",
        hit: "Raak!",
        miss: "Mis!",
        winMessage: "Gefeliciteerd! Je hebt het spel gewonnen!",
        controlsEnterFire: "Enter: Vuur op doelwit"
    }
};

let selectedLanguage = 'en';

function setLanguage(language) {
    selectedLanguage = language;
}

function translate(key) {
    return LANGUAGES[selectedLanguage][key] || LANGUAGES['en'][key] || key;
}

export { setLanguage, translate };
