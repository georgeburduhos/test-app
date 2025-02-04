import { FAUCET_URL } from '@env';
import axios from 'axios';

export const requestTestFunds = async (walletAddress: string) => {
  try {
    const response = await axios.post(FAUCET_URL, { address: walletAddress });
    return response.data.message || 'Test AVAX requested successfully!';
  } catch (error) {
    console.error('Error requesting test AVAX:', error);
    return 'Failed to request test AVAX';
  }
};
