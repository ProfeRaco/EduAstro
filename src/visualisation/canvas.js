import React, { Component } from 'react'
import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'

class Scene extends Component {

  constructor(props) {
    super(props)

    this.animate = this.animate.bind(this)
    this.threeRender = this.threeRender.bind(this)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    const sphereGeometry = new THREE.SphereGeometry(0.25)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    this.cube = new THREE.Mesh(sphereGeometry, sphereMaterial)
    this.scene.add(this.cube)

    const ellipseCurve = new THREE.EllipseCurve(0, 0, 2, 3)
    const ellipsePoints = ellipseCurve.getPoints(50)
    const ellipseGeometry = new THREE.BufferGeometry().setFromPoints(ellipsePoints)
    const ellipseMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    const ellipse = new THREE.Line(ellipseGeometry, ellipseMaterial)
    this.scene.add(ellipse)

    this.camera.position.z = 5

    this.controls = new TrackballControls(this.camera, document.body)
    this.controls.rotateSpeed = 3
    this.controls.zoomSpeed = 1.2
    this.controls.panSpeed = 0.8
    this.controls.noRotate = false
    this.controls.noZoom = false
    this.controls.staticMoving = false
    this.controls.dynamicDampingFactor = 0.3
    
    this.animate()
  }

  animate() {
		requestAnimationFrame( this.animate )

		this.cube.rotation.x += 0.1
		this.cube.rotation.y += 0.1

		this.threeRender(this.scene, this.camera)
    this.controls.update()
  }

  threeRender(scene, camera) {
    this.renderer.render(scene, camera)
  }

  render() {
    return(
      <div></div>
    )
  }

}

export default Scene
