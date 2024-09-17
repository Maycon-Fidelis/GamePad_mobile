import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Joystick from '../control/Joystick';

export default function ControlScreen({ disconnect }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDisconnect = () => {
    disconnect();
    setModalVisible(false);
  };

  const logData = (message) => {
    console.log(message); // Loga no console (ou outro mecanismo de log)
  };

  const sendData = (data) => {
    // Aqui você pode enviar para um WebSocket, API ou outro
    console.log('Sending data', data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
        <Text style={styles.buttonText}>Open Settings</Text>
      </TouchableOpacity>

      <Joystick
  joystickId="joystick1"
  onDataLog={logData}
  onDataSend={sendData}
  size={120} // Personalize o tamanho
  backgroundColor="lightgray" // Personalize a cor de fundo
  ballColor="red" // Personalize a cor da bola
  ballOpacity={0.8} // Personalize a opacidade da bola
/>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Settings</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleDisconnect} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Disconnect</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
});
