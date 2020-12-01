export const colors = {
  darkblue: "#493271",
  purple: "#71427E",
  pink: "#B04D66",
  vanilla: "#CFC7CF",
  lightblue: "#989EB6",
  orange: "#D57467",
  yellow: "#E6D4BC",
};

export const groundColor = "#41395D";

export const random = () => {
  const colorArray = Object.values(colors);
  const randomIndex = Math.floor(Math.random() * colorArray.length);

  return colorArray[randomIndex];
};

export default {
  random,
};
