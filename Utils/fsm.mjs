import MainMenuState from './main_menu_state.mjs';
import LanguageSelectionState from './language_selection_state.mjs';

class FSM {
    constructor() {
        this.language = 'en'; 
        this.currentState = new MainMenuState(this);
    }

    setState(state) {
        this.currentState = state;
        this.currentState.enter();
    }

    transitionToLanguageSelection() {
        this.setState(new LanguageSelectionState(this));
    }

    transitionToMainMenu() {
        this.setState(new MainMenuState(this));
    }

    update(dt) {
        this.currentState.update(dt);
    }

    draw() {
        this.currentState.draw();
    }
}

export default FSM;
