
import React, { useState, useEffect, useCallback } from 'react';
import { User, GameMode, Stadium, MatchConfig } from './types';
import { INITIAL_COINS, INITIAL_STATS, JERSEY_COLORS } from './constants';
import { countries } from './data/countries';
import LoginScreen from './components/LoginScreen';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import Header from './components/Header';
import EasyPayScreen from './components/EasyPayScreen';
import MatchmakingScreen from './components/MatchmakingScreen';
import TossScreen from './components/TossScreen';
import LockerRoomScreen from './components/LockerRoomScreen';


type Screen = 'login' | 'menu' | 'easypay' | 'lockerroom' | 'matchmaking' | 'toss' | 'game';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<Screen>('login');
  const [matchConfig, setMatchConfig] = useState<Partial<MatchConfig> | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('waqar_cricketer_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setScreen('menu');
    }
  }, []);

  const handleLogin = (username: string, country: string, avatarUrl: string) => {
    const newUser: User = {
      username,
      country,
      avatarUrl,
      coins: INITIAL_COINS,
      stats: INITIAL_STATS,
      jerseyColor: JERSEY_COLORS[0].hex,
    };
    localStorage.setItem('waqar_cricketer_user', JSON.stringify(newUser));
    setUser(newUser);
    setScreen('menu');
  };

  const handleLogout = () => {
    localStorage.removeItem('waqar_cricketer_user');
    setUser(null);
    setMatchConfig(null);
    setScreen('login');
  };
  
  const updateUser = useCallback((updatedUser: User) => {
      setUser(updatedUser);
      localStorage.setItem('waqar_cricketer_user', JSON.stringify(updatedUser));
  }, []);

  const handleSelectGameMode = (gameMode: GameMode) => {
    if (!user) return;
    const playerTeam = countries.find(c => c.name === user.country);
    if (!playerTeam) return;

    setMatchConfig({ gameMode, playerTeam });
    setScreen('matchmaking');
  }
  
  const handleMatchFound = (opponentTeam: { name: string; flag: string; }, stadium: Stadium) => {
    setMatchConfig(prev => ({ ...prev, opponentTeam, stadium }));
    setScreen('toss');
  };
  
  const handleTossComplete = (tossWinner: 'player' | 'opponent', decision: 'bat' | 'bowl') => {
    const playerIsBattingFirst = (tossWinner === 'player' && decision === 'bat') || (tossWinner === 'opponent' && decision === 'bowl');
    setMatchConfig(prev => ({ ...prev, tossWinner, decision, playerIsBattingFirst }));
    setScreen('game');
  }


  const exitGame = () => {
    setMatchConfig(null);
    setScreen('menu');
  }

  const renderContent = () => {
    if (!user) {
      return <LoginScreen onLogin={handleLogin} />;
    }
    switch(screen) {
        case 'menu':
            return <MainMenu user={user} onSelectGameMode={handleSelectGameMode} onEasyPayClick={() => setScreen('easypay')} onCustomizeClick={() => setScreen('lockerroom')} />;
        case 'easypay':
            return <EasyPayScreen user={user} updateUser={updateUser} onBack={() => setScreen('menu')} />;
        case 'lockerroom':
            return <LockerRoomScreen user={user} onUpdateUser={updateUser} onBack={() => setScreen('menu')} />;
        case 'matchmaking':
            if (matchConfig?.playerTeam) {
                 return <MatchmakingScreen playerTeam={matchConfig.playerTeam} onMatchFound={handleMatchFound} />;
            }
            return null;
        case 'toss':
            if (matchConfig?.playerTeam && matchConfig?.opponentTeam && matchConfig?.stadium) {
                return <TossScreen 
                    playerTeam={matchConfig.playerTeam} 
                    opponentTeam={matchConfig.opponentTeam} 
                    stadium={matchConfig.stadium}
                    onTossComplete={handleTossComplete} 
                />
            }
            return null;
        case 'game':
            if(matchConfig && matchConfig.gameMode && matchConfig.playerTeam && matchConfig.opponentTeam && matchConfig.stadium && typeof matchConfig.playerIsBattingFirst === 'boolean') {
                return <GameScreen user={user} matchConfig={matchConfig as Required<MatchConfig>} updateUser={updateUser} exitGame={exitGame} />;
            }
            return null; // Should not happen
        default:
             return <MainMenu user={user} onSelectGameMode={handleSelectGameMode} onEasyPayClick={() => setScreen('easypay')} onCustomizeClick={() => setScreen('lockerroom')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-[#e0e1dd] font-sans">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" 
        style={{backgroundImage: `url('https://source.unsplash.com/random/1920x1080/?cricket')`}}>
      </div>
      <div className="relative z-10 container mx-auto p-4 max-w-4xl">
        {user && <Header user={user} onLogout={handleLogout} />}
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
