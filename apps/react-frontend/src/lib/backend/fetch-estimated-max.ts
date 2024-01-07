import { getDebugInfoFromResponse } from "../api-utils"
import { BASE_API_URL } from "@tendec/express-backend/src/constants"
import { GetExerciseMaxResponse, GetExerciseMaxQueryParams } from "@tendec/express-backend/src/endpoints/data/exercise-max";

export const fetchEstimatedMax = async (exerciseName: string) => {
  const queryParams: GetExerciseMaxQueryParams = {
    exerciseName: exerciseName
  }
  const searchParams = new URLSearchParams(queryParams);
  const estimatedMaxResponse = await fetch(`${BASE_API_URL}/data/estimated-max?` + searchParams);
  if (!estimatedMaxResponse.ok) {
    const debugInfo = getDebugInfoFromResponse(estimatedMaxResponse);
    console.log(debugInfo)
    throw new Error("Failed to fetch estimated 1 rep max response " + debugInfo);
  }

  const estimatedMaxInfo = await estimatedMaxResponse.json() as GetExerciseMaxResponse;
  return estimatedMaxInfo;
}