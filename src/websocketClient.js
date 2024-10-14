import { Alert } from 'react-native';
import Joystick from './control/Joystick';

export const connectionWebSocket = (url, name, setWs, setIsConnected) => {
  if (url && name) {
    const client = new WebSocket(url);

    client.onopen = () => {
      setWs(client);
      console.log("Connect", `Connected to ${url}`);
      Alert.alert("Connected", `Connected to ${url}`);

      const userData = JSON.stringify({ username: name });
      client.send(userData);

      setIsConnected(true); // Marca como conectado
    };

    client.onerror = (error) => {
      Alert.alert("Error", error.message || "Connection Error");
      setIsConnected(false); // Marca como não conectado
    };

    client.onclose = (event) => {
      const code = event.code;
      switch (code) {
        case 4000:
          console.log("Error", "Connection limit reached.");
          Alert.alert("Error", "Connection limit reached.");
          break;
        case 4001:
          console.log("Error", "Username already exists. Please choose a different name.");
          Alert.alert("Error", "Username already exists. Please choose a different name.");
          break;
        default:
          console.log("Disconnected", "Connection closed");
          Alert.alert("Disconnected", "Connection closed");
          break;
      }
      setWs(null);
      setIsConnected(false); // Marca como desconectado
    };
  } else {
    Alert.alert("Error", "Please insert a valid IP, port, and name");
  }
};

export const sendControlData = (ws, button, state) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
      type: 'control',
      button,
      state
    });
    console.log("Enviando dados de controle:", message);
    ws.send(message);
  } else {
    console.log("WebSocket não está aberto ou conectado.");
  }
};

export const sendJoystickData = (ws, joystickId, x, y) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
        type: 'joystick',
        id: joystickId,
        x: x,
        y: y
    });
    console.log("Enviando dados do joystick:", message);
    ws.send(message);
  } else {
    console.log("WebSocket não está aberto ou conectado.");
  }
};


export const disconnectWebSocket = (ws, setWs, setIsConnected) => {
    if(ws){
        ws.close();
        setWs(null);
        setIsConnected(false);
    }
};