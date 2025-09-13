import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// scene
const scene = new THREE.Scene();

// textures
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader(); // for non static bg
cubeTextureLoader.setPath("/texture/cubeMap/");

const sunTexture = textureLoader.load("/texture/2k_sun.jpg");
const mercureTexture = textureLoader.load("/texture/2k_mercury.jpg");
const venusTexture = textureLoader.load(
  "/texture/2k_venus_surface.jpg"
);
const earthTexture = textureLoader.load(
  "/texture/8k_earth_daymap.jpg"
);
const marsTexture = textureLoader.load("/texture/2k_mars.jpg");
const jupiterTexture = textureLoader.load("/texture/2k_jupiter.jpg");
const saturnTexture = textureLoader.load("/texture/2k_saturn.jpg");
const saturnRingTexture = textureLoader.load(
  "/texture/2k_saturn.jpg"
);
const uranusTexture = textureLoader.load("/texture/2k_uranus.jpg");
const neptuneTexture = textureLoader.load("/texture/2k_neptune.jpg");
const moonTexture = textureLoader.load("/texture/2k_moon.jpg");
const backgroundCubemap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = backgroundCubemap;

// mesh
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  map: sunTexture,
  fog: false,
});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
scene.add(sunMesh);

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercureTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
  metalness: 0.4,
  roughness: 0.7,
});
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  map: saturnRingTexture,
  side: THREE.DoubleSide,
  transparent: true, // important
  opacity: 0.9,
});
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

const planets = [
  {
    name: "Mercury",
    radius: 0.38,
    distance: 10,
    speed: 0.2,
    tilt: 0.01,
    material: mercuryMaterial,
    rings: null,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.95,
    distance: 14,
    speed: 0.15,
    tilt: 177.4,
    material: venusMaterial,
    rings: null,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 19,
    speed: 0.1,
    tilt: 23.5,
    material: earthMaterial,
    rings: null,
    moons: [{ name: "Moon", radius: 0.27, distance: 2.5, speed: 0.03 }],
  },
  {
    name: "Mars",
    radius: 0.53,
    distance: 25,
    speed: 0.08,
    tilt: 25,
    material: marsMaterial,
    rings: null,
    moons: [
      { name: "Phobos", radius: 0.1, distance: 1.5, speed: 0.05 },
      { name: "Deimos", radius: 0.06, distance: 2.3, speed: 0.04 },
    ],
  },
  {
    name: "Jupiter",
    radius: 11,
    distance: 45,
    speed: 0.05,
    tilt: 3.1,
    material: jupiterMaterial,
    rings: null,
    moons: [
      { name: "Io", radius: 0.29, distance: 1, speed: 0.06 },
      { name: "Europa", radius: 0.24, distance: 2, speed: 0.05 },
      { name: "Ganymede", radius: 0.41, distance: 3, speed: 0.04 },
      { name: "Callisto", radius: 0.38, distance: 5, speed: 0.03 },
    ],
  },
  {
    name: "Saturn",
    radius: 9.5,
    distance: 85,
    speed: 0.03,
    tilt: 26.7,
    material: saturnMaterial,
    rings: {
      inner: 1.2,
      outer: 2.5,
      material: saturnRingMaterial,
    },
    moons: [
      { name: "Titan", radius: 0.4, distance: 3, speed: 0.04 },
      { name: "Rhea", radius: 0.15, distance: 2.5, speed: 0.05 },
      { name: "Enceladus", radius: 0.1, distance: 1.5, speed: 0.06 },
    ],
  },
  {
    name: "Uranus",
    radius: 4,
    distance: 115,
    speed: 0.02,
    tilt: 97.8,
    material: uranusMaterial,
    rings: {
      inner: 1.1,
      outer: 1.8,
      // material: uranusRingMaterial
    },
    moons: [
      { name: "Miranda", radius: 0.1, distance: 2, speed: 0.05 },
      { name: "Ariel", radius: 0.18, distance: 3, speed: 0.04 },
      { name: "Umbriel", radius: 0.17, distance: 4, speed: 0.035 },
    ],
  },
  {
    name: "Neptune",
    radius: 3.9,
    distance: 135,
    speed: 0.018,
    tilt: 28.3,
    material: neptuneMaterial,
    rings: null,
    moons: [{ name: "Triton", radius: 0.21, distance: 3.5, speed: 0.04 }],
  },
];

planets.forEach((planet) => {
  // create piviot
  const planetPivot = new THREE.Object3D();

  const orbitGeometry = new THREE.RingGeometry(
    planet.distance - 0.01,
    planet.distance + 0.01,
    128
  );
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    depthTest: true,
  });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);

  const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
  const planetMesh = new THREE.Mesh(planetGeometry, planet.material);
  const angle = Math.random() * Math.PI * 2;
  planetMesh.position.set(
    Math.cos(angle) * planet.distance,
    0,
    Math.sin(angle) * planet.distance
  );

  planetMesh.rotation.z = THREE.MathUtils.degToRad(planet.tilt);
  planetPivot.add(planetMesh);
  scene.add(planetPivot);

  planet.pivot = planetPivot;
  planet.mesh = planetMesh;

  // rings
  if (planet.rings || planet.name === "Saturn") {
    const ringGeometry = new THREE.RingGeometry(
      planet.radius * planet.rings.inner,
      planet.radius * planet.rings.outer,
      128
    );
    const ringMesh = new THREE.Mesh(ringGeometry, saturnRingMaterial);
    ringMesh.rotation.x = Math.PI / 2;

    planet.mesh.add(ringMesh);
  }

  if (planet.moons && planet.moons.length > 0) {
    planet.moons.forEach((moon) => {
      const moonPivot = new THREE.Object3D();
      planetMesh.add(moonPivot); // orbit around planet center

      const moonGeometry = new THREE.SphereGeometry(moon.radius, 32, 32);
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

      const moonAngle = Math.random() * Math.PI * 2;
      moonMesh.position.set(
        Math.cos(moonAngle) * (planet.radius + moon.distance),
        0,
        Math.sin(moonAngle) * (planet.radius + moon.distance)
      );
      moonPivot.add(moonMesh);

      moon.pivot = moonPivot;
      moon.mesh = moonMesh;
    });
  }
});

// axesHelper
const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper)

// light
const light = new THREE.AmbientLight("yellow", 0.1);
scene.add(light);
const pointLight = new THREE.PointLight("white", 7000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// make sun glow
sunMesh.material.emissive = new THREE.Color(0xffdd88);
sunMesh.material.emissiveIntensity = 1;
sunMesh.material.emissiveMap = sunTexture;

// fog
scene.fog = new THREE.FogExp2(0x000000, 0.002);

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 10;
camera.position.y = 10;

// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// scene
const canvas = document.querySelector("#threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// controls
const controls = new OrbitControls(camera, canvas);

// animation
const clock = new THREE.Clock();
function animation() {
  const elapsedTime = clock.getElapsedTime();

  planets.forEach((planet) => {
    // planet orbit
    if (planet.pivot) {
      planet.pivot.rotation.y = -elapsedTime * planet.speed;
      planet.pivot.children[0].rotation.y += 0.01;
    }

    // moons orbit
    if (planet.moons) {
      planet.moons.forEach((moon) => {
        if (moon.pivot && moon.mesh) {
          moon.pivot.rotation.y = -elapsedTime * moon.speed;
          moon.mesh.rotation.y += 0.02;
        }
      });
    }
  });

  requestAnimationFrame(animation);
  controls.update();
  renderer.render(scene, camera);
}
animation();
