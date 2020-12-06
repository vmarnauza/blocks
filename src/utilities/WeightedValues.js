export default class {
  constructor({ values = [], weights = [] }) {
    this.values = values;
    this.weights = weights;
    this.groupedValues = values.map((value, ii) => ({
      value,
      weight: weights[ii],
    }));

    if (values.length < 2)
      throw new Error("There should be at least two values.");
    if (values.length !== weights.length)
      throw new Error("Values and weights should be of the same length");
  }

  get random() {
    const randomNumber = Math.random();
    const weightSum = this.weights.reduce((result, weight) => result + weight);
    let base = 0;

    return this.groupedValues.find((group) => {
      const weightAsFraction = group.weight / weightSum;
      const isMatch =
        randomNumber >= base && randomNumber < base + weightAsFraction;

      base += weightAsFraction;

      return isMatch;
    }).value;
  }
}
