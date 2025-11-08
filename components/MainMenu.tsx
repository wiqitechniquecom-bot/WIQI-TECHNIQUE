
import React from 'react';
import { User, GameMode } from '../types';
import { GAME_CONFIG } from '../constants';
import CoinIcon from './icons/CoinIcon';

interface MainMenuProps {
  user: User;
  onSelectGameMode: (mode: GameMode) => void;
  onEasyPayClick: () => void;
  onCustomizeClick: () => void;
}

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-white/5 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-teal-300">{value}</p>
    </div>
);

const GameModeButton: React.FC<{
    mode: GameMode;
    config: { entryFee: number; prize: number };
    userCoins: number;
    onSelect: (mode: GameMode) => void;
}> = ({ mode, config, userCoins, onSelect }) => {
    const canAfford = userCoins >= config.entryFee || config.entryFee === 0;

    return (
        <button
            onClick={() => onSelect(mode)}
            disabled={!canAfford}
            className={`w-full p-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 ${
                canAfford
                ? 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 border border-white/10'
                : 'bg-gray-800/50 cursor-not-allowed opacity-50 border border-red-500/20'
            }`}
        >
            <h3 className="text-2xl font-bold text-white">{mode}</h3>
            {config.entryFee > 0 ? (
                <>
                    <p className="text-yellow-400 mt-2">Entry: {config.entryFee} Coins</p>
                    <p className="text-green-400">Prize: {config.prize} Coins</p>
                </>
            ) : (
                <p className="text-gray-400 mt-2">Watch a simulated match</p>
            )}
            {!canAfford && <p className="text-red-400 text-sm mt-2">Not enough coins</p>}
        </button>
    );
};

const MainMenu: React.FC<MainMenuProps> = ({ user, onSelectGameMode, onEasyPayClick, onCustomizeClick }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Welcome, {user.username}!</h2>
        <p className="text-gray-400">Ready to hit some sixes?</p>
      </div>

      <div className="p-6 bg-black/30 backdrop-blur-sm rounded-xl shadow-lg border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-center text-teal-300">Your Career Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Matches" value={user.stats.matchesPlayed} />
              <StatCard label="Total Runs" value={user.stats.totalRuns} />
              <StatCard label="High Score" value={user.stats.highScore} />
              <StatCard label="Wins" value={user.stats.wins} />
          </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gradient-to-r from-teal-500/20 to-sky-600/20 rounded-xl border border-teal-400/30 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold text-white">Need more coins?</h3>
                <p className="text-gray-300 mb-4">Use Easy Pay to top up!</p>
                <button 
                    onClick={onEasyPayClick}
                    className="flex items-center justify-center gap-2 w-full md:w-auto py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                >
                    <CoinIcon className="w-6 h-6" />
                    <span>Get Coins</span>
                </button>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-xl border border-purple-400/30 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold text-white">Customize Your Team</h3>
                <p className="text-gray-300 mb-4">Change your jersey color!</p>
                <button 
                    onClick={onCustomizeClick}
                    className="flex items-center justify-center gap-2 w-full md:w-auto py-3 px-6 bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-bold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                >
                    <span>Locker Room</span>
                </button>
            </div>
        </div>

      <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Select Game Mode</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GameModeButton mode={GameMode.QuickPlay} config={GAME_CONFIG[GameMode.QuickPlay]} userCoins={user.coins} onSelect={onSelectGameMode} />
              <GameModeButton mode={GameMode.Tournament} config={GAME_CONFIG[GameMode.Tournament]} userCoins={user.coins} onSelect={onSelectGameMode} />
              <GameModeButton mode={GameMode.LiveGame} config={GAME_CONFIG[GameMode.LiveGame]} userCoins={user.coins} onSelect={onSelectGameMode} />
          </div>
      </div>
    </div>
  );
};

export default MainMenu;
