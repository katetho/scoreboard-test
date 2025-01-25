import { Match } from "../types/Match";

export const sortMatches = (matches: Match[]): Match[] => {
    return [...matches].sort((a, b) => {
      const totalScoreDiff = (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore);
      return totalScoreDiff !== 0 ? totalScoreDiff : b.startTime - a.startTime;
    });
  };
