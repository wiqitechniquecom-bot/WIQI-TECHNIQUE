
import React, { useState, useEffect } from 'react';
import { Stadium } from '../types';
import { countries } from '../data/countries';
import { stadiums } from '../data/stadiums';

interface MatchmakingScreenProps {
  playerTeam: { name: string; flag: string };
  onMatchFound: (opponentTeam: { name: string; flag: string }, stadium: Stadium) => void;
}

const MatchmakingScreen: React.FC<MatchmakingScreenProps> = ({ playerTeam, onMatchFound }) => {
    const [opponentTeam, setOpponentTeam] = useState<{ name: string; flag: string } | null>(null);
    const [status, setStatus] = useState('Searching for opponent...');

    useEffect(() => {
        const timer1 = setTimeout(() => {
            let availableOpponents = countries.filter(c => c.name !== playerTeam.name);
            const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
            setOpponentTeam(randomOpponent);
            setStatus('Opponent Found!');
        }, 3000);

        const timer2 = setTimeout(() => {
            const randomStadium = stadiums[Math.floor(Math.random() * stadiums.length)];
            const opponent = countries.filter(c => c.name !== playerTeam.name)[0]; // Fallback
            
             // Ensure opponentTeam is set before calling onMatchFound
            setOpponentTeam(prevOpponent => {
                const finalOpponent = prevOpponent || opponent;
                onMatchFound(finalOpponent, randomStadium);
                return finalOpponent;
            });

        }, 5000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onMatchFound, playerTeam.name]);
    
    const TeamCard: React.FC<{team: {name: string, flag: string} | null; isPlayer: boolean}> = ({team, isPlayer}) => (
        <div className={`flex flex-col items-center justify-center p-8 rounded-2xl w-48 h-56 transition-all duration-500 ${isPlayer ? 'bg-blue-900/50' : (team ? 'bg-red-900/50' : 'bg-gray-800/50')}`}>
            {team ? (
                <>
                    <span className="text-6xl mb-4">{team.flag}</span>
                    <h3 className="text-2xl font-bold">{team.name}</h3>
                </>
            ) : (
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-100"></div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-2xl p-8 space-y-8 bg-black/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-500 mb-2">
                        Matchmaking
                    </h1>
                </div>
                <div className="flex justify-around items-center">
                    <TeamCard team={playerTeam} isPlayer={true} />
                    <span className="text-4xl font-bold text-gray-400">VS</span>
                    <TeamCard team={opponentTeam} isPlayer={false} />
                </div>
                 <div className="text-center">
                    <p className="text-xl text-yellow-400 animate-pulse">{status}</p>
                </div>
            </div>
        </div>
    );
};

export default MatchmakingScreen;
