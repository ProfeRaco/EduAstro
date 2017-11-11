import * as THREE from 'three'

class Body {
  constructor(radius, position, color) {
    this.radius = radius
    this.position = position
    this.color = color
  }

  createMesh() {
    const texture = new THREE.TextureLoader().load('img/textures/earth.jpg')
    const sphereGeometry = new THREE.SphereGeometry(this.radius, 20, 20)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: this.color, map: texture })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(this.position[0], this.position[1], this.position[2])
    return sphere
  }
}

export default Body
