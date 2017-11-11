import React, { Component } from 'react'
import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'

import Body from './Body'
import Orbit from './Orbit'

class Canvas extends Component {

  constructor(props) {
    super(props)

    this.animate = this.animate.bind(this)
    this.threeRender = this.threeRender.bind(this)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // const sun = new Body(0.25, [0, 0, 0], 0x00ff00)
    // const sunMesh = sun.createMesh()
    // this.scene.add(sunMesh)
    const earth = new Body(0.05, [3, 0, 0], 0xffffff)
    const earthMesh = earth.createMesh()
    this.scene.add(earthMesh)

    const marsOrbit = new Orbit(2, 3, [0, 1, 1.57], 0xff0000)
    const marsOrbitLine = marsOrbit.createLine()
    this.scene.add(marsOrbitLine)
    const earthOrbit = new Orbit(3, 4,[0, 0, 0], 0xffff00)
    const earthOrbitLine = earthOrbit.createLine()
    this.scene.add(earthOrbitLine)

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

export default Canvas
