export const sleep = (ms = 1000) => {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve) => setTimeout(resolve, ms));
};
