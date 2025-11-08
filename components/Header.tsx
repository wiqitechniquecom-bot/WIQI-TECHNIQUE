
import React from 'react';
import { User } from '../types';
import { countries } from '../data/countries';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const country = countries.find(c => c.name === user.country);

  return (
    <header className="flex justify-between items-center bg-black/30 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/10">
      <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-500">
        Waqar Cricketer
      </h1>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-white flex items-center gap-2 justify-end">
            <span>{user.username}</span>
            {country && <span className="text-xl" title={country.name}>{country.flag}</span>}
          </p>
          <p className="text-sm text-yellow-400">{user.coins.toLocaleString()} Coins</p>
        </div>
        <img src={user.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-teal-400 object-cover" />
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
