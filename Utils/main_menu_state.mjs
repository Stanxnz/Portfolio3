import createMenu from './utils/menu.mjs';

class MainMenuState {
    constructor(fsm) {
        this.fsm = fsm;
        this.menu = createMenu(this.buildMenu(), this.fsm.language);
    }

    enter() {
        this.menu.isDrawn = false;
    }

    buildMenu() {
        return [
            { text: 'startGame', id: 0, action: () => this.startGame() },
            { text: 'changeLanguage', id: 1, action: () => this.fsm.transitionToLanguageSelection() },
            { text: 'exitGame', id: 2, action: () => process.exit() }
        ];
    }

    update(dt) {
        this.menu.update(dt);
    }

    draw() {
        this.menu.draw();
    }

    startGame() {
        console.log("Starting game...");
    }
}

export default MainMenuState;
