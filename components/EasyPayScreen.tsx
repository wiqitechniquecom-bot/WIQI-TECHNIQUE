import React, { useState } from 'react';
import { User } from '../types';
import EasypaisaIcon from './icons/EasypaisaIcon';

interface CoinPackage {
    id: string;
    usd: number;
    coins: number;
    bonusText: string;
}

const coinPackages: CoinPackage[] = [
    { id: 'pack1', usd: 5, coins: 5000, bonusText: 'Standard Pack' },
    { id: 'pack2', usd: 10, coins: 12000, bonusText: '20% Bonus!' },
    { id: 'pack3', usd: 20, coins: 25000, bonusText: '25% Bonus!' },
];

const VisaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 24" fill="none" width="48" height="32">
      <path d="M48.96 15.84h2.52l-6-15.6h-3.36l-6 15.6h2.88l1.2-3.24h6.24l.72 3.24zm-4.32-5.4L46.44 5l1.8 5.44h-3.6zM61.316 8.4c.312-.48.432-.84.432-1.2 0-1.2-.984-1.8-2.736-1.8-1.128 0-1.992.36-2.616.648l.456 2.304c.48-.24.984-.408 1.56-.408.672 0 .96.24.96.696 0 .288-.168.48-.528.672l-1.656.96c-2.4.984-3.12 2.232-3.12 3.84 0 2.28 1.632 3.312 3.936 3.312 1.44 0 2.592-.48 3.264-.84l-.504-2.352c-.6.312-1.296.504-2.112.504-.792 0-1.2-.288-1.2-.816 0-.48.336-.72.912-.96l2.16-1.296c1.32-.576 1.944-1.464 1.944-2.688zM68.444.24L65.072 15.84h2.76l3.372-15.6h-2.76zM32.672 0l-6.36 11.232-1.224-6.48L22.28 0h-2.928l5.424 15.6h2.16l7.32-15.6zM20.984 3.12c0-.96-.456-1.32-.984-1.56l-.312-.096c-.36-.096-1.104-.336-2.52-.336-2.904 0-5.064 1.536-5.064 4.056 0 2.016 1.344 3.288 3.408 3.912l.24.072c1.032.288 1.584.576 1.584 1.152 0 .768-.84 1.176-1.92 1.176-1.44 0-2.328-.312-3.24-.768l-.6 2.376c.96.48 2.256.792 3.96.792 3.24 0 5.4-1.608 5.4-4.224 0-2.232-1.632-3.432-3.864-4.032l-.24-.072c-.936-.264-1.464-.528-1.464-1.056 0-.528.528-.96 1.608-.96.96 0 1.56.168 2.16.432l.504-2.28z" fill="#142688"/>
    </svg>
);
const MastercardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
    <circle cx="7" cy="12" r="7" fill="#EA001B"/>
    <circle cx="17" cy="12" r="7" fill="#F79E1B"/>
    <path d="M12 12a7 7 0 0 1-5-2.22 7 7 0 0 0 0 4.44A7 7 0 0 1 12 12z" fill="#FF5F00"/>
  </svg>
);


interface EasyPayScreenProps {
  user: User;
  updateUser: (user: User) => void;
  onBack: () => void;
}

const EasyPayScreen: React.FC<EasyPayScreenProps> = ({ user, updateUser, onBack }) => {
    const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(coinPackages[1]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPackage) {
            setError('Please select a package to purchase.');
            return;
        }
        setError(null);
        setIsProcessing(true);

        // Simulate API call to payment gateway
        setTimeout(() => {
            const updatedUser: User = {
                ...user,
                coins: user.coins + selectedPackage.coins,
            };
            updateUser(updatedUser);
            setIsProcessing(false);
            onBack(); // Go back to menu after successful purchase
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 space-y-8 bg-black/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mb-2">
                    Easy Pay
                </h1>
                <p className="text-gray-300">Top up your coins to keep playing!</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Select a Coin Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {coinPackages.map(pack => (
                        <button
                            key={pack.id}
                            onClick={() => setSelectedPackage(pack)}
                            className={`p-4 rounded-lg text-center transition border-2 ${
                                selectedPackage?.id === pack.id
                                ? 'border-teal-400 bg-teal-900/50'
                                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                            }`}
                        >
                            <p className="text-2xl font-bold text-white">{pack.coins.toLocaleString()}</p>
                            <p className="text-yellow-400">Coins</p>
                            <p className="mt-2 text-lg font-semibold">${pack.usd}</p>
                            <p className="text-sm text-teal-300">{pack.bonusText}</p>
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-6">
                <fieldset className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <legend className="text-xl font-semibold text-center px-4">Payment Details</legend>
                    <div className="flex justify-center items-center gap-4 my-4">
                        <span className="text-sm text-gray-400">We Accept:</span>
                        <VisaIcon />
                        <MastercardIcon />
                        <EasypaisaIcon />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="card-number" className="text-sm font-bold text-gray-400 block mb-2">Card Number</label>
                            <input id="card-number" type="text" placeholder="**** **** **** 1234" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition cursor-not-allowed" disabled />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="expiry" className="text-sm font-bold text-gray-400 block mb-2">Expiry Date</label>
                                <input id="expiry" type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition cursor-not-allowed" disabled/>
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="cvc" className="text-sm font-bold text-gray-400 block mb-2">CVC</label>
                                <input id="cvc" type="text" placeholder="123" className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition cursor-not-allowed" disabled/>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <p className="text-xs text-gray-500 text-center -mt-4 relative">This is a simulation. No real payment will be processed.</p>

                {error && <p className="text-red-400 text-center">{error}</p>}

                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
                    >
                        Back to Menu
                    </button>
                    <button
                        type="submit"
                        disabled={!selectedPackage || isProcessing}
                        className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform enabled:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Processing...' : `Pay $${selectedPackage?.usd || 0} and Get Coins`}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EasyPayScreen;