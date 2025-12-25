import { uintCV, cvToHex } from '@stacks/transactions';
import { signContractCall } from '../walletconnect/actions';
import { CONTRACT_ADDRESS } from '../stacks/client';

const CONTRACT_NAME = 'quest-manager';

export const startQuest = async (questId: number) => {
  const args = [cvToHex(uintCV(questId))];
  
  return signContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'start-quest',
    functionArgs: args,
  });
};

export const completeQuest = async (questId: number) => {
  // Mock proof - in production this would be a real hash of validation data
  // const mockProof = '...';  
  // Assuming the contract takes a buffer, we might need bufferCV. 
  // For simplicity if the contract takes a buf 32:
  // const proofArg = cvToHex(bufferCV(Buffer.from(mockProof, 'hex')));
  // But wait, the PRD said (proof (buff 32)). 
  // Let's assume for this mock integration we pass a dummy buffer hex.
  
  // Note: walletconnect args usually require hex strings of the serialized CV
  // cvToHex(bufferCV(Buffer.alloc(32))) -> 0x02 + 32 bytes...
  
  // To be safe with the 'partial mock' status, we might just call it without args if logic allows,
  // but the PRD signature is (complete-quest (quest-id uint) (proof (buff 32)))
  
  // Import bufferCV dynamically or statically
  const { bufferCV } = await import('@stacks/transactions');
  const args = [
    cvToHex(uintCV(questId)),
    cvToHex(bufferCV(new Uint8Array(32)))
  ];

  return signContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'complete-quest',
    functionArgs: args,
  });
};
