const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-3, 1, 0);
scene.rotation.set(0.15, -1, 0);

const wrapper = document.querySelector(".background_wrapper");
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
wrapper.appendChild(renderer.domElement);

hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);
directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

let loader = new THREE.GLTFLoader();
loader.load("/Assets/car_model/scene.gltf", function (gltf) {
  car = gltf.scene.children[0];
  scene.add(gltf.scene);
});

camera.position.z = 5;

const animate = function () {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

function onDocumentMouseMove(event) {
  let cursorX = event.clientX;
  let cursorY = event.clientY;

  //   console.log(window.innerWidth / 2);
  //   console.log(window.innerHeight / 2);

  scene.rotation.x += cursorX / 100000;
  scene.rotation.y += cursorY / 100000;

  //   console.log(cursorX + " " + cursorY);
}

document.addEventListener("mousemove", onDocumentMouseMove, false);
