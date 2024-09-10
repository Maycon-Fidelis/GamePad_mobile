import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { connectionWebSocket } from './websocketClient';

export default function App() {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [ws, setWs] = useState(null);

  const handleConnect = () => {
    if (!name) {
      Alert.alert("Error", "Please enter your name");
      return;
    }
    connectionWebSocket(ip, port, name, setWs);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar ao Dispositivo</Text>
      <Text style={styles.description}>
        Para conectar, digite seu nome e insira o IP e a porta.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui seu nome"
        maxLength={20}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite aqui o endereço IP"
        value={ip}
        onChangeText={setIp}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite aqui a porta"
        value={port}
        onChangeText={setPort}
      />
      
      <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
        <Text style={styles.connectText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 5,
    paddingVertical: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 15,
  },
  connectButton: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  connectText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
