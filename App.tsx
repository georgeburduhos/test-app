import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WalletInput from './components/WalletInput';
import { fetchBalance } from './utils/fetch-balance';
import { requestTestFunds } from './utils/wallet-utils';

const App = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFetchBalance = async (address: string) => {
    setWalletAddress(address);
    const fetchedBalance = await fetchBalance(address);
    setBalance(fetchedBalance);
  };

  const handleRequestFunds = async () => {
    if (walletAddress) {
      const responseMessage = await requestTestFunds(walletAddress);
      setMessage(responseMessage);
    }
  };

  const handleClear = () => {
    setMessage(null);
    setBalance(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <WalletInput onAddressSubmit={handleFetchBalance} />
        {balance !== null && (
          <Text style={styles.balance}>Balance: {balance} AVAX</Text>
        )}
        {walletAddress && (
          <Button
            title='Request Test from AVAX Faucet'
            onPress={handleRequestFunds}
          />
        )}
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
      <Button title='Clear All' onPress={handleClear} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1
  },
  balance: {
    marginVertical: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  message: {
    marginVertical: 10,
    fontSize: 14,
    textAlign: 'center'
  }
});

export default App;
