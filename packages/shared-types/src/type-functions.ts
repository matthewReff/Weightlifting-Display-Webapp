import { Set } from "./types";

export const setALessThanB = (setA: Set, setB: Set): boolean => {
  if (setA.liftedWeight === setB.liftedWeight) {
    return setA.repetitions < setB.repetitions;
  }

  return setA.liftedWeight < setB.liftedWeight;
}

export const setAGreaterThanB = (setA: Set, setB: Set): boolean => {
  return !setALessThanB(setA, setB);
}