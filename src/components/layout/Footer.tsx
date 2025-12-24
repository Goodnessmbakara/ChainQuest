import { Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-xl font-bold text-white">ChainQuest</span>
            <p className="text-sm text-gray-400">
              Build the future of Bitcoin Layer 2 on Stacks.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/Goodnessmbakara/ChainQuest" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} ChainQuest. Built for the Stacks + WalletConnect Builder Challenge.
        </div>
      </div>
    </footer>
  );
};
