import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { useState, useRef } from 'react';
import Collapsible from 'react-native-collapsible';
import { connectionWebSocket } from './websocketClient';

export default function App() {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [ws, setWs] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const animation = useRef(new Animated.Value(0)).current;

  // Função para alternar a exibição do Collapsible
  const toggleExpand = () => {
    if (name) {
      setCollapsed(!collapsed);
    } else {
      Alert.alert("Aviso", "Por favor, digite seu nome primeiro.");
    }
  };

  // Função para lidar com a conexão
  const handleConnect = () => {
    if (!name) {
      Alert.alert("Error", "Por favor, digite seu nome");
      return;
    }
    connectionWebSocket(ip, port, name, setWs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar ao Dispositivo</Text>

      <View style={styles.block_connect}>
        <Text style={styles.description}>
          Para conectar, digite seu nome (obrigatório).
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui seu nome"
          maxLength={20}
          value={name}
          onChangeText={setName}
        />
      </View>
      
      {/* Botão para inserir IP e Porta manualmente */}
      <TouchableOpacity 
        style={[
          styles.connect_port_ip, 
          { opacity: name ? 1 : 0.5 }
        ]} 
        onPress={toggleExpand}
        disabled={!name} // Desativa o botão se o nome estiver vazio
      >
        <Text style={styles.connect_port_ip_text}>Inserir manualmente</Text>
      </TouchableOpacity>
      
      {/* Campos de IP e Porta dentro do Collapsible */}
      <View style={styles.collapsibleContainer}>
        <Collapsible collapsed={collapsed} style={styles.collapsible}>
          <View style={styles.collapsibleContent}>
            <TextInput
              style={styles.inputCollapsible}
              placeholder="Digite aqui o endereço IP"
              value={ip}
              onChangeText={setIp}
            />
            <TextInput
              style={styles.inputCollapsible}
              placeholder="Digite aqui a porta"
              value={port}
              onChangeText={setPort}
            />
            <TouchableOpacity 
              style={styles.connectButton} 
              onPress={handleConnect}
              disabled={!name} // Desativa o botão se o nome estiver vazio
            >
              <Text style={styles.connectText}>Conectar</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </View>

      {/* Botão de conexão via QR Code */}
      <View style={styles.connect_qrcode}>
        <TouchableOpacity 
          style={{ opacity: name ? 1 : 0.5 }}
          disabled={!name} // Desativa o botão se o nome estiver vazio
        >
          <Text style={styles.connect_qrcode_text}>Conectar via QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161b21',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Arial',
  },
  block_connect: {
    backgroundColor: '#2b2f3a',
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    width: '100%',
    marginTop: 30,
    borderRadius: 10,
    height: 120,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    fontFamily: 'Arial',
  },
  input: {
    color: '#fff',
    backgroundColor: '#3d414e',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Arial',
  },
  connectButton: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  connectText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  connect_port_ip: {
    width: '100%',
    height: 55,
    backgroundColor: '#2b2f3a',
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#444',
    marginTop: 20,
    borderRadius: 10,
  },
  connect_port_ip_text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Arial',
  },
  connect_qrcode: {
    width: '100%',
    height: 55,
    backgroundColor: '#2b2f3a',
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
  },
  connect_qrcode_text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Arial',
  },
  collapsibleContainer: {
    width: '100%',
    marginVertical: 10,
  },
  collapsible: {
    borderWidth: 1,
    height: 240,
    borderRadius: 10,
    borderColor: 'blue',
  },
  collapsibleContent: {
    padding: 15,
  },
  inputCollapsible: {
    color: '#fff',
    backgroundColor: '#3d414e',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Arial',
  },
});
