import { useWallet } from '../../hooks/useWallet';
import { authenticate } from './WalletProvider';
import { Wallet, LogOut } from 'lucide-react';

export const WalletButton = () => {
  const { isConnected, truncatedAddress, balance, disconnect } = useWallet();

  const handleConnect = async () => {
    await authenticate();
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden flex-col items-end sm:flex">
          <span className="text-xs font-medium text-gray-400">Balance</span>
          <span className="text-sm font-bold text-violet-400">{balance} STX</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 transition-all hover:bg-white/10">
          <div className="flex items-center gap-2 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-sm font-medium text-white">{truncatedAddress}</span>
          </div>
          <button
            onClick={disconnect}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-white/10 hover:text-red-400"
            title="Disconnect"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-violet-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95"
    >
      <Wallet className="h-4 w-4 transition-transform group-hover:-rotate-12" />
      <span>Connect Wallet</span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
    </button>
  );
};
