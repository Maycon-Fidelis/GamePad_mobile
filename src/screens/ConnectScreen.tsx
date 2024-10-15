import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import Collapsible from 'react-native-collapsible';
import { Camera, useCameraPermissions, CameraView } from 'expo-camera';
import { useTranslation } from 'react-i18next';

type Prop = {
  type: string;
  data: string;
};

type ConnectScreenProps = {
  connect: (url: string, name: string) => void;
  changeLanguage: (lng: string) => void;  // Adicionando changeLanguage aqui
  isConnected: boolean;
};

export default function ConnectScreen({ connect, changeLanguage }: ConnectScreenProps) {
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const [isPortuguese, setIsPortuguese] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert(t('alert_camera'));
      }
    })();
  }, []);

  const toggleLanguage = () => {
    const newLanguage = isPortuguese ? 'en' : 'pt';
    changeLanguage(newLanguage);
    setIsPortuguese(!isPortuguese);
  };

  const handleBarCodeScanned = ({ type, data }: Prop) => {
    setScanned(true);
    Alert.alert(t('alert_scan_code', { type }), t('alert_data', { data }), [
      {
        text: 'OK',
        onPress: () => setScanned(false),
      },
    ]);
    connect(data, name);
    setTimeout(() => {
      setScanned(false);
    }, 500);
  };

  const toggleExpand = () => {
    if (name) {
      setCollapsed(!collapsed);
    } else {
      Alert.alert(t('warning_name_first'));
    }
  };

const handleConnect = () => {
  if (!name) {
    Alert.alert(t('error_name_required'));
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
      
      <View style={styles.languageSwitchContainer}>
        <Text style={styles.languageText}>PT</Text>
        <Switch
          value={!isPortuguese}
          onValueChange={toggleLanguage}
          thumbColor={isPortuguese ? '#007bff' : '#fff'}
          trackColor={{ false: '#ccc', true: '#007bff' }}
        />
        <Text style={styles.languageText}>EN</Text>
      </View>

      <Text style={styles.title}>{t('connect')}</Text>

      <View style={styles.block_connect}>
        <Text style={styles.description}>
          {t('enter_name')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t('enter_name')}
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
        <Text style={styles.connect_port_ip_text}>{t('manual_entry')}</Text>
      </TouchableOpacity>
      
      <View style={styles.collapsibleContainer}>
        <Collapsible collapsed={collapsed} style={styles.collapsible}>
          <View style={styles.collapsibleContent}>
            <TextInput
              style={styles.inputCollapsible}
              placeholder={t('enter_ip')}
              value={ip}
              onChangeText={setIp}
            />
            <TextInput
              style={styles.inputCollapsible}
              placeholder={t('enter_port')}
              value={port}
              onChangeText={setPort}
            />
            <TouchableOpacity 
              style={styles.connectButton} 
              onPress={handleConnect}
              disabled={!name}
            >
              <Text style={styles.connectText}>{t('connect_button')}</Text>
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
          <Text style={styles.connect_qrcode_text}>{t('connect_qr')}</Text>
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
  languageSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
});
