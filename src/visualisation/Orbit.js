import * as THREE from 'three'

class Orbit {
  constructor(a, e, rotation, color, xc = 0, yc = 0, zc = 0) {
    this.a = a
    this.e = e
    this.rotation = rotation
    this.color = color
    this.xc = xc;
    this.yc = yc;
    this.zc = zc;
  }

  createLine() {
    const b = this.a * Math.sqrt(1 - (this.e ** 2));
    const ellipseCurve = new THREE.EllipseCurve(0, 0, this.a, b)
    const ellipsePoints = ellipseCurve.getPoints(200)
    const ellipseGeometry = new THREE.BufferGeometry().setFromPoints(ellipsePoints)
    const ellipseMaterial = new THREE.LineBasicMaterial({ color: this.color })
    const ellipse = new THREE.Line(ellipseGeometry, ellipseMaterial)
    let eulerRotation = new THREE.Euler(this.rotation[0], 0, this.rotation[1], 'XZY')
    ellipse.setRotationFromEuler(eulerRotation)
    eulerRotation = new THREE.Euler(0, 0, this.rotation[2], 'ZXY')
    ellipse.setRotationFromEuler(eulerRotation);
    ellipse.translateX(this.xc);
    ellipse.translateY(this.yc);
    ellipse.translateZ(this.zc);
    return ellipse
  }
}

export default Orbit
