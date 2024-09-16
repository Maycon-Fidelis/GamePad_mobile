import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Button, Switch } from 'react-native';

export default function ControlScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('User');
  const [buttonSize, setButtonSize] = useState(50);
  const [showButtons, setShowButtons] = useState(true);
  const [buttonPosition, setButtonPosition] = useState('center');

  const handleDisconnect = () => {
    // Lógica de desconexão
    console.log("Disconnected");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
        <Text style={styles.buttonText}>Open Settings</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Settings</Text>
            
            <Text style={styles.infoText}>Name: {name}</Text>

            <View style={styles.optionContainer}>
              <Text style={styles.optionLabel}>Button Size:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={buttonSize.toString()}
                onChangeText={(text) => setButtonSize(parseInt(text))}
              />
            </View>

            <View style={styles.optionContainer}>
              <Text style={styles.optionLabel}>Show Buttons:</Text>
              <Switch
                value={showButtons}
                onValueChange={() => setShowButtons(!showButtons)}
              />
            </View>

            <View style={styles.optionContainer}>
              <Text style={styles.optionLabel}>Button Position:</Text>
              <View style={styles.positionButtonsContainer}>
                <Button title="Center" onPress={() => setButtonPosition('center')} />
                <Button title="Left" onPress={() => setButtonPosition('left')} />
                <Button title="Right" onPress={() => setButtonPosition('right')} />
              </View>
            </View>

            <View style={[styles.buttonsContainer, { justifyContent: buttonPosition }]}>
              {showButtons && (
                <>
                  <TouchableOpacity style={[styles.button, { width: buttonSize, height: buttonSize }]}>
                    <Text style={styles.buttonText}>Button 1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { width: buttonSize, height: buttonSize }]}>
                    <Text style={styles.buttonText}>Button 2</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

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
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
  },
  optionContainer: {
    marginBottom: 15,
  },
  optionLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  positionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
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
