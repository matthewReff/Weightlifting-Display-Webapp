export const roundToNearest = (N: number, toNearest: number) => {
  return Math.ceil(N / toNearest) * toNearest;
}