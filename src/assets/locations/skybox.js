import * as THREE from 'three';

const skyboxGeo = new THREE.BoxGeometry(700, 700, 700);

const ft = new THREE.TextureLoader().load('src/assets/skybox/skyboxfront.png')
const ftText = new THREE.MeshBasicMaterial({map: ft})
const bk = new THREE.TextureLoader().load('src/assets/skybox/skyboxback.png')
const bkText = new THREE.MeshBasicMaterial({map: bk})
const up = new THREE.TextureLoader().load('src/assets/skybox/skyboxup.png')
const upText = new THREE.MeshBasicMaterial({map: up})
const dn = new THREE.TextureLoader().load('src/assets/skybox/skyboxbottom.png')
const dnText = new THREE.MeshBasicMaterial({map: dn})
const rt = new THREE.TextureLoader().load('src/assets/skybox/skyboxright.png')
const rtText = new THREE.MeshBasicMaterial({map: rt})
const lf = new THREE.TextureLoader().load('src/assets/skybox/skyboxleft.png')
const lfText = new THREE.MeshBasicMaterial({map: lf})

const skyMaterials = [ftText, bkText, upText, dnText, rtText, lfText]

for (let i = 0; i <6; i++){
    skyMaterials[i].side = THREE.BackSide
}

const skybox = new THREE.Mesh(skyboxGeo, skyMaterials);
const dandyBox = new THREE.Mesh(skyboxGeo, skyMaterials);

export {skybox, dandyBox}