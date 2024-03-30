import { GetEstimatedMaxQueryParams, GetEstimatedMaxResponse, OneRepEstimateFunction } from "@tendec/express-backend/src/endpoints/data/estimated-max";
import { getDebugInfoFromResponse } from "../api-utils"
import { BASE_API_URL } from "@tendec/express-backend/src/constants";

export const fetchEstimatedMax = async (exerciseName: string, maxEstimationFunction: OneRepEstimateFunction) => {
  const queryParams: GetEstimatedMaxQueryParams = {
    exerciseName: exerciseName,
    maxEstimationFunction: maxEstimationFunction,
  }
  const searchParams = new URLSearchParams(queryParams);
  const estimatedMaxResponse = await fetch(`${BASE_API_URL}/data/estimated-max?` + searchParams);
  if (!estimatedMaxResponse.ok) {
    const debugInfo = getDebugInfoFromResponse(estimatedMaxResponse);
    throw new Error("Failed to fetch estimated 1 rep max response " + debugInfo);
  }

  const estimatedMaxInfo = await estimatedMaxResponse.json() as GetEstimatedMaxResponse;
  return estimatedMaxInfo;
}