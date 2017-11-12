import React, { Component } from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

import Body from './Body';
import Orbit from './Orbit';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.animate = this.animate.bind(this);
    this.createTextLabel = this.createTextLabel.bind(this);
    this.threeRender = this.threeRender.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);

    this.textlabels = [];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, (window.innerWidth - 350) / (window.innerHeight - 4), 0.1, 1e10);
    this.mouse = new THREE.Vector2();

    this.raycaster = null;
    this.parentTransform = null;
    this.currentIntersected = null;
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

    this.raycaster = new THREE.Raycaster();
    this.raycaster.linePrecision = 3;

    this.parentTransform = new THREE.Object3D();
  }

  componentDidMount() {
    this.container = document.getElementById('render-here');
    this.container.appendChild(this.renderer.domElement);


    const geometry = new THREE.SphereGeometry(20);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.sphereInter = new THREE.Mesh(geometry, material);
    this.sphereInter.visible = false;
    this.scene.add(this.sphereInter);

    this.props.data.bodies.forEach((el, i) => {
      global.scaleFactor = 60268;
      const bdyPosition = el.getAbsolutPosition(new Date());
      const bdyRadius = el.radiousBody / global.scaleFactor * 100;
      const xyzPosition = [bdyPosition.X / global.scaleFactor, bdyPosition.Y / global.scaleFactor, bdyPosition.Z / global.scaleFactor];
      const bdy = new Body(bdyRadius, xyzPosition, el.textureFilename);
      const bdyMesh = bdy.createMesh();
      el.attatchMesh(bdyMesh);
      bdyMesh.name = `${i}`;
      this.parentTransform.add(bdyMesh);

      const radFactor = Math.PI / 180;

      const orbit = new Orbit(
        bdyPosition.A / global.scaleFactor,
        bdyPosition.EC,
        [bdyPosition.IN * radFactor, bdyPosition.W * radFactor, bdyPosition.OM * radFactor],
        el.orbitColor
      );
      const orbitLine = orbit.createLine();
      orbitLine.name = `${i}`;
      this.parentTransform.add(orbitLine);

      const text = this.createTextLabel(this);
      text.setHTML(el.name);
      text.setParent(bdyMesh);
      this.textlabels.push(text);
      this.container.appendChild(text.element);
    });

    this.scene.add(this.parentTransform);

    this.pastTime = performance.now();
    this.animate();

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    this.container.addEventListener('click', this.onCanvasClick, false);
  }

  onDocumentMouseMove(event) {
    event.preventDefault();
    this.mouse.x = ((event.clientX / (window.innerWidth - 350)) * 2) - 1;
    this.mouse.y = -((event.clientY / (window.innerHeight - 2)) * 2) + 1;
  }

  onCanvasClick() {
    if (this.currentIntersected) {
      this.props.updateData({ selectedBody: parseInt((this.currentIntersected || {}).name, 10) })
    }
  }

  animate(currentTime) {
    this.camera.updateMatrixWorld();

    // find intersections

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.parentTransform.children, true);
    if (intersects.length > 0) {
      if (this.currentIntersected !== null) {
        this.currentIntersected.material.linewidth = 1;
      }

      this.currentIntersected = intersects[0].object;
      this.currentIntersected.material.linewidth = 5;
      this.sphereInter.visible = true;
      this.sphereInter.position.copy(intersects[0].point);
    } else {
      if (this.currentIntersected !== null) {
        this.currentIntersected.material.linewidth = 1;
      }
      this.currentIntersected = null;
      this.sphereInter.visible = false;
    }

    requestAnimationFrame(this.animate);
    this.threeRender(this.scene, this.camera, currentTime);
  }

  threeRender(scene, camera, currentTime) {
    let { epoch } = this.props.data;
    const deltaTime = (currentTime - this.pastTime) * this.props.data.speed;
    this.pastTime = currentTime;

    if (this.props.data.playing) {
      epoch = new Date(epoch.valueOf() + deltaTime);
      this.props.updateData({ epoch });

      this.props.data.bodies.forEach((el) => {
        el.updateMeshPosition(epoch, global.scaleFactor);
      })
    }

    const bPos = this.props.data.bodies[this.props.data.centralBody].msh.position;
    const vector = new THREE.Vector3(bPos.x, bPos.y, bPos.z);
    this.controls.target = vector;
    this.controls.update();

    for (let i = 0; i < this.textlabels.length; i++) {
      this.textlabels[i].updatePosition();
    }

    this.parentTransform.updateMatrixWorld();

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
      },
    };
  }

  render() {
    return (
      <div id="render-here" />
    );
  }
}

export default Canvas;
