import { getDebugInfoFromResponse } from "../api-utils"
import { BASE_API_URL } from "@tendec/express-backend/src/constants"
import { GetExerciseMaxResponse, GetExerciseMaxQueryParams } from "@tendec/express-backend/src/endpoints/data/exercise-max";

export const fetchExerciseMax = async (exerciseName: string) => {
  const queryParams: GetExerciseMaxQueryParams = {
    exerciseName: exerciseName
  }
  const searchParams = new URLSearchParams(queryParams);
  const exerciseMaxResponse = await fetch(`${BASE_API_URL}/data/exercise-max?` + searchParams);
  if (!exerciseMaxResponse.ok) {
      const debugInfo = getDebugInfoFromResponse(exerciseMaxResponse);
      throw new Error("Failed to fetch body weight response " + debugInfo);
  }

  const exerciseMaxInfo = await exerciseMaxResponse.json() as GetExerciseMaxResponse;
  return exerciseMaxInfo;
}