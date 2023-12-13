import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { finished } from 'stream/promises';
import { SpreadsheetEntry } from "@tendec/shared-types/src/types";

export const loadData = async (): Promise<SpreadsheetEntry[]> => {
  const csvFilePath = path.resolve(__dirname, '../../data/data.csv');

  const headers = [ "date", "bodyWeight", "exerciseName", "repetitions", "liftedWeight"];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  let csvData: SpreadsheetEntry[] = [];
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
  return csvData;
};

/*
const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(`${os.tmpdir()}/input.csv`)
    .pipe(parse({
    // CSV options if any
    }));
  parser.on('readable', function(){
    let record; while ((record = parser.read()) !== null) {
    // Work with each record
      records.push(record);
    }
  });
  await finished(parser);
  return records;
};
// Parse the CSV content
const records = await processFile();
*/