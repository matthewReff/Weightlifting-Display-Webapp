import { groupBy } from "lodash";
import { Lift, LiftingDay, Set, SpreadsheetEntry } from "./types"

export const liftingDayToSpreadsheetEntires = (liftingDay: LiftingDay): SpreadsheetEntry[] => {
  const { date, bodyWeight, lifts } = liftingDay;
  const spreadsheetEntires: SpreadsheetEntry[] = [];
  for(const liftEntry of lifts) {
    const { exerciseName, sets } = liftEntry;
    for(const setEntry of sets) {
      const { liftedWeight, repetitions } = setEntry;

      spreadsheetEntires.push({
        date,
        bodyWeight,
        exerciseName,
        repetitions,
        liftedWeight,
      });
    }
  }
  return spreadsheetEntires;
}

export const spreadsheetEntriesToLiftingDay = (spreadsheetEntries: SpreadsheetEntry[]): LiftingDay => {
  const date = spreadsheetEntries[0]?.date;
  const bodyWeight = spreadsheetEntries[0]?.bodyWeight;

  if (date === undefined || bodyWeight === undefined) {
    throw new Error("Could not find data from spreadsheet Entries");
  }

  const exercises = groupBy(spreadsheetEntries, (entry) => entry.exerciseName);

  const lifts: Lift[] = [];
  for(const entriesForExercise of Object.values(exercises)) {
    const exerciseName = entriesForExercise[0]?.exerciseName;
    if (!exerciseName) {
      throw new Error("Could not find data from spreadsheet Entries");
    }

    const sets: Set[] = [];
    for(const setEntry of entriesForExercise) {
      const { repetitions, liftedWeight } = setEntry;

      sets.push({
        liftedWeight,
        repetitions,
      });
    }
    lifts.push({
      exerciseName,
      sets,
    });
  }

  return {
    date,
    bodyWeight,
    lifts,
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