import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connectionWebSocket, disconnectWebSocket } from './src/websocketClient';
import ConnectScreen from './src/screens/ConnectScreen';
import ControlScreen from './src/screens/ControlScreen';

export default function App() {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);


  const connect = (url,name) => {
    connectionWebSocket(url,name,setWs,setIsConnected);
  };

  const disconnect = () => {
    if (ws){
      disconnectWebSocket(ws,setWs,setIsConnected);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isConnected ? (
        <ConnectScreen  connect={connect} />
      ) : (
        <ControlScreen disconnect={disconnect}/>
      )}
    </View>
  );
}

