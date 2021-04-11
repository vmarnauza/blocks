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

export const getByIndex = (index) => {
  const colorArray = Object.values(colors);
  return colorArray[index];
};

export const getByRelativePosition = (pos) => {
  if (pos < 0 || pos > 1)
    throw new Error("Position must be a number between 0 and 1.");

  const index = Math.round(pos * Object.keys(colors).length);

  return getByIndex(index);
};

export const getByAbsolutePosition = (pos) => {
  if (pos < 0) throw new Error("Position must be an integer greater than 0.");

  const index = Math.floor(pos % Object.keys(colors).length);

  return getByIndex(index);
};

export default {
  random,
  getByRelativePosition,
  getByAbsolutePosition,
};
