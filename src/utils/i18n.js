import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        pt: {
          translation: {
            connect: 'Conectar',
            enter_name: 'Por favor, digite seu nome (obrigatório).',
            enter_ip: 'Digite aqui o endereço IP',
            enter_port: 'Digite aqui a porta',
            connect_qr: 'Conectar via QR Code',
            choose_language: 'Escolha o idioma:',
            connect_button: 'Conectar',
            manual_entry: 'Inserir manualmente',
            error_name_required: 'Por favor, digite seu nome',
            alert_scan_code: 'Código {{type}} Scaneado',
            alert_data: 'Dados: {{data}}',
            warning_name_first: 'Por favor, digite seu nome primeiro.',
            alert_camera: 'Desculpe, precisamos da permissão da câmera para fazer isso funcionar!',
            settings: 'Configurações',
            disconnect: 'Desconectar',
            close: 'Fechar',
            connected: 'Conectado',
            connected_to: 'Conectado a {{url}}',
            error: 'Erro',
            connection_error: 'Erro na conexão',
            connection_limit_reached: 'Limite de conexão alcançado',
            username_exists: 'O nome de usuário já existe. Por favor, escolha um nome diferente.',
            disconnected: 'Desconectado',
            connection_closed: 'Conexão encerrada',
            insert_valid_info: 'Insira informações válidas',   
            sending_control_data: 'Enviando dados de controle:',
            sending_joystick_data: 'Enviando dados do joystick:',
            websocket_not_open: 'WebSocket não está aberto ou conectado.',  
          }
        },
        en: {
          translation: {
            connect: 'Connect',
            enter_name: 'Please enter your name (required).',
            enter_ip: 'Enter IP address here',
            enter_port: 'Enter port here',
            connect_qr: 'Connect via QR Code',
            choose_language: 'Choose language:',
            connect_button: 'Connect',
            manual_entry: 'Manual entry',
            error_name_required: 'Please enter your name',
            alert_scan_code: 'Scanned code {{type}}',
            alert_data: 'Data: {{data}}',
            warning_name_first: 'Please enter your name first.',
            alert_camera: 'Sorry, we need camera permission to make this work!',
            settings: 'Settings',
            disconnect: 'Disconnect',
            close: 'Close',
            connection_error: 'Connection error',
            connection_limit_reached: 'Connection limit reached',
            username_exists: 'Username already exists. Please choose a different name.',
            disconnected: 'Disconnected',
            connection_closed: 'Connection closed',
            insert_valid_info: 'Insert valid info',
            sending_control_data: 'Sending control data:',
            sending_joystick_data: 'Sending joystick data:',
            websocket_not_open: 'WebSocket is not open or connected.',
          }
        }
      },      
    lng: 'pt', 
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
