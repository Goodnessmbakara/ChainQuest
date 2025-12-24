import { AppConfig, UserSession } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

// Configuration
export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

// Network
const isMainnet = import.meta.env.VITE_STACKS_NETWORK === 'mainnet';
export const network = isMainnet ? new StacksMainnet() : new StacksTestnet();

// Contract Address
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

export const getContractIdentifier = (contractName: string) => {
  return `${CONTRACT_ADDRESS}.${contractName}`;
};

// Utilities
export function truncateAddress(address: string) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
