import * as THREE from 'three'

class Orbit {
  constructor(a, e, rotation, color) {
    this.a = a
    this.e = e
    this.rotation = rotation
    this.color = color
  }

  createLine() {
    const b = this.a * Math.sqrt(1 - (this.e ** 2));
    const ellipseCurve = new THREE.EllipseCurve(0, 0, this.a, b)
    const ellipsePoints = ellipseCurve.getPoints(50)
    const ellipseGeometry = new THREE.BufferGeometry().setFromPoints(ellipsePoints)
    const ellipseMaterial = new THREE.LineBasicMaterial({ color: this.color })
    const ellipse = new THREE.Line(ellipseGeometry, ellipseMaterial)
    const eulerRotation = new THREE.Euler(this.rotation[0], this.rotation[1], this.rotation[2], 'XYZ')
    ellipse.setRotationFromEuler(eulerRotation)
    return ellipse
  }
}

export default Orbit
