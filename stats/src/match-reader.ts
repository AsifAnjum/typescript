import { CsvFileReader } from "./csv-file-reader";
import { MatchData } from "./match-data";
import { MatchResult } from "./match-result";
import { dateStringToDate } from "./utils";

interface DataReader {
  read(): void;
  data: string[][]
}

export class MatchReader {

  static fromCsv(fileName: string): MatchReader{
    return new MatchReader(new CsvFileReader(fileName))
  }

  matches: MatchData[] = [];
  constructor(public reader: DataReader){}

  public load(): void {
  this.reader.read();
   this.matches = this.reader.data.map((row:string[]): MatchData => {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchResult,
        row[6]
      ]
    })
  }

}