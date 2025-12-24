import { useWalletStore } from '../stores/walletStore';

export const useWallet = () => {
  const { isConnected, address, balance, session, disconnect } = useWalletStore();

  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return {
    isConnected,
    address,
    balance,
    session,
    truncatedAddress,
    disconnect,
  };
};
