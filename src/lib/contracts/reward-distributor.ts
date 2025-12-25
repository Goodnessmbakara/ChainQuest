import { signContractCall } from '../walletconnect/actions';
import { CONTRACT_ADDRESS } from '../stacks/client';

const CONTRACT_NAME = 'reward-distributor';

export const claimRewards = async () => {
  return signContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'claim-rewards',
    functionArgs: [], // No args needed for basic claim
  });
};
