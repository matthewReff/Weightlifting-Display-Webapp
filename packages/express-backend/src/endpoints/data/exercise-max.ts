import { Request, Response, Router } from "express";
import { LiftingDay } from "@tendec/shared-types/src/types";
import { getStructuredData } from "../../db/get-data";

export interface ExerciseMaxData {
    weight: number,
    date: string
}

const extractExerciseMaxFromLiftingDays = (liftingDays: LiftingDay[], exerciseName: string): ExerciseMaxData[] => {
  const rollingMaxExercises: ExerciseMaxData[] = [];

  const MIN_WEIGHT = -999;
  let maxWeightSoFar = MIN_WEIGHT;
  for(const liftingDay of liftingDays) {
    const exercisesForDay = liftingDay.lifts.filter(lift => lift.exerciseName === exerciseName);
    const setsOfExerciseForDay = exercisesForDay.flatMap(a => a.sets);
    for (const set of setsOfExerciseForDay) {
      const liftedWeight = set.liftedWeight;
      if (liftedWeight > maxWeightSoFar) {
        maxWeightSoFar = liftedWeight;
      }
    }
    if (maxWeightSoFar !== MIN_WEIGHT) {
      rollingMaxExercises.push({
        weight: maxWeightSoFar,
        date: liftingDay.date
      });
    }
  }
  return rollingMaxExercises;
}

export interface GetExerciseMaxQueryParams extends Record<string, string>{
  exerciseName: string
}
export type GetExerciseMaxResponse = ExerciseMaxData[];

const router = Router();
router.get('/exercise-max', async (req: Request<{}, {}, {}, GetExerciseMaxQueryParams>, res: Response<GetExerciseMaxResponse>) => {
  const { exerciseName } = req.query;

  const structuredLiftingData = await getStructuredData();
  const exerciseMaxData = extractExerciseMaxFromLiftingDays(structuredLiftingData, exerciseName);

  res.json(exerciseMaxData);
});

export default router;