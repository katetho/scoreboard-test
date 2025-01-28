import React, { useState } from "react";
import { Match } from "../types/Match";
import { sortMatches } from "../utils/MatchSorter";

const ScoreBoard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const startGame = () => {
    if (homeTeam && awayTeam) {
      const newMatch: Match = { homeTeam, awayTeam, homeScore: 0, awayScore: 0, startTime: Date.now() };
      setMatches([...matches, newMatch]);
      setHomeTeam("");
      setAwayTeam("");
    }
  };

  const updateScore = (homeTeam: string, awayTeam: string) => {
    setMatches(matches.map(match =>
      match.homeTeam === homeTeam && match.awayTeam === awayTeam
        ? { ...match, homeScore, awayScore }
        : match
    ));
  };

  const finishGame = (homeTeam: string, awayTeam: string) => {
    setMatches(matches.filter(match => !(match.homeTeam === homeTeam && match.awayTeam === awayTeam)));
  };

  return (
    <div>
      <h1>Live Football Scoreboard</h1>

      {/* Form to start a new game */}
      <div>
        <h2>Start a New Game</h2>
        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <button onClick={startGame}>Start Game</button>
      </div>

      {/* List of ongoing matches */}
      <ul>
        {sortMatches(matches).map(({ homeTeam, awayTeam, homeScore: matchHomeScore, awayScore: matchAwayScore }) => (
          <li key={`${homeTeam}-${awayTeam}`}>
            <span>{homeTeam} {matchHomeScore} - {awayTeam} {matchAwayScore}</span>
            {/* Form to update scores */}
            <div>
              <input
                type="number"
                placeholder="Home Score"
                value={homeScore}
                onChange={(e) => setHomeScore(parseInt(e.target.value || "0"))}
              />
              <input
                type="number"
                placeholder="Away Score"
                value={awayScore}
                onChange={(e) => setAwayScore(parseInt(e.target.value || "0"))}
              />
              <button onClick={() => updateScore(homeTeam, awayTeam)}>
                Update Score
              </button>
            </div>
            {/* Button to finish the game */}
            <button onClick={() => finishGame(homeTeam, awayTeam)}>Finish Game</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;
