
class Phone {
    constructor() {
        this.phonebox = document.createElement('div')
        this.phonebox.id = "phoneOn"
        this.phoneImg = document.createElement('img')
        this.phoneImg.src = "./src/assets/phone/iphoneOn.png"
        this.menu = document.createElement('ul')
        this.menu.id = "menu"
        const mapButton = document.createElement('li')
        mapButton.innerHTML = `<button id="mapButton">Map</button>`
        const journalButton = document.createElement('li')
        journalButton.innerHTML = `<button id="journalButton">Journal</button>`
        this.menu.appendChild(mapButton)
        this.menu.appendChild(journalButton)
        this.foundClues = []
        this.unlockedLocations = []
        // make the map for the phone
        this.mapImg = document.createElement('img')
        this.mapImg.src = 'src/assets/phone/map.png'
        this.mapImg.id = "mapImage"
        // create the list of locations
        this.mapButtons = document.createElement('div')
        this.mapButtons.id = "mapButtons"
        this.allLocations = ['Haberdashery', 'Port', 'Station']
    }

}

Phone.prototype.phoneMainMenu = function() {
    const phoneDiv = document.getElementById(this.phonebox.id)
    phoneDiv.textContent = ''
    phoneDiv.appendChild(this.phoneImg)
    phoneDiv.appendChild(this.menu)
    
}

Phone.prototype.phoneMap = function(locationsArr) {
    this.mapButtons.innerHTML = ''
    const phoneDiv = document.getElementById(this.phonebox.id)
    phoneDiv.textContent = ''
    phoneDiv.appendChild(this.mapImg)
    locationsArr.forEach((location) =>{
        if (this.allLocations.includes(location.scene.name)){
            const newButton = document.createElement('button')
            newButton.id = location.scene.name
            newButton.innerText = location.scene.name
            this.mapButtons.appendChild(newButton)
        }
    })
    document.getElementById("phoneOn").appendChild(this.mapButtons)
    
}

Phone.prototype.createClues = function() {
    const phoneDiv = document.getElementById(this.phonebox.id)
    phoneDiv.innerHTML = ''
    phoneDiv.appendChild(this.phoneImg)
    const foundClueArr = document.createElement('ul')
    this.foundClues.forEach((foundClue) => {
        const clueLi = document.createElement('li');
        clueLi.innerHTML =  `<img src= ${foundClue.clueImgPath} name=${foundClue.name}>`;
        foundClueArr.appendChild(clueLi);
    })
    phoneDiv.appendChild(foundClueArr)
}

export {Phone}