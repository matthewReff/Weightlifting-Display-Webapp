import { getDebugInfoFromResponse } from "../api-utils"
import { BASE_API_URL } from "@tendec/express-backend/src/constants"
import { BodyWeightData } from "@tendec/express-backend/src/endpoints/data/body-weight";

export const fetchBodyweightData = async () => {
    const bodyWeightResponse = await fetch(`${BASE_API_URL}/api/data/body-weight`);
    if (!bodyWeightResponse.ok) {
        const debugInfo = getDebugInfoFromResponse(bodyWeightResponse);
        throw new Error("Failed to fetch body weight response " + debugInfo);
    }

    const bodyWeightData = await bodyWeightResponse.json() as BodyWeightData;
    return bodyWeightData;
}