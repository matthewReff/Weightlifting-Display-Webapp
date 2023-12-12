import { Request, Response, Router } from "express";
import { LiftingDay } from "@tendec/shared-types/src/types";
import { getStructuredData } from "../../db/get-data";

export interface ExerciseMaxData {
    weight: number,
    date: string
}

const extractExerciseMaxFromLiftingDays = (liftingDays: LiftingDay[], exerciseName: string): ExerciseMaxData[] => {
  return [];
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