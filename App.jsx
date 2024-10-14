import React, { useState } from 'react';
import { View } from 'react-native';
import { connectionWebSocket, disconnectWebSocket, sendControlData, sendJoystickData } from './src/websocketClient';
import ConnectScreen from './src/screens/ConnectScreen';
import ControlScreen from './src/screens/ControlScreen';

export default function App() {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = (url, name) => {
    connectionWebSocket(url, name, setWs, setIsConnected);
  };

  const disconnect = () => {
    if (ws) {
      disconnectWebSocket(ws, setWs, setIsConnected);
    }
  };

  const handleJoystickChange = (data) => {
    const {id, x, y} = data;
    sendJoystickData(ws,id, x, y);
  };

  const handleButtonData = (data) => {
    const { button, action } = data;
    sendControlData(ws,button,action);
  };

  return (
    <View style={{ flex: 1 }}>
      {!isConnected ? (
        <ControlScreen
          disconnect={disconnect}
          handleButtonData={handleButtonData}
          handleJoystickChange={handleJoystickChange}
        />
      ) : (
        <ConnectScreen connect={connect} />
      )}
    </View>
  );
}
