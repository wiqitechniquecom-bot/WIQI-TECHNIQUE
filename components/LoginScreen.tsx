
import React, { useState } from 'react';
import { countries } from '../data/countries';
import { avatars } from '../data/avatars';

interface LoginScreenProps {
  onLogin: (username: string, country: string, avatarUrl: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim(), selectedCountry, selectedAvatar);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-500 mb-2">
                    Waqar Cricketer
                </h1>
                <p className="text-gray-300">Enter the world of virtual cricket</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                     <label htmlFor="avatar" className="text-sm font-bold text-gray-400 block mb-2">
                        Choose Your Avatar
                    </label>
                    <div className="flex justify-center gap-2 flex-wrap bg-gray-800/50 p-2 rounded-lg">
                        {avatars.map(avatar => (
                            <button
                                type="button"
                                key={avatar.id}
                                onClick={() => setSelectedAvatar(avatar.url)}
                                className={`p-1 rounded-full transition-all duration-200 ${
                                    selectedAvatar === avatar.url ? 'ring-2 ring-teal-400' : 'hover:ring-2 ring-gray-500'
                                }`}
                            >
                                <img src={avatar.url} alt={`Avatar ${avatar.id}`} className="w-12 h-12 rounded-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="username" className="text-sm font-bold text-gray-400 block mb-2">
                        Enter Your Name
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g., Cricketer123"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="country" className="text-sm font-bold text-gray-400 block mb-2">
                        Select Your Country
                    </label>
                    <select
                        id="country"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    >
                        {countries.map(country => (
                            <option key={country.name} value={country.name}>
                                {country.flag} {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                >
                    Start Playing
                </button>
            </form>
        </div>
    </div>
  );
};

export default LoginScreen;
