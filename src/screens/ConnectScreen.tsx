import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Collapsible from 'react-native-collapsible';
import { connectionWebSocket } from '../websocketClient';
import { Camera, useCameraPermissions, CameraView } from 'expo-camera';

type Prop = {
  type: string;
  data: string;
};

type ConnectScreenProps = {
  connect: (url: string, name: string) => void;
  isConnected: boolean;
};

export default function ConnectScreen({connect}: ConnectScreenProps) {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [ws, setWs] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão da câmera para fazer isso funcionar!');
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: Prop) => {
    setScanned(true);
    Alert.alert(
      `Código ${type} Scaneado`,
      `Dados: ${data}`,
      [
        {
          text: 'OK',
          onPress: () => setScanned(false),
        }
      ],
      { cancelable: false }
    );
    connect(data, name);
  
    setTimeout(() => {
      setScanned(false);
    }, 500);
  };
  

  const toggleExpand = () => {
    if (name) {
      setCollapsed(!collapsed);
    } else {
      Alert.alert("Aviso", "Por favor, digite seu nome primeiro.");
    }
  };

  const handleConnect = () => {
    if (!name) {
      Alert.alert("Error", "Por favor, digite seu nome");
      return;
    }

    const url = `ws://${ip}:${port}`;
    connect(url, name);
  };

  const toggleCameraVisibility = () => {
    setCameraVisible(!cameraVisible);
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
      
      <TouchableOpacity 
        style={[
          styles.connect_port_ip, 
          { opacity: name ? 1 : 0.5 }
        ]} 
        onPress={toggleExpand}
        disabled={!name}
      >
        <Text style={styles.connect_port_ip_text}>Inserir manualmente</Text>
      </TouchableOpacity>
      
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
              disabled={!name}
            >
              <Text style={styles.connectText}>Conectar</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </View>

      <View style={styles.connect_qrcode}>
        <TouchableOpacity 
          style={{ opacity: name ? 1 : 0.5 }}
          onPress={toggleCameraVisibility}
          disabled={!name}
        >
          <Text style={styles.connect_qrcode_text}>Conectar via QR Code</Text>
        </TouchableOpacity>
      </View>

      {cameraVisible && (
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.layerContainer}>
            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </View>
        </CameraView>
      )}
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
  },
  block_connect: {
    backgroundColor: '#2b2f3a',
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    width: '100%',
    marginTop: 30,
    borderRadius: 10,
    height: 150,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
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
  },
  collapsibleContainer: {
    width: '100%',
    marginVertical: 10,
  },
  collapsible: {
    borderWidth: 1,
    height: 240,
    borderRadius: 10,
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
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
    marginBottom: 100,
  },
  layerContainer: {
    flex: 1,
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerCenter: {
    flex: 3,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focused: {
    flex: 1.5,
    borderColor: '#00FF00',
    borderWidth: 2,
    margin: 5,
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
