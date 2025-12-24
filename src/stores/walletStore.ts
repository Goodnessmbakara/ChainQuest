import { create } from 'zustand';
import type { SessionTypes } from '@walletconnect/types';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  session: SessionTypes.Struct | null;
  connect: (address: string, session: SessionTypes.Struct) => void;
  disconnect: () => void;
  setBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: 0,
  session: null,
  
  connect: (address: string, session: SessionTypes.Struct) => 
    set({ isConnected: true, address, session }),
  
  disconnect: () => {
    set({ isConnected: false, address: null, balance: 0, session: null });
  },
  
  setBalance: (balance: number) => set({ balance }),
}));
