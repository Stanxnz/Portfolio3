import createMenu from "./menu.mjs";

class LanguageSelectionState{
    constructor(fsm){
    this.fsm = fsm;
    this.options = ['en', 'nl'];
    this.currentSelection = 0;
}

update(){
    if (KeyBoardManager.isUpPressed()) {
        this.currentSelection = (this.currentSelection - 1 + this.options.length) % this.options.length;
    } else if (KeyBoardManager.isDownPressed()) {
        this.currentSelection = (this.currentSelection + 1) % this.options.length;
    } else if (KeyBoardManager.isEnterPressed()) {
        this.fsm.language = this.options[this.currentSelection];
        this.fsm.transitionToMainMenu();
}
}

draw(){
    clearScreen();
    let output = "Select language:/n";
    this.options.forEach((lang, index)=>{
        if (index === this.currentSelection){
            output += `* ${lang.toUpperCase()} *\n`;
        } else {
            output += `  ${lang.toUpperCase()}  \n`;
        }
    });
    printCenterd(output);
}

}

export default LanguageSelectionState;