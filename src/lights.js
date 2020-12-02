import * as THREE from "three";

const lightColor = "#fff";

const createLights = () => {
  const color = new THREE.Color(lightColor);
  const ambientLight = new THREE.AmbientLight(color, 0.5);
  const shadowMapSize = 4098;

  const spotLight = new THREE.SpotLight(color, 0.8);

  spotLight.position.set(5, 20, 10);
  spotLight.angle = Math.PI / 4;
  spotLight.decay = 1;
  spotLight.distance = 0;

  spotLight.castShadow = true;
  spotLight.shadow.radius = 8;
  spotLight.shadow.mapSize.width = shadowMapSize;
  spotLight.shadow.mapSize.height = shadowMapSize;

  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);

  return [ambientLight, spotLight];
};

export default createLights;
