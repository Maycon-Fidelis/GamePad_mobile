# 📱 VirtualGamePad Mobile

O VirtualGamePad Mobile transforma seu celular em um controle de videogame via rede local, permitindo controlar jogos no PC usando toques e gestos na tela. Ele se conecta a um servidor Python (VirtualGamePad PC) via WebSocket, enviando comandos em tempo real com baixa latência.
---

## 📸 Demonstração
<img src="https://github.com/user-attachments/assets/15e0f8aa-2db6-4ded-930b-70b8f72cf1d9" alt="Texto Alternativo">

## 🚀 Funcionalidades

- 🎮 Interface virtual de joystick touchscreen.  
- ⚡ Conexão em tempo real via WebSocket.  
- 📶 Conexão automática ao servidor (ou manual, inserindo o IP).  
- 🧩 Feedback visual dos botões e eixos.  
- 🖲️ Compatível com qualquer sistema que receba comandos do servidor VirtualGamePad PC.  

---

## 🛠️ Tecnologias Utilizadas

- **React Native (Expo)** — Interface mobile.  
- **WebSocket** — Comunicação com o servidor PC.  
- **TypeScript / JavaScript** — Lógica de controle.  
- **Expo** — Ambiente de desenvolvimento multiplataforma.  

---
## ⚠️ Pré-requisitos
1. Antes de começar, você precisará ter:
2. O Servidor PC: Este é apenas o aplicativo cliente. Você precisa do servidor [VirtualGamePad PC](https://github.com/Maycon-Fidelis/GamePad_received) rodando no seu computador.
3. Node.js (versão 18 ou superior).
4. App Expo Go instalado no seu celular (Android ou iOS).
5. PC e Celular na mesma rede Wi-Fi.

## 📦 Instalação e Execução

### 🔹 1. Clone o projeto

```bash
git clone https://github.com/Maycon-Fidelis/GamePad_mobile.git
cd virtual-gamepad-mobile
```

## 📦 Instale as dependências
```bash
npm install
```

## Execute o aplicativo
```bash
expo start
```
Abra o Expo Go no seu celular e escaneie o QR Code exibido no terminal ou navegador.

## 🕹️ Como Usar
1. Inicie o servidor VirtualGamePad PC no seu computador.
2. Certifique-se de que seu PC e seu celular estejam conectados à mesma rede Wi-Fi.
3. Abra o app VirtualGamePad Mobile (via Expo Go).
4. O aplicativo tentará encontrar e conectar-se automaticamente ao servidor.
5. Caso não consiga, digite manualmente o endereço IP do seu PC (ex: 192.168.1.5) e conecte-se.

## Configuração de Rede (Android)

Se estiver usando Expo Managed, o Android bloqueia conexões HTTP por padrão.
Para permitir comunicação local (somente para desenvolvimento), adicione no seu app.json:

```bash
{
  "expo": {
    "name": "VirtualGamePad Mobile",
    "slug": "virtualgamepad-mobile",
    "android": {
      "usesCleartextTraffic": true
    }
  }
}
```
Isso libera conexões ws://192.168.x.x (HTTP/WebSocket).
Para produção, prefira usar HTTPS/WSS.

📜 Licença

Este projeto está sob a licença MIT.
Consulte o arquivo LICENSE
 para mais detalhes.

💡 Desenvolvido por

Maycon Fidelis
👨‍💻 Engenheiro da Computação & Desenvolvedor
