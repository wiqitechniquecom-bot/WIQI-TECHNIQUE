
import React, { useState } from 'react';
import { Stadium } from '../types';

interface TossScreenProps {
  playerTeam: { name: string; flag: string };
  opponentTeam: { name: string; flag: string };
  stadium: Stadium;
  onTossComplete: (tossWinner: 'player' | 'opponent', decision: 'bat' | 'bowl') => void;
}

const TossScreen: React.FC<TossScreenProps> = ({ playerTeam, opponentTeam, stadium, onTossComplete }) => {
    const [step, setStep] = useState<'call' | 'result' | 'decision'>('call');
    const [tossResult, setTossResult] = useState<{ call: 'Heads' | 'Tails', outcome: 'Heads' | 'Tails', winner: 'player' | 'opponent' } | null>(null);

    const handleTossCall = (call: 'Heads' | 'Tails') => {
        const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
        const winner = call === outcome ? 'player' : 'opponent';
        setTossResult({ call, outcome, winner });
        setStep('result');
        
        if (winner === 'opponent') {
            // Simulate opponent's decision
            setTimeout(() => {
                const decision = Math.random() < 0.5 ? 'bat' : 'bowl';
                onTossComplete('opponent', decision);
            }, 3000);
        }
    };
    
    const renderContent = () => {
        switch (step) {
            case 'call':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-6">It's time for the toss!</h2>
                        <div className="flex justify-center items-center gap-4 mb-6">
                            <span className="text-4xl">{playerTeam.flag}</span>
                             <p className="text-xl font-bold">{playerTeam.name}</p>
                             <p className="text-xl font-bold text-gray-400">vs</p>
                             <p className="text-xl font-bold">{opponentTeam.name}</p>
                             <span className="text-4xl">{opponentTeam.flag}</span>
                        </div>
                        <p className="mb-4 text-lg">Your call:</p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => handleTossCall('Heads')} className="w-32 py-3 px-4 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">Heads</button>
                            <button onClick={() => handleTossCall('Tails')} className="w-32 py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">Tails</button>
                        </div>
                    </div>
                );
            case 'result':
                 if (!tossResult) return null;
                 const win = tossResult.winner === 'player';
                 return (
                     <div className="text-center animate-fade-in">
                        <p className="text-lg">You called {tossResult.call}. It's {tossResult.outcome}.</p>
                        <h2 className={`text-3xl font-bold mt-4 mb-6 ${win ? 'text-green-400' : 'text-red-400'}`}>
                            {win ? "You won the toss!" : `${opponentTeam.name} won the toss.`}
                        </h2>
                        {win ? (
                            <div>
                                <p className="text-lg mb-4">What do you want to do?</p>
                                <div className="flex gap-4 justify-center">
                                    <button onClick={() => onTossComplete('player', 'bat')} className="w-32 py-3 px-4 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-semibold rounded-lg shadow-lg transition">Bat First</button>
                                    <button onClick={() => onTossComplete('player', 'bowl')} className="w-32 py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg transition">Bowl First</button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-lg animate-pulse">{opponentTeam.name} is deciding...</p>
                        )}
                     </div>
                 );
            default:
                return null;
        }
    }


    return (
         <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-xl p-8 space-y-4 bg-black/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-500 mb-2">
                        Coin Toss
                    </h1>
                     <p className="text-gray-400">Match at {stadium.name}, {stadium.city}</p>
                </div>
                <div className="p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default TossScreen;
