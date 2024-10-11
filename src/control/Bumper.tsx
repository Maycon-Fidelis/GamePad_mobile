import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

interface BumperProps {
  onData: (data: { button: string | null; action: 'press' | 'release' }) => void;
  color?: string;
  background?: string;
  size?: number;
  label?: string;
}

const Bumper: React.FC<BumperProps> = ({
  onData,
  color = "blue",
  background = "white",
  size = 80,
  label = "LB",
}) => {
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleStateChange = (state: number) => {
    if (state === State.BEGAN) {
      setPressedButton(label);
      onData({ button: label, action: 'press' });
    } else if (state === State.END || state === State.FAILED || state === State.CANCELLED) {
      setPressedButton(null); 
      onData({ button: label, action: 'release' });
    }
  };

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => handleStateChange(nativeEvent.state)}
      minDurationMs={1}
    >
      <View style={[
        styles.bumperButton,
        { 
          width: size, 
          height: size * 0.8, 
          backgroundColor: background, 
          opacity: pressedButton === label ? 0.5 : 1,
          borderBottomLeftRadius: size * 0.25,
          borderBottomRightRadius: size *0.25
        }
      ]}>
        <Text style={[styles.bumperButtonText, { color, fontSize: size / 3 }]}>{label}</Text>
      </View>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  bumperButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bumperButtonText: {
    fontWeight: 'bold',
  },
});

export default Bumper;
