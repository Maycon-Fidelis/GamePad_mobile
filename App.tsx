import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ConnectScreen from './ConnectScreen';
import ControlScreen from './ControlScreen';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {isConnected ? (
        <ControlScreen />
      ) : (
        <ConnectScreen setIsConnected={setIsConnected} />
      )}
    </View>
  );
}

