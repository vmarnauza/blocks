import * as THREE from "three";

const lightColor = "#fff";

const createLights = () => {
  const color = new THREE.Color(lightColor);
  const ambientLight = new THREE.AmbientLight(color, 0.7); // soft white light
  const spotLight = new THREE.SpotLight(color, 1);

  spotLight.position.set(0, 100, 200);
  spotLight.angle = Math.PI;
  spotLight.decay = 0.2;
  spotLight.distance = 500;

  return [ambientLight, spotLight];
};

export default createLights;
