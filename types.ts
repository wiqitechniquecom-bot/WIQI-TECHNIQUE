
export interface UserStats {
  matchesPlayed: number;
  totalRuns: number;
  highScore: number;
  wicketsTaken: number; // Placeholder for future bowling feature
  wins: number;
}

export interface User {
  username: string;
  country: string;
  avatarUrl: string;
  coins: number;
  stats: UserStats;
  jerseyColor: string;
}

export enum GameMode {
  QuickPlay = 'Quick Play',
  Tournament = 'Tournament',
  LiveGame = 'Live Game',
}

export enum ShotPlacement {
    OffSide = 'Off Side',
    Straight = 'Straight',
    LegSide = 'Leg Side'
}

export type Timing = 'perfect' | 'good' | 'early' | 'late' | 'miss';


export enum BallType {
    Fast = 'Fast',
    Spin = 'Spin',
    Yorker = 'Yorker',
    Bouncer = 'Bouncer'
}

export interface GameState {
    // Live action stats
    score: number; // of the team currently batting
    wickets: number; // of the team currently batting
    overs: number;
    balls: number;

    // Overall match stats
    target: number; // Set after 1st inning
    inning: 1 | 2;
    firstInningScore: number | null; // Store the first inning score here

    // Display & flow control
    commentary: string;
    isGameOver: boolean;
}

// FIX: Add missing Cricketer interface based on its usage in data/cricketers.ts and components/MatchSetupScreen.tsx
export interface Cricketer {
    id: string;
    name: string;
    avatarUrl: string;
}


export interface Stadium {
    id: string;
    name: string;
    city: string;
    imageUrl: string;
}

export interface MatchConfig {
    gameMode: GameMode;
    stadium: Stadium;
    playerTeam: { name: string; flag: string; };
    opponentTeam: { name: string; flag: string; };
    tossWinner: 'player' | 'opponent';
    decision: 'bat' | 'bowl';
    playerIsBattingFirst: boolean;
}
