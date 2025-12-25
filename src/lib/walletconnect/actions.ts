import { getSignClient } from './client';
import { useWalletStore } from '../../stores/walletStore';


export interface StacksTransactionRequest {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: string[]; // Serialized arguments
  postConditions?: string[]; // Serialized post conditions
}

export const signContractCall = async (request: StacksTransactionRequest) => {
  const signClient = await getSignClient();
  const session = useWalletStore.getState().session;

  if (!session) {
    throw new Error('No active wallet session');
  }

  const { contractAddress, contractName, functionName, functionArgs, postConditions } = request;
  const chainId = 'stacks:2147483648'; // Testnet by default for this challenge
  const [namespace] = chainId.split(':');
  
  // Find the account matching the chain
  const account = session.namespaces[namespace]?.accounts.find(
    (acc) => acc.startsWith(chainId)
  );

  if (!account) {
    throw new Error(`No account found for chain ${chainId}`);
  }

  // const [_, __, address] = account.split(':');

  const topic = session.topic;

  try {
    const result = await signClient.request({
      topic,
      chainId,
      request: {
        method: 'stacks_contractCall',
        params: {
          anchorMode: 3, // Any
          contractAddress,
          contractName,
          functionName,
          functionArgs,
          postConditions,
          postConditionMode: 0x01, // Allow
          version: '1', // Testnet
        },
      },
    });

    return result; // Transaction ID
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};
