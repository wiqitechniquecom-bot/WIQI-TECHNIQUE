
import { UserStats } from './types';

export const INITIAL_COINS = 1000;
export const INITIAL_STATS: UserStats = {
  matchesPlayed: 0,
  totalRuns: 0,
  highScore: 0,
  wicketsTaken: 0,
  wins: 0,
};

export const GAME_CONFIG = {
    'Quick Play': {
        overs: 5,
        entryFee: 50,
        prize: 150,
    },
    'Tournament': {
        overs: 10,
        entryFee: 200,
        prize: 1000,
    },
    'Live Game': {
        overs: 20,
        entryFee: 0,
        prize: 0,
    }
}

export const JERSEY_COLORS = [
    { name: 'Classic Blue', hex: '#007bff' },
    { name: 'Victory Green', hex: '#28a745' },
    { name: 'Champion Red', hex: '#dc3545' },
    { name: 'Sunshine Yellow', hex: '#ffc107' },
    { name: 'Royal Purple', hex: '#6f42c1' },
    { name: 'Blaze Orange', hex: '#fd7e14' },
];
