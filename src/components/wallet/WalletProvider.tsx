import { useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getSignClient, STACKS_NAMESPACES, walletConnectModal } from '../../lib/walletconnect/client';
import { useWalletStore } from '../../stores/walletStore';

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { connect, disconnect } = useWalletStore();

  const onSessionDelete = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const initSignClient = useCallback(async () => {
    try {
      const client = await getSignClient();

      // Subscribe to events
      client.on('session_delete', onSessionDelete);
      client.on('session_expire', onSessionDelete);

      // Check for existing session
      const sessions = client.session.getAll();
      if (sessions.length > 0) {
        const session = sessions[0];
        const account = session.namespaces.stacks?.accounts[0];
        if (account) {
          const address = account.split(':')[2];
          connect(address, session);
        }
      }
    } catch (error) {
      console.error('Failed to initialize SignClient:', error);
    }
  }, [connect, onSessionDelete]);

  useEffect(() => {
    initSignClient();
  }, [initSignClient]);

  return <>{children}</>;
};

export const authenticate = async () => {
  try {
    const client = await getSignClient();

    const { uri, approval } = await client.connect({
      requiredNamespaces: STACKS_NAMESPACES,
    });

    if (uri) {
      walletConnectModal.openModal({ uri });
    }

    const session = await approval();
    const account = session.namespaces.stacks?.accounts[0];
    
    if (account) {
      const address = account.split(':')[2];
      // Note: We access the store directly for the one-shot authenticate call
      // In a real app, this should be handled by the provider's state
      useWalletStore.getState().connect(address, session);
    }

    walletConnectModal.closeModal();
  } catch (error) {
    console.error('Authentication failed:', error);
    walletConnectModal.closeModal();
  }
};
