import { ReactNode, useEffect } from 'react';
import { showConnect } from '@stacks/connect';
import { appConfig, userSession } from '../../lib/stacks/client';
import { useWalletStore } from '../../stores/walletStore';

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { connect } = useWalletStore();

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        connect(userData.profile.stxAddress.testnet);
      });
    }
  }, [connect]);

  return <>{children}</>;
};

export const authenticate = () => {
  showConnect({
    appDetails: {
      name: 'ChainQuest',
      icon: window.location.origin + '/vite.svg',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
};
