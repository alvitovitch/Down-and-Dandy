import * as THREE from 'three';


/// textbox what does it have?
/// the box itself. Possibly a plane element
/// the various texts that will appear on it (save as seperate objects) set .visible to false for the hidden objects and then to true when clicking them 

class Textbox {
	// what does a textbox have 
	constructor(name, imgPath, mainText, subTextArr){
		this.textbox = document.createElement('div')
		this.textbox.name = name
		this.textbox.id = 'outer-text-box'
		this.textboxText = document.createElement('div')
		this.textboxText.id = 'text-box'
		this.textboxText.innerText = mainText
		this.name = name;
		this.img = document.createElement('img')
		this.img.src = imgPath
		this.textbox.appendChild(this.img)
		this.textbox.appendChild(this.textboxText)
		this.subTextArr = subTextArr
		this.options = document.createElement('div')
		this.options.id = 'text-box-options'
		this.textboxText.appendChild(this.options)
		for (let i = 0; i < this.subTextArr.length; i++){
			const textOption = document.createElement('li')
			const textButton = document.createElement('button')
			textButton.name = subTextArr[i]
			textButton.innerText = subTextArr[i]
			textOption.appendChild(textButton)
			this.options.appendChild(textOption)
		}
	}
}



export {Textbox}
