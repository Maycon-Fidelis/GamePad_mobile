import { AutoFocus } from "expo-camera/build/legacy/Camera.types";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

interface ExtraButtonProps {
  onData: (data: { button: string | null; action: 'p' | 'r' }) => void;
  color?: string;
  background?: string;
  size?: number;
  label?: string;
}

const ExtraButton: React.FC<ExtraButtonProps> = ({
  onData,
  color = "blue",
  background = "white",
  size = 80,
  label = "Extra",
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
      <View
        style={[
          styles.ExtraContent,
          { 
            width: size, 
            height: size * 0.7,
            backgroundColor: background, 
            opacity: pressedButton === label ? 0.5 : 1,
          }
        ]}
      >
        <Text style={[styles.ExtraText, { color, fontSize: size * 0.2 }]}>{label}</Text>
      </View>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  ExtraContent: {
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  ExtraText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExtraButton;
