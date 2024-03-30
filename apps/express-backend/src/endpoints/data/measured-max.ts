import { Request, Response, Router } from "express";
import { LiftingDay, Set } from "@tendec/shared-types/src/types";
import { setAGreaterThanB } from "@tendec/shared-types/src/type-functions";
import { getStructuredData } from "../../db/get-data";

export interface MeasuredMaxData {
    weight: number,
    repetitions: number,
    date: string
}

const extractMeasuredMaxFromLiftingDays = (liftingDays: LiftingDay[], exerciseName: string): MeasuredMaxData[] => {
  const rollingMaxExercises: MeasuredMaxData[] = [];

  const MIN_WEIGHT = -999;
  let maxSetSoFar: Set = {
    liftedWeight: MIN_WEIGHT,
    repetitions: 0
  }
  for(const liftingDay of liftingDays) {
    const exercisesForDay = liftingDay.lifts.filter(lift => lift.exerciseName === exerciseName);
    const setsOfExerciseForDay = exercisesForDay.flatMap(a => a.sets);
    for (const set of setsOfExerciseForDay) {
      if (setAGreaterThanB(set, maxSetSoFar)) {
        maxSetSoFar = set;
      }
    }
    if (maxSetSoFar.liftedWeight !== MIN_WEIGHT) {
      rollingMaxExercises.push({
        weight: maxSetSoFar.liftedWeight,
        repetitions: maxSetSoFar.repetitions,
        date: liftingDay.date
      });
    }
  }
  return rollingMaxExercises;
}

export interface GetMeasuredMaxQueryParams extends Record<string, string>{
  exerciseName: string
}
export type GetMeasuredMaxResponse = MeasuredMaxData[];

const router = Router();
router.get('/exercise-max', async (req: Request<{}, {}, {}, GetMeasuredMaxQueryParams>, res: Response<GetMeasuredMaxResponse>) => {
  const { exerciseName } = req.query;

  const structuredLiftingData = await getStructuredData();
  const exerciseMaxData = extractMeasuredMaxFromLiftingDays(structuredLiftingData, exerciseName);

  res.json(exerciseMaxData);
});

export default router;