import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

import Body from './Body';
import Orbit from './Orbit';

import { bodies } from '../engine/initialize';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
    this.threeRender = this.threeRender.bind(this);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, (window.innerWidth - 350) / (window.innerHeight - 4), 0.1, 1e10);
    // this.camera.zoom = 0.00002
    // this.camera.updateProjectionMatrix()

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize((window.innerWidth - 350), (window.innerHeight - 4));
    // this.renderer.shadowMap.enabled = true
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // const light = new THREE.PointLight(0xffff00, 1, 0, 2)
    // light.position.set(0, 0, 0)
    // light.castShadow = true
    // light.shadow.mapSize.width = 2048
    // light.shadow.mapSize.height = 1024
    // light.shadow.camera.near = 0.5
    // light.shadow.camera.far = 500
    // this.scene.add(light)

    // const helper = new THREE.CameraHelper( light.shadow.camera )
    // this.scene.add( helper )

    bodies.forEach((el, i) => {
      const scaleFactor = 60268;
      const bdyPosition = el.getAbsolutPosition(new Date());
      const bdyRadius = el.radiousBody / scaleFactor;
      const xyzPosition = [bdyPosition.X / scaleFactor, bdyPosition.Y / scaleFactor, bdyPosition.Z * scaleFactor];
      const bdy = new Body(bdyRadius, xyzPosition, el.textureFilename);
      const bdyMesh = bdy.createMesh();
      this.scene.add(bdyMesh);
      const orbit = new Orbit(bdyPosition.A / scaleFactor, bdyPosition.EC, [0, 0, 0], el.orbitColor);
      const orbitLine = orbit.createLine();
      this.scene.add(orbitLine);
    });
    // const sun = new Body(0.25, [0, 0, 0], 'img/textures/sun.jpg')
    // const sunMesh = sun.createMesh()
    // this.scene.add(sunMesh)
    // const earth = new Body(0.05, [3, 0, 0], 'img/textures/earth.jpg')
    // const earthMesh = earth.createMesh()
    // this.scene.add(earthMesh)

    // const marsOrbit = new Orbit(2, 3, [0, 0, 0], 0xff0000)
    // const marsOrbitLine = marsOrbit.createLine()
    // this.scene.add(marsOrbitLine)
    // const earthOrbit = new Orbit(3, 4,[0, 0, 0], 0xffff00)
    // const earthOrbitLine = earthOrbit.createLine()
    // this.scene.add(earthOrbitLine)

    this.camera.position.z = 50000;

    this.controls = new TrackballControls(this.camera, document.body);
    this.controls.rotateSpeed = 3;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noRotate = false;
    this.controls.noZoom = false;
    this.controls.staticMoving = false;
    this.controls.dynamicDampingFactor = 0.3;

    this.pastTime = performance.now();
    this.animate();
  }

  componentDidMount() {
    document.getElementById('render-here').appendChild(this.renderer.domElement);
  }

  animate(currentTime) {
    const deltaTime = (currentTime - this.pastTime) * this.props.data.speed;
    this.pastTime = currentTime;

    if (this.props.data.playing) {
      this.props.updateData({ epoch: this.props.data.epoch.setTime(this.props.data.epoch.valueOf() + deltaTime)});
    }

    requestAnimationFrame(this.animate);
    this.threeRender(this.scene, this.camera);
    this.controls.update();
  }

  threeRender(scene, camera) {
    this.renderer.render(scene, camera);
  }

  render() {
    return (
      <div id="render-here" />
    );
  }
}

export default Canvas;
