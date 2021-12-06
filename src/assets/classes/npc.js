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

NPC.prototype.displayText = function(dialougeTreeNum) {
  // get the textbox
  let textbox = document.getElementById("characterTextBox")
  textbox.style.opacity = '1'

  // create the unordered list
  const dialougeBox = document.createElement('ul')
  dialougeBox.innerText = this.messageArr[dialougeTreeNum][0]
  textbox.appendChild(dialougeBox)
  // for each option in the dialogue tree add a li
  for (let i = 1; i < this.messageArr[dialougeTreeNum].length; i++){
    const textOption = document.createElement('li')
    const textButton = document.createElement('button')
    textButton.class = 'button'
    
    textButton.innerText = this.messageArr[dialougeTreeNum][i]
    textOption.appendChild(textButton)
    textbox.firstChild.appendChild(textOption)
  }    
}

export { NPC }