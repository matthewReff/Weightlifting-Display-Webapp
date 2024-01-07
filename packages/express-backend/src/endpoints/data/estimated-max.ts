import { Request, Response, Router } from "express";
import { LiftingDay } from "@tendec/shared-types/src/types";
import { getStructuredData } from "../../db/get-data";

export interface EstimatedMaxData {
    weight: number,
    date: string
}

interface EstimatedOneRepMaxWithBrzycki {
  liftedWeight: number,
  repetitions: number
}
const estimatedOneRepMaxWithBrzycki = ({
  liftedWeight,
  repetitions
}: EstimatedOneRepMaxWithBrzycki) => {
  return liftedWeight * ( 36 / ( 37 - repetitions));
}

interface EstimatedOneRepMaxWithEpley {
  liftedWeight: number,
  repetitions: number
}
const estimatedOneRepMaxWithEpley = ({
  liftedWeight,
  repetitions
}: EstimatedOneRepMaxWithBrzycki) => {
  if (repetitions === 1) {
    return liftedWeight;
  }
  return liftedWeight * ( 1 + ( repetitions / 30));
}

const extractEstimatedMaxFromLiftingDays = (liftingDays: LiftingDay[], exerciseName: string): EstimatedMaxData[] => {
  const estimatedMaxExercises: EstimatedMaxData[] = [];

  const MIN_WEIGHT = -999;
  for(const liftingDay of liftingDays) {
    let maxEstimatedSoFar = MIN_WEIGHT;
    const exercisesForDay = liftingDay.lifts.filter(lift => lift.exerciseName === exerciseName);
    const setsOfExerciseForDay = exercisesForDay.flatMap(a => a.sets);
    for (const set of setsOfExerciseForDay) {
      const { liftedWeight, repetitions } = set;

      const estimatedMaxFromSet = estimatedOneRepMaxWithBrzycki({
        liftedWeight,
        repetitions
      });
      if (estimatedMaxFromSet > maxEstimatedSoFar) {
        maxEstimatedSoFar = estimatedMaxFromSet;
      }
    }
    if (maxEstimatedSoFar !== MIN_WEIGHT) {
      estimatedMaxExercises.push({
        weight: maxEstimatedSoFar,
        date: liftingDay.date
      });
    }
  }
  return estimatedMaxExercises;
}

export interface GetEstimatedMaxQueryParams extends Record<string, string>{
  exerciseName: string
}
export type GetEstimatedMaxResponse = EstimatedMaxData[];

const router = Router();
router.get('/estimated-max', async (req: Request<{}, {}, {}, GetEstimatedMaxQueryParams>, res: Response<GetEstimatedMaxResponse>) => {
  const { exerciseName } = req.query;

  const structuredLiftingData = await getStructuredData();
  const estimatedMaxData = extractEstimatedMaxFromLiftingDays(structuredLiftingData, exerciseName);

  res.json(estimatedMaxData);
});

export default router;