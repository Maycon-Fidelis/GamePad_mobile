import { Alert } from 'react-native';

export const connectionWebSocket = (ip, port, name, setWs) => {
    if(ip && port && name){
        const url = `ws:${ip}:${port}`;
        const client = new WebSocket(url);

        client.onopen = () => {
            setWs(client);
            console.log("Connect", `Connection at ${ip}:${port}`);
            Alert.alert("Connect", `Connection at ${ip}:${port}`);

            const userData = JSON.stringify({ username: name });
            client.send(userData);
        };

        client.onerror = (error) => {
            Alert.alert("Error", error.message || "Connection Error");
        };

        client.onclose = (event) => {
            const code = event.code;
            switch (code) {
                case 4000:
                    console.log("Error", "Connection limit reached.");
                    Alert.alert("Error", "Connection limit reached.");                                    
                    break;
                case 4001:
                    console.log("Error", "Username already exists. Please choose a different name.");
                    Alert.alert("Error", "Username already exists. Please choose a different name.");
                default:
                    console.log("Disconnected", "Connection closed");
                    Alert.alert("Disconnected", "Connection closed");
                    break;
            }
            setWs(null);
        };
    } else {
        Alert.alert("Error", "Please insert a valid IP, port, and name");
    }
}
