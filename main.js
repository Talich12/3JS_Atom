import * as THREE from 'three'
import { FrontSide } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from '/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass';



const scene  = new THREE.Scene();
 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
 
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#bg'),
});
 
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.set(40,30,30);
camera.lookAt(0,0,0);
 

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 0.7; //intensity of glow
bloomPass.radius = 0.2;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);


const ringGeometry = new THREE.TorusGeometry(30,0.2,24,100)
const ringMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFF, side: THREE.DoubleSide})
const ring = new THREE.Mesh(ringGeometry,ringMaterial);
const ring2 = new THREE.Mesh(ringGeometry,ringMaterial);
const ring3 = new THREE.Mesh(ringGeometry,ringMaterial);
scene.add(ring);
scene.add(ring2);
scene.add(ring3);
ring.rotateX(1.5708);
ring3.rotateY(1.5708);

const geometry =  new THREE.SphereGeometry(10,128,128)
const material =  new THREE.MeshStandardMaterial({color:0x44bdfc});
const atom = new THREE.Mesh(geometry, material);
scene.add(atom)

const starGeometry = new THREE.SphereGeometry(2,32,32);
const star = new THREE.Mesh(starGeometry,material);
const star2 = new THREE.Mesh(starGeometry,material);
const star3 = new THREE.Mesh(starGeometry,material);
scene.add(star);
scene.add(star2);
scene.add(star3);
star.position.set(-30,0,0)
star2.position.set(0,-30,0)
star3.position.set(0,0,-30)


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)

const controls = new OrbitControls(camera,renderer.domElement);

var angle = 0;
let Roja;
function RojaCreate(){
  const RojaGeometry = new THREE.SphereGeometry(11,128,128);
  const RojaTexture = new THREE.TextureLoader().load('roja.jpg');
  const RojaMaterial = new THREE.MeshStandardMaterial({map: RojaTexture , side: FrontSide})
  Roja = new THREE.Mesh(RojaGeometry,RojaMaterial);
  scene.add(Roja);
  Roja.position.set = (0,0,0);
}

var KeyPressed;
var GoDown;
function animate(){

  requestAnimationFrame(animate);
  atom.rotation.x += 0.01;
  atom.rotation.y += 0.005;
  atom.rotation.y += 0.01;

  star.position.x +=1*Math.sin(angle);
  star.position.z +=1*Math.cos(angle);

  star2.position.y +=1*Math.sin(angle);
  star2.position.x +=1*Math.cos(angle);

  star3.position.y +=1*Math.cos(angle);
  star3.position.z +=1*Math.sin(angle);

  if(KeyPressed && atom.scale.x < 3.1){
    atom.scale.x += 0.01;
    atom.scale.y +=0.01;
    atom.scale.z +=0.01;
  }
  if(atom.scale.x >= 3.1){
    GoDown = Boolean(true);
    scene.remove(Roja);
    scene.remove(star);
    scene.remove(star2);
    scene.remove(star3);
    scene.remove(ring);
    scene.remove(ring2);
    scene.remove(ring3);
  }
  if(GoDown){
    KeyPressed = false;
    atom.scale.x -=0.9;
    atom.scale.y -=0.9;
    atom.scale.z -=0.9;
  }

  angle += Math.PI/180*2;
  controls.update();
  bloomComposer.render();

 }
 document.addEventListener('keydown', (event) => {
  var name = event.key;
  if (name == 'Shift'){
    KeyPressed = new Boolean(true);
  }
  else if (name == 'Control'){
    RojaCreate();
  }
  else if (name == 'Backspace'){
    scene.remove(Roja);
  }
  }, false);
  
 animate()