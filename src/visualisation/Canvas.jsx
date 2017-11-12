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
    this.createTextLabel = this.createTextLabel.bind(this);
    this.threeRender = this.threeRender.bind(this);

    this.textlabels = [];

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

    // Deleted . plane creation

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
    this.container = document.getElementById('render-here');
    this.container.appendChild(this.renderer.domElement);

    bodies.forEach((el, i) => {
      global.scaleFactor = 60268;
      const bdyPosition = el.getAbsolutPosition(new Date());
      const bdyRadius = el.radiousBody / global.scaleFactor * 100;
      const xyzPosition = [bdyPosition.X / global.scaleFactor, bdyPosition.Y / global.scaleFactor, bdyPosition.Z / global.scaleFactor];
      const bdy = new Body(bdyRadius, xyzPosition, el.textureFilename);
      const bdyMesh = bdy.createMesh();
      el.attatchMesh(bdyMesh);
      this.scene.add(bdyMesh);

      const radFactor = Math.PI / 180;

      const orbit = new Orbit(
        bdyPosition.A / global.scaleFactor,
        bdyPosition.EC,
        [bdyPosition.IN * radFactor, bdyPosition.W * radFactor, bdyPosition.OM * radFactor],
        el.orbitColor
      );
      const orbitLine = orbit.createLine();
      this.scene.add(orbitLine);

      const text = this.createTextLabel(this);
      text.setHTML(`Planet ${i}`);
      text.setParent(bdyMesh);
      this.textlabels.push(text);
      this.container.appendChild(text.element);
    });
  }

  animate(currentTime) {
    requestAnimationFrame(this.animate);
    this.threeRender(this.scene, this.camera, currentTime);
    const bPos = bodies[this.props.data.centralBody].getAbsolutPosition(new Date());
    const xyzBP = [
      bPos.X / global.scaleFactor,
      bPos.Y / global.scaleFactor,
      bPos.Z / global.scaleFactor
    ];
    const vector = new THREE.Vector3(xyzBP[0], xyzBP[1], xyzBP[2]);
    this.controls.target = vector
    this.controls.update();
  }

  threeRender(scene, camera, currentTime) {
    const deltaTime = (currentTime - this.pastTime) * this.props.data.speed;
    this.pastTime = currentTime;

    if (this.props.data.playing) {
      const newEpoch = new Date(this.props.data.epoch.valueOf() + deltaTime);
      this.props.updateData({ epoch: newEpoch });

      bodies.forEach((el) => {
        el.updateMeshPosition(newEpoch, global.scaleFactor);
      })
    }

    for (let i = 0; i < this.textlabels.length; i++) {
      this.textlabels[i].updatePosition();
    }

    this.renderer.render(scene, camera);
  }

  createTextLabel() {
    const div = document.createElement('div');
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = 100;
    div.style.height = 100;
    div.style.color = 'white';
    div.innerHTML = 'hi there!';
    div.style.top = -1000;
    div.style.left = -1000;

    const _this = this;

    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0, 0, 0),
      setHTML(html) {
        this.element.innerHTML = html;
      },
      setParent(threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition() {
        if (this.parent) {
          this.position.copy(this.parent.position);
        }

        const coords2d = this.get2DCoords(this.position, _this.camera);
        window.p = this.element;
        this.element.style.left = `${coords2d.x}px`;
        this.element.style.top = `${coords2d.y}px`;
      },
      get2DCoords(position, camera) {
        const vector = position.project(camera);
        vector.x = ((vector.x + 1) / 2) * (window.innerWidth - 350);
        vector.y = -((vector.y - 1) / 2) * (window.innerHeight - 4);
        return vector;
      }
    };
  }

  render() {
    return (
      <div id="render-here" />
    );
  }
}

export default Canvas;
