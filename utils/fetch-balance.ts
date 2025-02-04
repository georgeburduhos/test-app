import { FUJI_RPC_URL } from '@env';
import { ethers } from 'ethers';

export const fetchBalance = async (walletAddress: string): Promise<string> => {
  try {
    const provider = new ethers.JsonRpcProvider(FUJI_RPC_URL);
    const balance = await provider.getBalance(walletAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 'Error fetching balance';
  }
};
