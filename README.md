# 📱 VirtualGamePad Mobile

O **VirtualGamePad Mobile** transforma seu **celular em um controle de videogame** via rede local, permitindo controlar jogos no PC usando **toques e gestos na tela**.
Ele se conecta a um servidor Python (VirtualGamePad PC) via **WebSocket**, enviando comandos em tempo real com baixa latência após o usuário se identificar.

## 📸 Demonstração
<img src="https://github.com/user-attachments/assets/15e0f8aa-2db6-4ded-930b-70b8f72cf1d9" alt="Demonstração do Gamepad_mobile">

---

## 🚀 Funcionalidades

- 🎮 Interface virtual de joystick e botões touchscreen.
- ⚡ Conexão em tempo real via WebSocket.
- 👤 **Identificação de usuário por nome** antes de conectar.
- 🔗 **Múltiplos métodos de conexão:**
    - 📱 Escaneamento de **QR Code** (gerado pelo servidor).
    - ⌨️ Inserção manual de **IP e Porta** do servidor.
- 🧩 Feedback visual dos botões e eixos.
- 🖲️ Compatível com o servidor **VirtualGamePad PC**.

---

## 🛠️ Tecnologias Utilizadas

- **React Native (Expo)** — Interface mobile.  
- **WebSocket** — Comunicação com o servidor PC.  
- **TypeScript / JavaScript** — Lógica de controle.  
- **Expo** — Ambiente de desenvolvimento multiplataforma.

---

## ⚠️ Pré-requisitos

Antes de começar, você precisará ter:

1.  **O Servidor PC:** Este é apenas o aplicativo *cliente*. Você **precisa** do servidor [**VirtualGamePad PC**](https://github.com/Maycon-Fidelis/GamePad_received) rodando no seu computador.
2.  **Node.js** (versão 18 ou superior).
3.  **App Expo Go** instalado no seu celular (Android ou iOS).
4.  PC e Celular na **mesma rede Wi-Fi**.

---

## 📦 Instalação (Para Desenvolvedores)

1.  **Clone o projeto:**
    ```bash
    git clone https://github.com/Maycon-Fidelis/GamePad_mobile
    ```

2.  **Acesse o diretório:**
    ```bash
    cd GamePad_mobile
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o aplicativo:**
    ```bash
    expo start
    ```

5.  **Abra no celular:**
    Escaneie o QR Code do **Expo** (não o do servidor) exibido no terminal usando o aplicativo **Expo Go**.

---

## 🕹️ Como Usar

1.  Inicie o servidor **VirtualGamePad PC** no seu computador.
2.  Certifique-se de que seu PC e seu celular estejam conectados à **mesma rede Wi-Fi**.
3.  Abra o app **VirtualGamePad Mobile** (via Expo Go).
4.  **Digite seu nome:** Na tela inicial, insira um nome para identificar seu controle no servidor.
5.  **Escolha o método de conexão:**

    * **Opção 1: Escanear QR Code**
        * O servidor PC deverá exibir um QR Code no terminal (ou em uma janela) contendo seu IP e Porta.
        * No app, toque no botão "Escanear QR Code".
        * Aponte a câmera do celular para o QR Code na tela do seu PC.
        * A conexão será feita automaticamente.

    * **Opção 2: Conexão Manual**
        * Na interface do servidor PC, anote o **Endereço IP** e a **Porta** (ex: `192.168.1.5` e `8083`).
        * No app, digite o IP e a Porta nos campos indicados.
        * Toque em "Conectar".

6.  **Pronto!** Após conectar, a interface de controle aparecerá e você já pode jogar.

---

## 🔧 Configuração de Rede (Android)

Se estiver usando Expo Managed, o Android bloqueia conexões de texto puro (HTTP/WS) por padrão. Para permitir a comunicação na rede local (somente para desenvolvimento), adicione o seguinte ao seu `app.json`:

```json
{
  "expo": {
    "name": "VirtualGamePad Mobile",
    "slug": "virtualgamepad-mobile",
    "android": {
      "usesCleartextTraffic": true
    }
  }
}
````
---

## 📜 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

## 💡 Desenvolvido por

**Maycon Fidelis**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/maycon-fidelis-66a757228/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Maycon-Fidelis)