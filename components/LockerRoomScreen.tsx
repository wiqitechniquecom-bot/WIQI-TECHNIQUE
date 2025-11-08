
import React, { useState } from 'react';
import { User } from '../types';
import { JERSEY_COLORS } from '../constants';

interface LockerRoomScreenProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

const LockerRoomScreen: React.FC<LockerRoomScreenProps> = ({ user, onUpdateUser, onBack }) => {
    const [selectedColor, setSelectedColor] = useState(user.jerseyColor);

    const handleSave = () => {
        onUpdateUser({ ...user, jerseyColor: selectedColor });
        onBack();
    };

    return (
        <div className="w-full max-w-xl mx-auto p-8 space-y-8 bg-black/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-2">
                    Locker Room
                </h1>
                <p className="text-gray-300">Customize your team's look</p>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <img src={user.avatarUrl} alt="Player Avatar" className="w-32 h-32 rounded-full border-4 border-gray-600 object-cover" />
                    <div 
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-gray-500" 
                        style={{ backgroundColor: selectedColor }}
                    ></div>
                </div>
                <h2 className="text-2xl font-bold">{user.username}</h2>
            </div>


            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Choose Your Jersey Color</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {JERSEY_COLORS.map(color => (
                        <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.hex)}
                            className={`p-2 rounded-lg text-center transition-all duration-200 border-2 ${
                                selectedColor === color.hex
                                ? 'border-white ring-2 ring-white'
                                : 'border-transparent hover:border-gray-400'
                            }`}
                            title={color.name}
                        >
                           <div className="w-full h-12 rounded-md" style={{ backgroundColor: color.hex }}></div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                    onClick={onBack}
                    className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
                >
                    Back to Menu
                </button>
                <button
                    onClick={handleSave}
                    className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform enabled:hover:scale-105"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default LockerRoomScreen;
