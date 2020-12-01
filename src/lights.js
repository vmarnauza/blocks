import * as THREE from "three";

const lightColor = "#fff";

const createLights = () => {
  const color = new THREE.Color(lightColor);
  const ambientLight = new THREE.AmbientLight(color, 0.75);

  const spotLight = new THREE.SpotLight(color, 0.5);

  spotLight.position.set(50, 200, 100);
  spotLight.angle = Math.PI / 4;
  spotLight.decay = 1;
  spotLight.distance = 0;

  spotLight.castShadow = true;
  spotLight.shadow.radius = 10;
  spotLight.shadow.mapSize.width = 4096;
  spotLight.shadow.mapSize.height = 4096;

  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);

  return [ambientLight, spotLight];
};

export default createLights;
