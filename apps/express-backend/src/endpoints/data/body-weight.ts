import { Request, Response, Router } from "express";
import { LiftingDay } from "@tendec/shared-types/src/types";
import { getStructuredData } from "../../db/get-data";


export interface BodyWeightData {
    bodyWeight: number,
    date: string
}
const liftingDayToBodyWeightData = (liftingDay: LiftingDay): BodyWeightData => {
    return {
        bodyWeight: liftingDay.bodyWeight,
        date: liftingDay.date
    }
}

export type GetBodyWeightDataResponse = BodyWeightData[];

const router = Router();
router.get('/body-weight', async (req: Request<{}, {}, {}, {}>, res: Response<GetBodyWeightDataResponse>) => {
    const structuredLiftingData = await getStructuredData();
    const bodyWeightData = structuredLiftingData.map(liftingDayToBodyWeightData);

    res.json(bodyWeightData);
});

export default router;