import { Character } from "./character";

class NPC extends Character {
    constructor(characterObjectPath, name, posArr, destinationArr, messageArr) {
        super(characterObjectPath, name, posArr)
        this.messageArr = messageArr
        this.destinationArr = destinationArr
    }
}

NPC.prototype.movement = function() {
    if (this.characterObject.uuid !== undefined) {
        let char = this.characterObject
        if (this.destinationArr[0] > char.position.x) {
            char.position.x += 0.1
          }
        if (this.destinationArr[0] < char.position.x) {
            char.position.x -= 0.1
          }
        if (this.destinationArr[2] > char.position.z) {
            char.position.z += 0.1
          }
        if (this.destinationArr[2] < char.position.z) {
            char.position.z -= 0.1
          }
    }
    if (this.destinationArr[0] === 0){
        this.destinationArr[0] = 10
    }

}

NPC.prototype.displayText = function() {
  let textbox = document.getElementById("textbox")
  textbox.innerText = this.messageArray[0]
  textbox.style.opacity = '1'
}
export { NPC }