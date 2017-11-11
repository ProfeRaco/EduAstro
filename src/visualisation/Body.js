import * as THREE from 'three'

class Body {
  constructor(radius, position, textureFilename) {
    this.radius = radius
    this.position = position
    this.textureFilename = textureFilename
  }

  createMesh() {
    const texture = new THREE.TextureLoader().load(this.textureFilename)
    const sphereGeometry = new THREE.SphereGeometry(this.radius, 20, 20)
    let sphereMaterial = new THREE.MeshBasicMaterial({ map: texture })
    // if (this.position[0] === 0 && this.position[1] === 0 && this.position[2] === 0) {
    //   sphereMaterial = new THREE.MeshBasicMaterial({ map: texture })
    // } else {
    //   sphereMaterial = new THREE.MeshStandardMaterial({ map: texture })
    // }
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(this.position[0], this.position[1], this.position[2])
    // sphere.castShadow = true
    // sphere.receiveShadow = true
    return sphere
  }
}

export default Body
