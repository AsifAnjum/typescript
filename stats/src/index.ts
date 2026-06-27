import { MatchReader } from './match-reader';
import { Summary } from './summary';
import { WinsAnalysis } from './analyzer/wins-analysis';
import { ConsoleReport } from './report-targets/console-report';


const matchReader = MatchReader.fromCsv('football.csv');

matchReader.load();

const manUnitedSummary = new Summary(
    new WinsAnalysis('Man United'),
    new ConsoleReport()
)

manUnitedSummary.buildAndPrintReport(matchReader.matches)

const tottenhamSummary = Summary.winsAnalysisWithHtmlReport('Tottenham');

tottenhamSummary.buildAndPrintReport(matchReader.matches)



