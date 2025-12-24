import { useWalletStore } from '../stores/walletStore';
import { authenticate } from '../components/wallet/WalletProvider';
import { truncateAddress } from '../lib/stacks/client';

export const useWallet = () => {
  const store = useWalletStore();
  
  return {
    ...store,
    authenticate,
    truncatedAddress: truncateAddress(store.address || ''),
  };
};
