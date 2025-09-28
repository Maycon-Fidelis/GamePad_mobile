import { Alert } from 'react-native';
import Joystick from './control/Joystick';
import i18n from './utils/i18n'; // Importa o i18n para utilizar as traduções

export const connectionWebSocket = (url, name, setWs, setIsConnected) => {
  if (url && name) {
    const client = new WebSocket(url);

    client.onopen = () => {
      setWs(client);
      console.log(i18n.t("connected"), i18n.t('connected_to', { url }));
      Alert.alert(i18n.t("connected"), i18n.t('connected_to', { url }));

      const userData = JSON.stringify({ username: name });
      client.send(userData);

      setIsConnected(true);
    };

    client.onerror = (error) => {
      Alert.alert(i18n.t("error"), error.message || i18n.t("connection_error"));
      setIsConnected(false);
    };

    client.onclose = (event) => {
      const code = event.code;
      switch (code) {
        case 4000:
          console.log(i18n.t("error"), i18n.t("connection_limit_reached"));
          Alert.alert(i18n.t("error"), i18n.t("connection_limit_reached"));
          break;
        case 4001:
          console.log(i18n.t("error"), i18n.t("username_exists"));
          Alert.alert(i18n.t("error"), i18n.t("username_exists"));
          break;
        default:
          console.log(i18n.t("disconnected"), i18n.t("connection_closed"));
          Alert.alert(i18n.t("disconnected"), i18n.t("connection_closed"));
          break;
      }
      setWs(null);
      setIsConnected(false);
    };
  } else {
    Alert.alert(i18n.t("error"), i18n.t("insert_valid_info"));
  }
};

export const sendControlData = (ws, b, s) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
      type: 'c',
      b,
      s
    });

    console.log(i18n.t("sending_control_data"), message);
    ws.send(message);
  } else {
    console.log(i18n.t("websocket_not_open"));
  }
};

export const sendJoystickData = (ws, joystickId, x, y) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
      type: 'j',
      id: joystickId,
      x: x,
      y: y
    });

    console.log(i18n.t("sending_joystick_data"), message);
    ws.send(message);
  } else {
    console.log(i18n.t("websocket_not_open"));
  }
};

export const disconnectWebSocket = (ws, setWs, setIsConnected) => {
  if(ws){
      ws.close();
      setWs(null);
      setIsConnected(false);
      Alert.alert(i18n.t('disconnected'), i18n.t('connection_closed'));
  }
};
