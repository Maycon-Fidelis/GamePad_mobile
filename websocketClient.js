import { Alert } from 'react-native';

export const connectionWebSocket = (ip, port, name, setWs) => {
    if(ip && port && name){
        const url = `ws:${ip}:${port}`;
        const client = new WebSocket(url);

        client.onopen = () => {
            setWs(client);
            Alert.alert("Connect", `Connection at ${ip}:${port}`);

            const userData = JSON.stringify({ username: name });
            client.send(userData);
        };

        client.onerror = (error) => {
            Alert.alert("Error", error.message || "Connection Error");
        };

        client.onclose = (event) => {
            
            switch (event) {
                case 4000:
                    Alert.alert("Error", "Connection limit reached.");                                    
                    break;
                case 4001:
                    Alert.alert("Error", "Username already exists. Please choose a different name.");
                default:
                    Alert.alert("Disconnected", "Connection closed");
                    break;
            }
            setWs(null);
        };
    } else {
        Alert.alert("Error", "Please insert a valid IP, port, and name");
    }
}
