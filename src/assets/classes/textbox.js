import * as THREE from 'three';


/// textbox what does it have?
/// the box itself. Possibly a plane element
/// the various texts that will appear on it (save as seperate objects) set .visible to false for the hidden objects and then to true when clicking them 

class Textbox {
	// what does a textbox have 
	constructor(name, imgPath, mainText, subTextArr){
		this.textbox = document.createElement('ul')
		this.textbox.name = name
		this.textbox.innerText = mainText
		this.name = name;
		this.img = document.createElement('img')
		this.img.src = imgPath
		this.textbox.appendChild(this.img)
		this.subTextArr = subTextArr
		debugger
		for (let i = 0; i < this.subTextArr.length; i++){
			debugger;
			const textOption = document.createElement('li')
			const textButton = document.createElement('button')
			textButton.name = subTextArr[i]
			textButton.innerText = subTextArr[i]
			textOption.appendChild(textButton)
			this.textbox.appendChild(textOption)
		}
	}
}

Textbox.prototype.boxContents = function() {
	
}

export {Textbox}
