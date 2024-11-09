import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen, printCenterd } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./consts.mjs";
import createMenu from "./Utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/innbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import FSM from "./Utils/fsm.mjs";

const MAIN_MENU_ITEMS = buildMenu();
const MIN_WIDTH = 80;
const MIN_HEIGHT = 24;
const GAME_FPS = 1000 / 60; 
const game = new FSM
let currentState = null;           
let currentLanguage = 'en';
let mainMenuScene = null;

function gameLoop(){
    game.update();
    game.draw();
    setTimeout(gameLoop, 1000/60);
}
gameLoop()

function checkResolution(){
    if (process.stdout.columns<MIN_WIDTH){
        console.log("Your screen width is too low to start the game. Please resize it.");
        return false;
    }else if (process.stdout.rows<MIN_HEIGHT){
        console.log("Your screen height is too low to start the game. Please resize it.");
        return false;
    }
    return true;
}

function t(key){
    return LANGUAGES[currentLanguage][key]||key;
}

function toggleLanguage(){
    currentLanguage = currentLanguage === 'en' ? 'nl' : 'en';
}

(function initialize() {
    if (!checkResolution()){
        console.log("Game cannot start because you have insufficient resolution.");
        return;
    }
    print(ANSI.HIDE_CURSOR);
    clearScreen();
    mainMenuScene = createMenu(MAIN_MENU_ITEMS);
    SplashScreen.next = mainMenuScene;
    currentState = SplashScreen  // This is where we decide what state our finite-state machine will start in. 
    gameLoop = setInterval(update, GAME_FPS); // The game is started.
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);
    if (currentState.transitionTo != null) {
        currentState = currentState.next;
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}



// Suport / Utility functions ---------------------------------------------------------------

function buildMenu() {
    let menuItemCount = 0;
    return [
        {
            text: t('startGame'), id: menuItemCount++, action: function () {
                clearScreen();
                let innbetween = createInnBetweenScreen();
                innbetween.init(t('shipPlacementPromt1'), () => {

                    let p1map = createMapLayoutScreen();
                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {


                        let innbetween = createInnBetweenScreen();
                        innbetween.init(t('shipPlacementPromt2'), () => {
                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                return createBattleshipScreen(player1ShipMap, player2ShipMap);
                            })
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
            text: t('changeLanguage'), id: menuItemCount++, action: function (){
                toggleLanguage();
                mainMenuScene = createMenu(buildMenu());
            }
        },
        { text: t('Exit Game'), id: menuItemCount++, action: function () { print(ANSI.SHOW_CURSOR); clearScreen(); process.exit(); } },
    ];
}


