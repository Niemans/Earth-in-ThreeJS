import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmoVertexShader from './shaders/atmoVertex.glsl'
import atmoFragmentShader from './shaders/atmoFragment.glsl'
import curveVertexShader from './shaders/curveVertex.glsl'
import curveFragmentShader from './shaders/curveFragment.glsl'

import {City} from '../../../models/city'
import {CityConnection} from './cityConnection'


export function makePlanet(cities: City[]){

  let time = 0;
  let raycaster = new THREE.Raycaster()
  const canvasContainer = document.querySelector<HTMLElement>('#canvasContainer');

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('canvas')!
  })
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer!.offsetWidth/canvasContainer!.offsetHeight,
    0.1,
    1000)
  camera.updateProjectionMatrix();
  camera.position.z = 15
  const scene = new THREE.Scene()

  //wielkość canvasu
  renderer.setSize(canvasContainer!.offsetWidth,canvasContainer!.offsetHeight)

  //console.log("height: ", renderer.domElement.clientHeight)
  renderer.setPixelRatio(devicePixelRatio)


  let spheare = addSpheare(City.r)
  scene.add(spheare)
  let atmosphere = addAtmosphere(City.r + City.r/5)
  scene.add(atmosphere)

  const mouse = new THREE.Vector2(-1, -1);
  addEventListener('mousemove', (event) => {
    mouse.x = 4 * event.clientX /innerWidth - 3
    mouse.y = -2 * event.clientY /innerHeight + 1
  })
  let clicked = false;
  addEventListener('mousedown', () => {
    clicked = true;
    raycaster = new THREE.Raycaster()
  })
  addEventListener('mouseup', () => {
    clicked = false;
  })

  let group = new THREE.Group();
  group.add(spheare);
  scene.add(group);

  let stars = makeStars()
  scene.add(stars);

  let point1: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  let point2: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  let curve: THREE.Mesh<THREE.TubeGeometry, THREE.ShaderMaterial>;


  animate();

  let btn = document.getElementById("okey");

  btn?.addEventListener('click', () => {
    let cieties = cities;
    let select = document.getElementById('startingPlace') as HTMLInputElement;

    let start = cieties.find(c => c.city == select.textContent) as City;

    let select2 = document.getElementById('finishPlace') as HTMLInputElement;
    let finish = cieties.find(c => c.city == select2.textContent) as City;

    if(group.children.length > 1){
      group.remove(point1);
      group.remove(point2);
      group.remove(curve);
    }

    let cc = new CityConnection(start,finish)
    point1 = makePoint(start)
    point2 = makePoint(finish)


    curve = makeCurve(cc);

    group.add(point1,point2,curve);
    //scene.add(group);

  })

  function animate() {
    time += 0.05;
    raycaster.setFromCamera(mouse,camera);

    const intersects = raycaster.intersectObject(spheare)

    requestAnimationFrame(animate)
    if (curve !== undefined){
      curve.material.uniforms['time'].value = time;
    }
    renderer.render(scene, camera)

    if(intersects.length == 0 || !clicked){
        group.rotateY(0.001);
    }

    //group.rotateY(mouse.x/100)
    //mouse.x *= 0.99;
  }

  function makeStars() {
    const  startGeometry = new THREE.BufferGeometry();
    const startMaterial = new THREE.PointsMaterial({
      color: 0xffffff
    })

    const verticies: number[] = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      verticies.push(x,y,z);
    }

      startGeometry.setAttribute('position', new THREE.Float32BufferAttribute(verticies,3))
    const stars = new THREE.Points(startGeometry,startMaterial);
    return stars;
  }

  function makePoint(coordinates:City, color:THREE.ColorRepresentation | undefined = 0xffff00){
    let point = new THREE.Mesh(
      new THREE.SphereGeometry( 0.05, 20, 20),
      new THREE.MeshBasicMaterial({color})
    )

    point.position.setX(coordinates.Position.x)
    point.position.setY(coordinates.Position.y)
    point.position.setZ(coordinates.Position.z)

    return point;
  }

  function makeCurve(cc : CityConnection){

    let pos1 = cc.startingCity.Position;
    let pos2 = cc.finishCity.Position;

    let v1 = new THREE.Vector3(pos1.x, pos1.y, pos1.z)
    let v2 = new THREE.Vector3(pos2.x, pos2.y, pos2.z)

    let points: THREE.Vector3[] = []
    for (let i = 0; i <= 50; i++) {
      let p = new THREE.Vector3().lerpVectors(v1,v2,i/50)
      p.normalize();
      p.multiplyScalar(City.r)
      p.multiplyScalar(1 + Math.sin(Math.PI*i/50)*0.1)
      points.push(p)
    }

    let path = new THREE.CatmullRomCurve3(points);

    const geometry = new THREE.TubeGeometry(path, 51,0.01,20,false);

    const material = new THREE.ShaderMaterial({
      vertexShader: curveVertexShader,
      fragmentShader: curveFragmentShader,
      transparent:true,
      uniforms:{
        time: {
          value : time
        }
      }
    })

    const curve = new THREE.Mesh(geometry,material);

    return curve;
  }

  function addSpheare(r: number) {

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms : {
        globeTexture: {
          value: new THREE.TextureLoader().load('/assets/images/earth-texture.jpg')
        }
      }
    })

    const spheare = new THREE.SphereGeometry(r,100,100)

    const mesh = new THREE.Mesh(spheare,material);
    //changeSpheareColor(mesh)
    return mesh
  }

  function addAtmosphere(spheareR: number) {

    const material = new THREE.ShaderMaterial({
      transparent:true,
      vertexShader: atmoVertexShader,
      fragmentShader: atmoFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
    const spheare = new THREE.SphereGeometry(spheareR,100,100)

    const mesh = new THREE.Mesh(spheare,material)
    mesh.scale.set(1.2,1.2,1.2)
    return mesh
  }


  let oc = new OrbitControls(camera, renderer.domElement)
  oc.minDistance = 6;
  oc.maxDistance = 15;
  oc.enablePan = false;

}
