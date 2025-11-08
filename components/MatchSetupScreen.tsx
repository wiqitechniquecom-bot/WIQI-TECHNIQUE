
import React, { useState } from 'react';
import { User, GameMode, Stadium, Cricketer } from '../types';
import { stadiums } from '../data/stadiums';
import { cricketers } from '../data/cricketers';

interface MatchSetupScreenProps {
  user: User;
  gameMode: GameMode;
  onMatchStart: (stadium: Stadium, cricketer: Cricketer) => void;
  onBack: () => void;
}

const MatchSetupScreen: React.FC<MatchSetupScreenProps> = ({ user, gameMode, onMatchStart, onBack }) => {
    const [selectedStadiumId, setSelectedStadiumId] = useState<string | null>(stadiums[0].id);
    const [selectedCricketerId, setSelectedCricketerId] = useState<string | null>(cricketers[0].id);

    const handleStart = () => {
        const stadium = stadiums.find(s => s.id === selectedStadiumId);
        const cricketer = cricketers.find(c => c.id === selectedCricketerId);
        if (stadium && cricketer) {
            onMatchStart(stadium, cricketer);
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-8 space-y-8 bg-black/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-500 mb-2">
                    Match Setup
                </h1>
                <p className="text-gray-300">Prepare for your {gameMode} match!</p>
            </div>

            {/* Cricketer Selection */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Choose Your Cricketer</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                    {cricketers.map(cricketer => (
                        <button
                            key={cricketer.id}
                            onClick={() => setSelectedCricketerId(cricketer.id)}
                            className={`p-2 rounded-lg text-center transition border-2 ${
                                selectedCricketerId === cricketer.id
                                ? 'border-teal-400 bg-teal-900/50'
                                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                            }`}
                        >
                            <img src={cricketer.avatarUrl} alt={cricketer.name} className="w-20 h-20 rounded-full mx-auto border-2 border-transparent" />
                            <p className="mt-2 text-sm font-semibold">{cricketer.name}</p>
                        </button>
                    ))}
                </div>
            </div>

             {/* Stadium Selection */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Select a Stadium</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stadiums.map(stadium => (
                        <button
                            key={stadium.id}
                            onClick={() => setSelectedStadiumId(stadium.id)}
                            className={`relative p-2 rounded-lg text-left transition border-2 overflow-hidden h-32 ${
                                selectedStadiumId === stadium.id
                                ? 'border-teal-400'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                        >
                            <img src={stadium.imageUrl} alt={stadium.name} className="absolute top-0 left-0 w-full h-full object-cover opacity-30" />
                            <div className="relative z-10 flex flex-col justify-end h-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="font-bold text-lg text-white">{stadium.name}</p>
                                <p className="text-sm text-gray-300">{stadium.city}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                    onClick={onBack}
                    className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
                >
                    Back to Menu
                </button>
                <button
                    onClick={handleStart}
                    disabled={!selectedStadiumId || !selectedCricketerId}
                    className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform enabled:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Start Match
                </button>
            </div>
        </div>
    );
};

export default MatchSetupScreen;
