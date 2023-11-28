import { SpreadsheetEntry } from "@tendec/shared-types/src/types";
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