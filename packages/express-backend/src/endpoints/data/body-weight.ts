import { Request, Response, Router } from "express";
import { LiftingDay } from "@tendec/shared-types/src/types";
import { getStructuredData } from "../../db/get-data";

const router = Router();

interface BodyWeightData {
    bodyWeight: number,
    date: string
}
const liftingDayToBodyWeightData = (liftingDay: LiftingDay): BodyWeightData => {
    return {
        bodyWeight: liftingDay.bodyWeight,
        date: liftingDay.date
    }
}
router.get('/body-weight', async (req: Request, res: Response) => {
    const structuredLiftingData = await getStructuredData();
    const bodyWeightData = structuredLiftingData.map(liftingDayToBodyWeightData);
    res.json(bodyWeightData);
});

export default router;