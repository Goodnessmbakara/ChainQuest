import { Link } from 'react-router-dom';
import { WalletButton } from '../wallet/WalletButton';
import { Swords } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Swords className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            ChainQuest
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/quests" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Quests
          </Link>
          <Link to="/leaderboard" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Leaderboard
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Dashboard
          </Link>
        </div>

        {/* Wallet Connection */}
        <WalletButton />
      </div>
    </nav>
  );
};
