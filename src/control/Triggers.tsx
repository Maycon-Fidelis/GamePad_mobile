import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

interface TriggersProps {
  onData: (data: { button: string | null; action: 'p' | 'r' }) => void;
  color?: string;
  background?: string;
  size?: number;
  label?: string;
}

const Triggers: React.FC<TriggersProps> = ({
  onData,
  color = "blue",
  background = "white",
  size = 80,
  label = "B",
}) => {
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleStateChange = (state: number) => {
    if (state === State.BEGAN) {
      setPressedButton(label);
      onData({ button: label, action: 'p' });
    } else if (state === State.END || state === State.FAILED || state === State.CANCELLED) {
      setPressedButton(null); 
      onData({ button: label, action: 'r' });
    }
  };

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => handleStateChange(nativeEvent.state)}
      minDurationMs={1}
    >
      <View style={[
        styles.TriggersButton,
        { 
          width: size, 
          height: size * 1.05, 
          backgroundColor: background, 
          opacity: pressedButton === label ? 0.5 : 1,
          borderTopLeftRadius: size * 0.25,
          borderTopRightRadius: size * 0.25,
        }
      ]}>
        <Text style={[styles.TriggersButtonText, { color, fontSize: size / 3 }]}>{label}</Text>
      </View>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
    TriggersButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TriggersButtonText: {
    fontWeight: 'bold',
  },
});

export default Triggers;
