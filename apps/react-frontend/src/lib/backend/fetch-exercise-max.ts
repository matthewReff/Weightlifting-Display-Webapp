import { getDebugInfoFromResponse } from "../api-utils"
import { BASE_API_URL } from "@tendec/express-backend/src/constants"
import { GetMeasuredMaxResponse, GetMeasuredMaxQueryParams } from "@tendec/express-backend/src/endpoints/data/measured-max";

export const fetchMeasuredMax = async (exerciseName: string) => {
  const queryParams: GetMeasuredMaxQueryParams = {
    exerciseName: exerciseName,
  }
  const searchParams = new URLSearchParams(queryParams);
  const exerciseMaxResponse = await fetch(`${BASE_API_URL}/data/exercise-max?` + searchParams);
  if (!exerciseMaxResponse.ok) {
    const debugInfo = getDebugInfoFromResponse(exerciseMaxResponse);
    throw new Error("Failed to fetch body weight response " + debugInfo);
  }

  const exerciseMaxInfo = await exerciseMaxResponse.json() as GetMeasuredMaxResponse;
  return exerciseMaxInfo;
}