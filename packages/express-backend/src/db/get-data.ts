import { LiftingDay, SpreadsheetEntry } from "@tendec/shared-types/src/types";
import { spreadsheetEntriesToLiftingDays} from "@tendec/shared-types/src/conversion";
import { loadData } from "./load-data";

let data: SpreadsheetEntry[];
export const getData = async () => {
    if (data) {
        return data;
    } else {
        data = await loadData();
        return data;
    }
}

let structuredData: LiftingDay[];
export const getStructuredData = async () => {
    if (structuredData) {
        return structuredData;
    } else {
        data = await loadData();
        return spreadsheetEntriesToLiftingDays(data);
    }
}