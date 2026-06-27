import { MatchData } from "../match-data";
import { MatchResult } from "../match-result";
import { Analyzer } from "../summary";

export class WinsAnalysis implements Analyzer {
    constructor(public team: string){};
    
    public run(matches: MatchData[]): string{

    let wins = 0;

    for(let match of matches){
    if(match[1] === this.team && match[5] === MatchResult.HomeWin){
        wins++;
    } else if(match[2] === this.team && match[5] === MatchResult.AwayWin){
        wins++;
    }
        }
        
    return `Team ${this.team} won ${wins} games`
    }
}