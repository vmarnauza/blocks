export const colors = ["#BF5E84", "#71427E", "#A4AFC5", "#DAD6DA"];

export const random = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export default {
  random,
};
