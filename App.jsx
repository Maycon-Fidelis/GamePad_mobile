import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Conectar ao Dispositivo
      </Text>
      <Text style={styles.description}>
        Para conectar é necessário digitar seu nome e escanear o código qr code ou inserir manualmente com o valor da porta e o do ip
      </Text>
      <TextInput style={styles.input} placeholder="Digite aqui seu nome" maxLength={20} />
      
      <TextInput style={styles.input} placeholder="Digite aqui o endereço IP"/>
      <TextInput style={styles.input} placeholder="Digite aqui a porta"/>
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
  },
  description: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
