import { create } from 'zustand';
import { userSession } from '../lib/stacks/client';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connect: (address: string) => void;
  disconnect: () => void;
  setBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: userSession.isUserSignedIn(),
  address: userSession.isUserSignedIn() 
    ? userSession.loadUserData().profile.stxAddress.testnet 
    : null,
  balance: 0,
  
  connect: (address: string) => set({ isConnected: true, address }),
  
  disconnect: () => {
    userSession.signUserOut();
    set({ isConnected: false, address: null, balance: 0 });
  },
  
  setBalance: (balance: number) => set({ balance }),
}));
