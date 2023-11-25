import { groupBy } from "lodash";
import { Lift, LiftingDay, SpreadsheetEntry } from "./types"

export const liftingDayToSpreadsheetEntires = (liftingDay: LiftingDay): SpreadsheetEntry[] => {
    const { date, bodyWeight, lifts } = liftingDay;
    const a = lifts[0];
    const spreadsheetEntires: SpreadsheetEntry[] = [];
    for(const liftEntry of lifts) {
        const { exerciseName, sets } = liftEntry;
        for(const setEntry of liftEntry.sets) {
          const { liftedWeight, repetitions } = setEntry;

          spreadsheetEntires.push({
            date,
            bodyWeight,
            exerciseName,
            repetitions,
            liftedWeight
          });
        }
    }
    return spreadsheetEntires;
}

export const spreadsheetEntriesToLiftingDay = (spreadsheetEntries: SpreadsheetEntry[]): LiftingDay => {
  // TODO
  return {
    date: "",
    bodyWeight: 100,
    lifts: []
  };
}

export const liftingDaysToSpreadsheetEntries = (liftingDays: LiftingDay[]): SpreadsheetEntry[] => {
  return liftingDays.flatMap(liftingDayToSpreadsheetEntires);
}

export const spreadsheetEntriesToLiftingDays = (spreadsheetEntries: SpreadsheetEntry[]): LiftingDay[] => {
  const days = groupBy(spreadsheetEntries, (entry) => entry.date);

  const groupedSpreadsheetEntries = Object.values(days);
  if (!groupedSpreadsheetEntries) {
    throw new Error("Found no spreadsheet entries to convert to lifting days");
  }

  return groupedSpreadsheetEntries.map(spreadsheetEntriesToLiftingDay);
}