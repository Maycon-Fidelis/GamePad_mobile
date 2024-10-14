import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

interface ButtonsProps {
  onData: (data: { button: string | null; action: 'press' | 'release' }) => void;
  color?: string;
  background?: string;
  size?: number;
}

const Buttons: React.FC<ButtonsProps> = ({
  onData,
  color = 'blue',
  background = 'white',
  size = 55,
}) => {
  const [pressedButtons, setPressedButtons] = useState<{ [key: string]: boolean }>({});
  
  const refX = useRef(null);
  const refY = useRef(null);
  const refA = useRef(null);
  const refB = useRef(null);

  const handleStateChange = (button: string, state: number) => {
    if (state === State.BEGAN) {
      setPressedButtons((prev) => ({ ...prev, [button]: true }));
      onData({ button, action: 'press' }); // Envia o estado "press"
    } else if (state === State.END || state === State.FAILED || state === State.CANCELLED) {
      setPressedButtons((prev) => ({ ...prev, [button]: false }));
      onData({ button, action: 'release' }); // Envia o estado "release"
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <LongPressGestureHandler
        ref={refX}
        onHandlerStateChange={({ nativeEvent }) => handleStateChange('X', nativeEvent.state)}
        minDurationMs={1}
        shouldCancelWhenOutside={false}
        simultaneousHandlers={[refY, refA, refB]}
      >
        <View style={[styles.button, { opacity: pressedButtons['X'] ? 0.5 : 1, backgroundColor: background, width: size, height: size }]}>
          <Text style={[styles.buttonText, { color, fontSize: size / 2 }]}>X</Text>
        </View>
      </LongPressGestureHandler>

      <View style={[styles.button2, { height: size * 2.8 }]}>
        <LongPressGestureHandler
          ref={refY}
          onHandlerStateChange={({ nativeEvent }) => handleStateChange('Y', nativeEvent.state)}
          minDurationMs={1}
          shouldCancelWhenOutside={false}
          simultaneousHandlers={[refX, refA, refB]}
        >
          <View style={[styles.button, { opacity: pressedButtons['Y'] ? 0.5 : 1, backgroundColor: background, width: size, height: size }]}>
            <Text style={[styles.buttonText, { color, fontSize: size / 2 }]}>Y</Text>
          </View>
        </LongPressGestureHandler>

        <LongPressGestureHandler
          ref={refA}
          onHandlerStateChange={({ nativeEvent }) => handleStateChange('A', nativeEvent.state)}
          minDurationMs={1}
          shouldCancelWhenOutside={false}
          simultaneousHandlers={[refX, refY, refB]}
        >
          <View style={[styles.button, { opacity: pressedButtons['A'] ? 0.5 : 1, backgroundColor: background, width: size, height: size }]}>
            <Text style={[styles.buttonText, { color, fontSize: size / 2 }]}>A</Text>
          </View>
        </LongPressGestureHandler>
      </View>

      <LongPressGestureHandler
        ref={refB}
        onHandlerStateChange={({ nativeEvent }) => handleStateChange('B', nativeEvent.state)}
        minDurationMs={1}
        shouldCancelWhenOutside={false}
        simultaneousHandlers={[refX, refY, refA]}
      >
        <View style={[styles.button, { opacity: pressedButtons['B'] ? 0.5 : 1, backgroundColor: background, width: size, height: size }]}>
          <Text style={[styles.buttonText, { color, fontSize: size / 2 }]}>B</Text>
        </View>
      </LongPressGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
  },
  button2: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});

export default Buttons;
