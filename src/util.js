const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const getRandomElement = arr => arr[getRandomInt(0, arr.length - 1)];
const remapNumbers = (value, sourceRange, targetRange) => {
  let oldRange = sourceRange[1] - sourceRange[0];
  let newRange = targetRange[1] - targetRange[0];
  return ((value - sourceRange[0]) * newRange) / oldRange + targetRange[0];
};

export { getRandomElement, remapNumbers, getRandomInt, getRandomArbitrary };
