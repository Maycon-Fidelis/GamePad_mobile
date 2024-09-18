import React, { useState, useEffect, useReducer } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface JoystickProps {
  joystickId: string;
  onDataChange: (data: any) => void; // Callback genérico para o desenvolvedor decidir como tratar os dados
  size?: number;
  backgroundColor?: string;
  ballColor?: string;
  ballOpacity?: number;
}

interface JoystickState {
  joystick: {
    duration: number;
    x: number;
    y: number;
  };
  buttons: Record<string, unknown>;
}

const initialState: JoystickState = {
  joystick: {
    duration: 0,
    x: 0,
    y: 0,
  },
  buttons: {},
};

const reducer = (state: JoystickState, action: { type: string; payload: any }): JoystickState =>
  action.type === 'JOYSTICK'
    ? { joystick: action.payload, buttons: state.buttons }
    : { joystick: state.joystick, buttons: action.payload };

const Joystick: React.FC<JoystickProps> = ({
  joystickId,
  onDataChange, // Função callback flexível para o tratamento dos dados
  size = 110, // Valor padrão de tamanho
  backgroundColor = '#DDD', // Cor de fundo padrão
  ballColor = 'blue', // Cor da bola padrão
  ballOpacity = 0.9, // Opacidade padrão
}) => {
  const [controller, updateController] = useReducer(reducer, initialState);
  const [vector, setVector] = useState({ x: 0, y: 0 });

  const mapToRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    return Math.round(((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin);
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

    const distance = Math.sqrt(x * x + y * y);
    if (distance > 1) {
      x /= distance;
      y /= distance;
    }

    const visualX = x * maxDistance;
    const visualY = y * maxDistance;

    setVector({ x: visualX, y: visualY });

    const mappedX = mapToRange(x, -1, 1, -32768, 32767);
    const mappedY = mapToRange(-y, -1, 1, -32768, 32767);

    const newJoystickData = {
      duration: controller.joystick.duration + 1,
      x: mappedX,
      y: mappedY,
      id: joystickId,
    };

    // Atualizar o estado do joystick
    updateController({
      type: 'JOYSTICK',
      payload: newJoystickData,
    });

    // Enviar os dados para a função callback
    onDataChange(newJoystickData);
  };

  const stopJoystick = () => {
    setVector({ x: 0, y: 0 });

    const resetData = {
      duration: 0,
      x: 0,
      y: 0,
      id: joystickId,
    };

    // Atualizar o estado do joystick
    updateController({
      type: 'JOYSTICK',
      payload: resetData,
    });

    // Enviar os dados para a função callback
    onDataChange(resetData);
  };

  useEffect(() => {
    // Joystick inicializado
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
