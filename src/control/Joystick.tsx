import React, { useState, useEffect, useReducer, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface JoystickProps {
  joystickId: string;
  onDataChange: (data: any) => void;
  size?: number;
  backgroundColor?: string;
  ballColor?: string;
  ballOpacity?: number;

  precision?: number; // ex: 8, 16, 32, 64
  deadZone?: number; // ex: 0.05
  changeThreshold?: number; // ex: 200
}

interface JoystickState {
  joystick: {
    duration: number;
    x: number;
    y: number;
  };
}

const initialState: JoystickState = {
  joystick: {
    duration: 0,
    x: 0,
    y: 0,
  },
};

const reducer = (state: JoystickState, action: { type: string; payload: any }): JoystickState =>
  action.type === 'JOYSTICK' ? { joystick: action.payload } : state;

const Joystick: React.FC<JoystickProps> = ({
  joystickId,
  onDataChange,
  size = 110,
  backgroundColor = '#DDD',
  ballColor = 'blue',
  ballOpacity = 0.9,
  precision = 128,
  deadZone = 0.03,
  changeThreshold = 50,
}) => {
  const [controller, updateController] = useReducer(reducer, initialState);
  const [vector, setVector] = useState({ x: 0, y: 0 });

  const lastSentData = useRef({ x: 0, y: 0 });

  const mapToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    return Math.round(((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin);
  };

  const quantize = (value: number, levels: number): number => {
    const step = 2 / (levels - 1);
    return Math.round(value / step) * step;
  };


  const startJoystick = (event: any) => {
    const X = event.nativeEvent.translationX;
    const Y = event.nativeEvent.translationY;
    const radius = size / 2;
    const maxDistance = radius - 15;
    const scale = 1 / radius;
    const scaledX = X * scale;
    const scaledY = Y * scale;

    let x = Math.max(-1, Math.min(1, scaledX));
    let y = Math.max(-1, Math.min(1, scaledY));

    if (Math.abs(x) < deadZone) x = 0;
    if (Math.abs(y) < deadZone) y = 0;

    x = quantize(x, precision);
    y = quantize(y, precision);

    const distance = Math.sqrt(x * x + y * y);
    if (distance > 1) {
      x /= distance;
      y /= distance;
    }

    let rawX = Math.max(-1, Math.min(1, scaledX));
    let rawY = Math.max(-1, Math.min(1, scaledY));

    if (Math.abs(rawX) < deadZone) rawX = 0;
    if (Math.abs(rawY) < deadZone) rawY = 0;

    const rawDistance = Math.sqrt(rawX * rawX + rawY * rawY);
    if (rawDistance > 1) {
      rawX /= rawDistance;
      rawY /= rawDistance;
    }

    const visualX = rawX * maxDistance;
    const visualY = rawY * maxDistance;

    setVector({ x: visualX, y: visualY });

    const mappedX = mapToRange(x, -1, 1, -32768, 32767);
    const mappedY = mapToRange(-y, -1, 1, -32768, 32767);

    // 🔥 Evita enviar dados idênticos para reduzir carga no WebSocket
    if (
      Math.abs(mappedX - lastSentData.current.x) >= changeThreshold ||
      Math.abs(mappedY - lastSentData.current.y) >= changeThreshold
    ) {
      lastSentData.current = { x: mappedX, y: mappedY };

      const newJoystickData = {
        duration: controller.joystick.duration + 1,
        x: mappedX,
        y: mappedY,
        id: joystickId,
      };

      updateController({
        type: 'JOYSTICK',
        payload: newJoystickData,
      });

      onDataChange(newJoystickData);
    }
  };

  const stopJoystick = () => {
    setVector({ x: 0, y: 0 });

    const resetData = {
      duration: 0,
      x: 0,
      y: 0,
      id: joystickId,
    };

    updateController({
      type: 'JOYSTICK',
      payload: resetData,
    });

    onDataChange(resetData);
  };

  useEffect(() => {
    onDataChange({ type: 'init', id: joystickId });
  }, [joystickId]);

  return (
    <View>
      <PanGestureHandler
        onGestureEvent={startJoystick}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            stopJoystick();
          }
        }}>
        <View style={[styles.container, { width: size, height: size }]}>
          <View style={[styles.joystickBackground, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
            <View
              style={[
                styles.joystickBall,
                {
                  backgroundColor: ballColor,
                  width: size * 0.3,
                  height: size * 0.3,
                  borderRadius: (size * 0.3) / 2,
                  transform: [{ translateX: vector.x }, { translateY: vector.y }],
                  opacity: ballOpacity,
                },
              ]}
            />
          </View>
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
  joystickBackground: {
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickBall: {
    opacity: 0.9,
  },
});

export default Joystick;
