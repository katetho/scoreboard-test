import { sortMatches } from '../src/utils/MatchSorter';
import { Match } from '../src/types/Match';

describe('MatchSorter', () => {
  test('should handle empty match list', () => {
    const matches: Match[] = [];
    const sorted = sortMatches(matches);
    expect(sorted).toEqual([]);
  });

  test('should handle matches with the same total score and start time', () => {
    const matches: Match[] = [
      { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 1, awayScore: 1, startTime: 1 },
      { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 1, awayScore: 1, startTime: 1 },
    ];
    const sorted = sortMatches(matches);
    expect(sorted).toEqual(matches);
  });

  test('should handle matches with the same total score and different start time', () => {
    const matches: Match[] = [
      { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 1, awayScore: 1, startTime: 1 },
      { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 1, awayScore: 1, startTime: 2 },
    ];
    const sorted = sortMatches(matches);
    expect(sorted).toEqual([
      { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 1, awayScore: 1, startTime: 2 },
      { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 1, awayScore: 1, startTime: 1 },
    ]);
  });

  test('should handle matches with different total score and same start time', () => {
    const matches: Match[] = [
      { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 3, awayScore: 2, startTime: 1 },
      { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 2, awayScore: 3, startTime: 1 },
    ];
    const sorted = sortMatches(matches);
    expect(sorted).toEqual([
      { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 3, awayScore: 2, startTime: 1 },
      { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 2, awayScore: 3, startTime: 1 },
    ]);
  });

  test('should sort matches with mixed total scores and times', () => {
    const matches: Match[] = [
      { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 3, awayScore: 2, startTime: 3 },
      { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 4, awayScore: 1, startTime: 2 },
      { homeTeam: 'Team 5', awayTeam: 'Team 6', homeScore: 2, awayScore: 2, startTime: 1 },
    ];
    const sorted = sortMatches(matches);
    expect(sorted).toEqual([
      { homeTeam: 'Team 1', awayTeam: 'Team 2', homeScore: 3, awayScore: 2, startTime: 3 },
      { homeTeam: 'Team 3', awayTeam: 'Team 4', homeScore: 4, awayScore: 1, startTime: 2 },
      { homeTeam: 'Team 5', awayTeam: 'Team 6', homeScore: 2, awayScore: 2, startTime: 1 },
    ]);
  });
});
