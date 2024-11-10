import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./consts.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/innbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import { setLanguage, translate } from "./utils/language.mjs";

const MAIN_MENU_ITEMS = buildMenu();
const MIN_WIDTH = 80;
const MIN_HEIGHT = 24;
const GAME_FPS = 1000 / 60;
let currentState = null;   
let gameLoop = null;       

let mainMenuScene = null;

function checkResolution() {
    if (process.stdout.columns < MIN_WIDTH) {
        console.log(translate("resolutionError"));
        return false; 
    } else if (process.stdout.rows < MIN_HEIGHT) {
        console.log(translate("resolutionError"));
        return false; 
    }
    return true; 
}


(function initialize() {
    if (!checkResolution()) {
        console.log("Game cannot start because your resolution is too low.");
        return; 
    }

})();


(function initialize() {
    print(ANSI.HIDE_CURSOR);
    clearScreen();
    mainMenuScene = createMenu(MAIN_MENU_ITEMS);
    SplashScreen.next = mainMenuScene;
    currentState = SplashScreen  
    gameLoop = setInterval(update, GAME_FPS); 
    setLanguage('en');
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);
    if (currentState.transitionTo != null) {
        currentState = currentState.next;
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}

function promptForLanguageChange() {
    clearScreen();
    console.log("Select a language:");
    console.log("1. English");
    console.log("2. Dutch");

    process.stdin.once('data', (input) => {
        const choice = input.toString().trim();
        
        if (choice === '1') {
            setLanguage('en');
        } else if (choice === '2') {
            setLanguage('nl');
        } else {
            console.log("Invalid choice. Defaulting to English.");
            setLanguage('en');
        }

        mainMenuScene = createMenu(buildMenu());
        currentState = mainMenuScene;
    });
}


function buildMenu() {
    let menuItemCount = 0;
    return [
        {
            text: translate("startGame"), 
            id: menuItemCount++,
            action: function () {
                clearScreen();
                let innbetween = createInnBetweenScreen();
                innbetween.init(translate("shipPlacementPrompt1"), () => {

                    let p1map = createMapLayoutScreen();
                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {

                        let innbetween = createInnBetweenScreen();
                        innbetween.init(translate("shipPlacementPrompt2"), () => {
                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                return createBattleshipScreen(player1ShipMap, player2ShipMap);
                            });
                            return p2map;
                        });
                        return innbetween;
                    });

                    return p1map;
                }, 3);
                currentState.next = innbetween;
                currentState.transitionTo = "Map layout";
            }
        },
        {
            text: translate("changeLanguage"), 
            id: menuItemCount++,
            action: function () {
                promptForLanguageChange();
            }
        },
        {
            text: translate("exitGame"), 
            id: menuItemCount++,
            action: function () {
                print(ANSI.SHOW_CURSOR);
                clearScreen();
                process.exit();
            }
        },
    ];
}


