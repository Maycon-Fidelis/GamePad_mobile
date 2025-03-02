import { Alert } from 'react-native';
import Joystick from './control/Joystick';
import i18n from './utils/i18n'; // Importa o i18n para utilizar as traduções
const latencies = [];
let request_count = 0;
let high_latency_count = 0;

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
    const timestamp = Date.now(); // Marca o tempo de envio

    const message = JSON.stringify({
      type: 'c',
      b,
      s,
      client_timestamp: timestamp // Envia o timestamp do cliente
    });

    console.log(i18n.t("sending_control_data"), message);
    ws.send(message);

    const onMessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.type === 'c' && response.b === b && response.s === s) {
        const latency = Date.now() - response.client_timestamp; // Calcula latência
        latencies.push(latency); // Armazena a latência
        request_count++; // Contador de requisições

        if (latency > 100) {
          high_latency_count++; // Contador de latências altas
        }

        // Calcular latência mínima, máxima e média corretamente
        const minLatency = Math.min(...latencies);
        const maxLatency = Math.max(...latencies);
        const avgLatency = latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length;

        // Exibir métricas no console
        console.log(`Latência do botão ${b}: ${latency} ms`);
        console.log(`Latência mínima: ${minLatency} ms`);
        console.log(`Latência máxima: ${maxLatency} ms`);
        console.log(`Latência média: ${avgLatency.toFixed(2)} ms`);
        console.log(`Requisições totais: ${request_count}`);
        console.log(`Requisições com latência alta (>100ms): ${high_latency_count}`);

        // Remover listener após processamento
        ws.removeEventListener("message", onMessage);
      }
    };

    ws.addEventListener("message", onMessage);
  } else {
    console.log(i18n.t("websocket_not_open"));
  }
};

export const sendJoystickData = (ws, joystickId, x, y) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const timestamp = Date.now();

    const message = JSON.stringify({
      type: 'j',
      id: joystickId,
      x: x,
      y: y,
      client_timestamp: timestamp
    });

    console.log(i18n.t("sending_joystick_data"), message);
    ws.send(message);

    const onMessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.type === 'j' && response.id === joystickId) {
        const latency = Date.now() - response.client_timestamp;
        latencies.push(latency);
        request_count++; // Contador de requisições
    
        if (latency > 100) {
          high_latency_count++; // Contador de latências altas
        }
    
        // Calcular latência mínima, máxima e média
        const minLatency = Math.min(...latencies);
        const maxLatency = Math.max(...latencies);
        const avgLatency = latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length;
    
        // Exibir métricas no console
        console.log(`Latência do joystick ${joystickId}: ${latency} ms`);
        console.log(`Latência mínima: ${minLatency} ms`);
        console.log(`Latência máxima: ${maxLatency} ms`);
        console.log(`Latência média: ${avgLatency.toFixed(2)} ms`);
        console.log(`Requisições totais: ${request_count}`);
        console.log(`Requisições com latência alta (>100ms): ${high_latency_count}`);
    
        // Remover listener após processamento
        ws.removeEventListener("message", onMessage);
      }
    };

    ws.addEventListener("message", onMessage);
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