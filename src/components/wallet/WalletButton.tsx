import { useWallet } from '../../hooks/useWallet';

export const WalletButton = () => {
  const { isConnected, truncatedAddress, authenticate, disconnect, balance } = useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-sm font-medium text-gray-200">
          {balance} STX
        </div>
        <button
          onClick={disconnect}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          {truncatedAddress}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={authenticate}
      className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-violet-500/30 transition-all hover:scale-105"
    >
      Connect Wallet
    </button>
  );
};
