import { useRef } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { useTheme } from '@emotion/react';
import * as Styled from './Message.styles';
import { MessageProps } from './Message.types';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';

const DOUBLE_TAP_MS = 280;

// Bulle d'un message dans un fil de discussion. `direction` décide de tout : la couleur, le bord
// sur lequel la bulle s'aligne, et celui que suit l'horodatage — c'est pour ça que l'heure vit
// ici plutôt que dans l'écran, qui aurait à refaire ce calcul à chaque message.
// Un média se passe en `children` : la bulle retire alors son rembourrage et se contente du fond.
// Double tap sur la bulle : j'aime, signalé par un petit cœur accroché à la bulle.
export const Message: React.FC<MessageProps> = ({
  direction,
  content,
  time,
  continued,
  liked,
  onLike,
  children,
  style,
}) => {
  const theme = useTheme();
  const Container = children ? Styled.MediaBubble : Styled.Bubble;
  const lastTap = useRef(0);

  const onPress = () => {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0;
      onLike?.();
      return;
    }
    lastTap.current = now;
  };

  return (
    <Styled.Row direction={direction}>
      <Pressable onPress={onLike ? onPress : undefined} style={{ maxWidth: '78%' }}>
        <Container direction={direction} continued={!!continued} style={style}>
          {children ?? (
            <Text appearance={direction === 'out' ? 'white' : 'black'} style={{ lineHeight: 21 }}>
              {content}
            </Text>
          )}
        </Container>

        {liked && (
          <Animated.View
            entering={ZoomIn.springify().damping(12)}
            style={{
              position: 'absolute',
              bottom: -10,
              [direction === 'out' ? 'left' : 'right']: 8,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: theme.colors.surface,
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon
              name="HeartFilled"
              size={13}
              color={theme.mode === 'dark' ? theme.colors.text : theme.colors.error.base}
            />
          </Animated.View>
        )}
      </Pressable>

      {!!time && (
        <View style={{ marginTop: liked ? 10 : 4, marginHorizontal: 6, marginBottom: 6 }}>
          <Text size={11} bold appearance="gray">
            {time}
          </Text>
        </View>
      )}
    </Styled.Row>
  );
};
