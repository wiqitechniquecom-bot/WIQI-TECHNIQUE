
import React from 'react';
import { GameState, MatchConfig, User } from '../types';

interface ScoreboardProps {
  gameState: GameState;
  matchConfig: MatchConfig;
  user: User;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ gameState, matchConfig, user }) => {
  const { playerTeam, opponentTeam, playerIsBattingFirst } = matchConfig;
  const { score, wickets, overs, balls, target, inning, firstInningScore } = gameState;

  const playerCurrentScore = playerIsBattingFirst ? (inning === 1 ? `${score}/${wickets}` : firstInningScore) : (inning === 2 ? `${score}/${wickets}` : 0);
  const opponentCurrentScore = !playerIsBattingFirst ? (inning === 1 ? `${score}/${wickets}` : firstInningScore) : (inning === 2 ? `${score}/${wickets}` : 0);

  const isPlayerBatting = (playerIsBattingFirst && inning === 1) || (!playerIsBattingFirst && inning === 2);
  
  const TeamDisplay: React.FC<{team: {name: string, flag: string}, score: string | number | null, isBatting: boolean, color?: string}> = ({team, score, isBatting, color}) => (
    <div className={`flex items-center gap-3 text-xl md:text-2xl font-bold ${isBatting ? 'text-white' : 'text-gray-400'}`}>
        <span className="text-2xl">{team.flag}</span>
        <span style={{ color: isBatting ? color || '#67e8f9' : undefined }}>{team.name.split(' ')[0].toUpperCase()}</span>
        <span className="text-white">{score ?? ''}</span>
        {isBatting && <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color || '#facc15' }}></div>}
    </div>
  );

  return (
    <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10 text-white font-mono">
      <div className="flex justify-between items-center mb-2">
        <TeamDisplay team={playerTeam} score={playerCurrentScore} isBatting={isPlayerBatting} color={user.jerseyColor} />
        <div className="text-lg text-right">
          <span>Overs: {overs}.{balls}</span>
        </div>
      </div>
       <div className="flex justify-between items-center">
        <TeamDisplay team={opponentTeam} score={opponentCurrentScore} isBatting={!isPlayerBatting} />
        {target > 0 && (
            <div className="text-lg text-right">
             <span>Target: </span><span className="font-bold text-yellow-400">{target}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
