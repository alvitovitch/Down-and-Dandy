import { Character } from "./character";

class Player extends Character{
    constructor(characterObjectPath, name, posArr) {
        super(characterObjectPath, name, posArr)
        this.foundClues = [];
        this.unlockedLocations = [];
    }
}

export { Player }