import { WinsAnalysis } from "./analyzer/wins-analysis";
import { MatchData } from "./match-data";
import { HtmlReport } from "./report-targets/html-report";

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {

    static winsAnalysisWithHtmlReport(team: string): Summary {
        return new Summary(
            new WinsAnalysis(team),
            new HtmlReport()
        )
    }
  
    constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  public buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output)
  }
  
}   

