import * as THREE from 'three';

class ThirdPersonCamera {
    constructor(camera, params) {
        this._params = params;
        this._camera = camera;

        this._currentPosition = new THREE.Vector3();
        this._currentLookAt = new THREE.Vector3();
    }

    _CalculateIdealOffset() {
        const idealOffset = new THREE.Vector3(-15, 20, -30);
        idealOffset.applyQuaternion(this._params.target.rotation);
        idealOffset.add(this._params.target.position)
        return idealOffset;
    }
    _CalculateIdealLookAt() {
        const idealLookAt = new THREE.Vector3(0, 10, 50);
        idealLookAt.applyQuaternion(this._params.target.rotation);
        idealLookAt.add(this._params.target.position)
        return idealLookAt;
    }

    Update() {
        const idealOffset = this._CalculateIdealOffset();
        const idealLookAt = this._CalculateIdealLookAt();
        
        this._camera.Position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookAt);
    }
}


export {ThirdPersonCamera}