import SignClient from '@walletconnect/sign-client';
import { WalletConnectModal } from '@walletconnect/modal';

export const PROJECT_ID = import.meta.env.VITE_REOWN_PROJECT_ID || '8e40a029a288f34685f0ef32230a1036'; // Placeholder if not provided

export const STACKS_MAINNET_ID = 'stacks:1';
export const STACKS_TESTNET_ID = 'stacks:2147483648';

export const STACKS_NAMESPACES = {
  stacks: {
    chains: [STACKS_MAINNET_ID, STACKS_TESTNET_ID],
    methods: [
      'stacks_signTransaction',
      'stacks_signMessage',
      'stacks_stxTransfer',
      'stacks_contractCall',
      'stacks_contractDeploy',
    ],
    events: ['chainChanged', 'accountsChanged'],
  },
};

export const walletConnectModal = new WalletConnectModal({
  projectId: PROJECT_ID,
  chains: [STACKS_MAINNET_ID, STACKS_TESTNET_ID],
});

let signClient: SignClient | undefined;

export const getSignClient = async () => {
  if (signClient) return signClient;

  signClient = await SignClient.init({
    projectId: PROJECT_ID,
    metadata: {
      name: 'ChainQuest',
      description: 'Learn and earn on Stacks',
      url: window.location.origin,
      icons: [window.location.origin + '/vite.svg'],
    },
  });

  return signClient;
};
