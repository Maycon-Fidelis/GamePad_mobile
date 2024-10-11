import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';

interface DpadProps {
  onData: (data: { button: string | null; action: 'press' | 'release' }) => void;
  color?: string;
  background?: string;
  size?: number;
}

const Dpad: React.FC<DpadProps> = ({
  onData,
  color = 'blue',
  background = 'white',
  size = 60,
}) => {
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleHover = (translationX: number, translationY: number) => {
    let newPressedButton: string | null = null;
    const threshold = size * 0.25;
    const deadZone = size * 0.2;

    if (Math.abs(translationX) < deadZone && Math.abs(translationY) < deadZone) {
      return;
    }

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX < -threshold) {
        newPressedButton = 'LEFT';
      } else if (translationX > threshold) {
        newPressedButton = 'RIGHT';
      }
    } else {
      if (translationY < -threshold) {
        newPressedButton = 'UP';
      } else if (translationY > threshold) {
        newPressedButton = 'DOWN';
      }
    }

    if (newPressedButton !== pressedButton) {
      if (pressedButton) {
        onData({ button: pressedButton, action: 'release' });
      }
      setPressedButton(newPressedButton);
      if (newPressedButton) {
        onData({ button: newPressedButton, action: 'press' });
      }
    }
  };

  const limitTranslation = (value: number, limit: number) => {
    return Math.max(Math.min(value, limit), -limit);
  };

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    let { translationX, translationY } = event.nativeEvent;

    translationX = limitTranslation(translationX, size);
    translationY = limitTranslation(translationY, size);

    handleHover(translationX, translationY);
  };

  const handleStateChange = (event: GestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END && pressedButton) {
      onData({ button: pressedButton, action: 'release' });
      setPressedButton(null);
    } else if (event.nativeEvent.state === State.CANCELLED || event.nativeEvent.state === State.FAILED) {
      if (pressedButton) {
        onData({ button: pressedButton, action: 'release' });
      }
      setPressedButton(null);
    }
  };

  const handleButtonPress = (button: string) => {
    setPressedButton(button);
    onData({ button, action: 'press' });
  };

  const handleButtonRelease = () => {
    if (pressedButton) {
      onData({ button: pressedButton, action: 'release' });
      setPressedButton(null);
    }
  };

  const textSize = size * 0.4;

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleStateChange}
    >
      <View style={styles.dpadContainer}>
        <View style={styles.dpadRow}>
          <TouchableWithoutFeedback
            onPressIn={() => handleButtonPress('LEFT')}
            onPressOut={handleButtonRelease}
          >
            <View
              style={[
                styles.dpadButton,
                styles.dpadLeft,
                { backgroundColor: background, width: size, height: size },
                { opacity: pressedButton === 'LEFT' ? 0.5 : 1 },
              ]}
            >
              <Text style={[styles.dpadText, { color, fontSize: textSize }]}>◀</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.dpadColumn}>
            <TouchableWithoutFeedback
              onPressIn={() => handleButtonPress('UP')}
              onPressOut={handleButtonRelease}
            >
              <View
                style={[
                  styles.dpadButton,
                  styles.dpadUp,
                  { backgroundColor: background, width: size, height: size },
                  { opacity: pressedButton === 'UP' ? 0.5 : 1 },
                ]}
              >
                <Text style={[styles.dpadText, { color, fontSize: textSize }]}>▲</Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={[
                styles.dpadButton,
                { backgroundColor: background, width: size, height: size },
              ]}
            >
              <Text style={[styles.dpadText, { color, fontSize: textSize }]}>•</Text>
            </View>
            <TouchableWithoutFeedback
              onPressIn={() => handleButtonPress('DOWN')}
              onPressOut={handleButtonRelease}
            >
              <View
                style={[
                  styles.dpadButton,
                  styles.dpadDown,
                  { backgroundColor: background, width: size, height: size },
                  { opacity: pressedButton === 'DOWN' ? 0.5 : 1 },
                ]}
              >
                <Text style={[styles.dpadText, { color, fontSize: textSize }]}>▼</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback
            onPressIn={() => handleButtonPress('RIGHT')}
            onPressOut={handleButtonRelease}
          >
            <View
              style={[
                styles.dpadButton,
                styles.dpadRight,
                { backgroundColor: background, width: size, height: size },
                { opacity: pressedButton === 'RIGHT' ? 0.5 : 1 },
              ]}
            >
              <Text style={[styles.dpadText, { color, fontSize: textSize }]}>▶</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  dpadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpadColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpadButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpadLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  dpadRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  dpadUp: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  dpadDown: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  dpadText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Dpad;
