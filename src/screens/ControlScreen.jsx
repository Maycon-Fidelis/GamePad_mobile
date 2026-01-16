import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as NavigationBar from 'expo-navigation-bar';
import Joystick from '../control/Joystick';
import Buttons from '../control/Buttons';
import Dpad from '../control/Dpad';
import Bumper from '../control/Bumper';
import Triggers from '../control/Triggers';
import Stick from '../control/Stick';
import ExtraButton from '../control/ExtraButton';
import { useTranslation } from 'react-i18next'; 

const { width, height } = Dimensions.get('window');

export default function ControlScreen({ disconnect, handleJoystickChange, handleButtonData }) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [joystickPreset, setJoystickPreset] = useState('HIGH');

    const JOYSTICK_PRESETS = {
    LOW: {
      label: 'Baixa',
      precision: 16,
    },
    MEDIUM: {
      label: 'Média',
      precision: 64,
    },
    HIGH: {
      label: 'Alta',
      precision: 128,
    },
    FULL: {
      label: 'Máxima (RAW)',
      precision: null,
    },
  };
  
  const joystickConfig = {
    precision: JOYSTICK_PRESETS[joystickPreset].precision,
    deadZone: 0.03,
    changeThreshold: 50,
    size: 120,
  };


  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      StatusBar.setHidden(true);
    };

    lockOrientation();
    
    NavigationBar.setVisibilityAsync("hidden");

    return () => {
      ScreenOrientation.unlockAsync();
      StatusBar.setHidden(false);
    };
  }, []);

  const handleDisconnect = () => {
    disconnect();
    setModalVisible(false);
  };

  const positions = {
    dpad: { x: width * 0.07, y: height * 0.17 },
    buttons: { x: width * 1.52, y: height * 0.17 },
    Joystick1: { x: width * 0.55, y: height * 0.3 },
    Joystick2: { x: width * 1.2, y: height * 0.3 },
    lb: { x: width * 0.4, y: height * 0.1 },
    lt: { x: width * 0.15, y: height * 0.02 },
    rb: { x: width * 1.4, y: height * 0.1 },
    rt: { x: width * 1.65, y: height * 0.02 },
    ls: { x: width * 0.35, y: height * 0.4 },
    rs: { x: width * 1.6, y: height * 0.4 },
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
        <Text style={styles.buttonText}>{t('settings')}</Text> 
      </TouchableOpacity>

      <View style={[styles.control, { left: positions.buttons.x, top: positions.buttons.y }]}>
        <Buttons 
          onData={handleButtonData}
          size={50}
        />
      </View>

      <View style={[styles.control, { left: positions.dpad.x, top: positions.dpad.y }]}>      
        <Dpad
          onData={handleButtonData}
          size={50}
        />
      </View>

      <View style={[styles.control, { left: positions.Joystick1.x, top: positions.Joystick1.y }]}>      
        <Joystick
          joystickId="1"
          onDataChange={handleJoystickChange}
          size={joystickConfig.size}
          precision={joystickConfig.precision}
          deadZone={joystickConfig.deadZone}
          changeThreshold={joystickConfig.changeThreshold}
        />
      </View>

      <View style={[styles.control, { left: positions.Joystick2.x, top: positions.Joystick2.y }]}>      
        <Joystick
          joystickId="2"
          onDataChange={handleJoystickChange}
          size={joystickConfig.size}
          precision={joystickConfig.precision}
          deadZone={joystickConfig.deadZone}
          changeThreshold={joystickConfig.changeThreshold}
        />
      </View>

      <View style={[styles.control, { left: positions.lb.x, top: positions.lb.y }]}>      
        <Bumper
          onData={handleButtonData}
          size={55}
          label={'LB'}
        />
      </View>

      <View style={[styles.control, { left: positions.lt.x, top: positions.lt.y }]}>      
        <Triggers
          onData={handleButtonData}
          size={50}
          label={'LT'}
        />
      </View>
      
      <View style={[styles.control, { left: positions.rb.x, top: positions.rb.y }]}>      
        <Bumper
          onData={handleButtonData}
          size={55}
          label='RB'
        />
      </View>

      <View style={[styles.control, { left: positions.rt.x, top: positions.rt.y }]}>      
        <Triggers
          onData={handleButtonData}
          size={50}
          label='RT'
        />
      </View>

      <View style={[styles.control, { left: positions.ls.x, top: positions.ls.y }]}>
        <Stick
          onData={handleButtonData}
          label='LS'
          size={40}
        />
      </View>

      <View style={[styles.control, { left: positions.rs.x, top: positions.rs.y }]}>
        <Stick
          onData={handleButtonData}
          label='RS'
          size={40}
        />
      </View>

      <View style={styles.topButtonsContainer}>
        <ExtraButton
          label={'SELECT'}
          size={60}
          onData={handleButtonData}
        />
        <ExtraButton
          label={'HOME'}
          size={60}
          onData={handleButtonData}
        />
        <ExtraButton
          label={'START'}
          size={60}
          onData={handleButtonData}
        />
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t('settings')}</Text> 
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Precisão do Analógico</Text>

                <View style={styles.presetRow}>
                  {Object.entries(JOYSTICK_PRESETS).map(([key, preset]) => {
                    const selected = joystickPreset === key;

                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() => setJoystickPreset(key)}
                        style={[
                          styles.presetButton,
                          selected && styles.presetButtonActive,
                        ]}
                      >
                        <Text style={selected ? styles.presetTextActive : styles.presetText}>
                          {preset.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

              </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleDisconnect} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{t('disconnect')}</Text> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{t('close')}</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  control: {
    position: 'absolute',
  },
  openModalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  topButtonsContainer: {
    position: 'absolute',
    top: 10,
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  },
  configButton: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginTop: 6,
    alignItems: 'center',
  },
    presetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  presetButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
    minWidth: '45%',
    alignItems: 'center',
  },

  presetButtonActive: {
    backgroundColor: '#007bff',
  },

  presetText: {
    color: '#333',
    fontWeight: '500',
  },

  presetTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

});
