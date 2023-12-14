import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { finished } from 'stream/promises';
import { SpreadsheetEntry } from "@tendec/shared-types/src/types";

interface RawSpreadsheetEntry {
  date: string,
  bodyWeight: string,
  exerciseName: string,
  repetitions: string,
  liftedWeight: string
}

const convertRawSpreadsheetEntry = (rawEntry: RawSpreadsheetEntry): SpreadsheetEntry => {
  return {
    date: rawEntry.date,
    bodyWeight: Number(rawEntry.bodyWeight),
    exerciseName: rawEntry.exerciseName,
    repetitions: Number(rawEntry.repetitions),
    liftedWeight: Number(rawEntry.liftedWeight),
  }
}
export const loadData = async (): Promise<SpreadsheetEntry[]> => {
  const csvFilePath = path.resolve(__dirname, '../../data/data.csv');

  const headers = [ "date", "bodyWeight", "exerciseName", "repetitions", "liftedWeight"];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  let csvData: RawSpreadsheetEntry[] = [];
  const parser = parse(fileContent, {
    delimiter: ',',
    columns: headers,
  });
  parser.on('readable', function(){
    let record; while ((record = parser.read()) !== null) {
      csvData.push(record);
    }
  });
  await finished(parser);
  return csvData.map(convertRawSpreadsheetEntry);
};