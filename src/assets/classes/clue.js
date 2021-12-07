import * as THREE from 'three';

class Clue {
    // what does a clue have?
    //  3d Object, message array, hover state
    constructor(clueObject, messageArray, clueImgPath) {
        this.clueImgPath = clueImgPath
        this.name = clueObject.name
        this.clueObject = clueObject;
        this.messageArray = messageArray;
        this.hoverColor = new THREE.Color('yellow');
        this.ogColor = clueObject.material.color;
        this.clueObject.clue = true;
        this.clueObject.layers.enable(2)
    }

    // what does the hover state do? 
        // if hovering over a clueObject turn the clueObject blue (eventually may sub out for an !)

}

Clue.prototype.displayText = function() {
    let clueText = document.getElementById("clueText")
    clueText.innerText = this.messageArray[0]
    clueText.style.opacity = '1'
    setTimeout(() => {
        clueText.style.opacity = '0'
    }, 7000)
}

Clue.prototype.hover = function(raycaster, scene) {
        if (raycaster.intersectObjects(scene.children)[0].object === this.clueObject) {
            this.clueObject.material.color = this.hoverColor
        } else {
            this.clueObject.material.color = this.ogColor
        }
    }


export {Clue}