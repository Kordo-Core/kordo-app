import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import * as Styled from './Dialog.styles';
import { DialogProps } from './Dialog.types';
import { Text } from '../../atoms/Text/Text';

const DURATION = 180;
// Échelle de départ : la boîte grandit légèrement à l'ouverture plutôt que d'apparaître d'un bloc.
const START_SCALE = 0.9;

// Boîte de dialogue modale centrée. Le contenu est libre — le composant ne fournit que le voile,
// la boîte et le titre : les boutons et leur disposition sont l'affaire de l'appelant.
export const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  isOpen = false,
  onClose,
  dismissOnOverlayPress = true,
}) => {
  // Monte le composant à l'ouverture, et attend la fin de l'animation pour le démonter.
  const [visible, setVisible] = useState(isOpen);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      progress.value = withTiming(1, { duration: DURATION });
      return;
    }

    progress.value = withTiming(0, { duration: DURATION }, (finished) => {
      if (finished) runOnJS(setVisible)(false);
    });
  }, [isOpen, progress]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  const boxStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: START_SCALE + progress.value * (1 - START_SCALE) }],
  }));

  if (!visible) return null;

  return (
    <Styled.Container>
      <Styled.Overlay style={overlayStyle}>
        <Pressable
          style={{ flex: 1 }}
          onPress={dismissOnOverlayPress ? onClose : undefined}
          disabled={!dismissOnOverlayPress}
        />
      </Styled.Overlay>

      <Styled.Box style={boxStyle}>
        {!!title && (
          <Text size="lg" extraBold>
            {title}
          </Text>
        )}
        {children}
      </Styled.Box>
    </Styled.Container>
  );
};
