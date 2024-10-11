import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

interface StickProps {
  onData: (data: { button: string | null; action: 'press' | 'release' }) => void;
  color?: string;
  background?: string;
  size?: number;
  label?: string;
}

const Stick: React.FC<StickProps> = ({
  onData,
  color = "blue",
  background = "white",
  size = 40,
  label = "B",
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
      <View
        style={[
          styles.stick,
          { 
            width: size, 
            height: size,
            backgroundColor: background, 
            opacity: pressedButton === label ? 0.5 : 1,
          }
        ]}
      >
        <Text style={[styles.stickText, { color, fontSize: size * 0.5 }]}>{label}</Text>
      </View>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  stick: {
    position: 'absolute',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickText: {
    fontWeight: 'bold',
  },
});

export default Stick;
