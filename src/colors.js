export const colors = {
  pink: "#BF5E84",
  purple: "#71427E",
  vanilla: "#A4AFC5",
  lightblue: "#DAD6DA",
};

export const random = () => {
  const colorArray = Object.values(colors);
  const randomIndex = Math.floor(Math.random() * colorArray.length);

  return colorArray[randomIndex];
};

export default {
  random,
};
