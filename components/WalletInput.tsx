import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface WalletInputProps {
  onAddressSubmit: (address: string) => void;
}

const WalletInput: React.FC<WalletInputProps> = ({ onAddressSubmit }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!ethers.isAddress(walletAddress)) {
      setError('Invalid wallet address');
      return;
    }
    setError(null);
    onAddressSubmit(walletAddress);
  };

  const handlePopulateValidAddress = () => {
    const validTestAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    setWalletAddress(validTestAddress);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder='Enter wallet address'
        value={walletAddress}
        onChangeText={(text) => {
          setWalletAddress(text);
          setError(null);
        }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.buttonsContainer}>
        <Button title='Fetch Balance' onPress={handleSubmit} />
        <Button
          title='Set valid address'
          onPress={handlePopulateValidAddress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, width: '100%' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5
  }
});

export default WalletInput;
