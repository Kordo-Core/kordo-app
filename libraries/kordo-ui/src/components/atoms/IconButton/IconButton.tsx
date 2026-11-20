import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { IconButtonProps } from './IconButton.types';
import * as Styled from './IconButton.styles';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';
import { CENTERED_TEXT } from '../../../utils/centeredText';

// Point de nouveauté : une onde s'en échappe toutes les 2 s (k-pulse du design D)
const PulseDot: React.FC = () => {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.quad) }),
      -1,
    );
  }, [pulse]);
  const waveStyle = useAnimatedStyle(() => ({
    opacity: 0.55 * (1 - pulse.value),
    transform: [{ scale: 1 + pulse.value * 2.2 }],
  }));

  return (
    <Styled.Dot>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: -2,
            left: -2,
            width: Styled.DOT_SIZE,
            height: Styled.DOT_SIZE,
            borderRadius: Styled.DOT_SIZE / 2,
            backgroundColor: '#3DFFA8',
          },
          waveStyle,
        ]}
      />
    </Styled.Dot>
  );
};

// Bouton carré arrondi portant une seule icône : retour, paramètres, filtres, appel…
// C'est le bouton des en-têtes du design D.
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  accessibilityLabel,
  variant = 'surface',
  size = 44,
  badge,
  badgeTone = 'action',
  dot,
  style,
}) => {
  const theme = useTheme();
  const color =
    variant === 'glass' || variant === 'tint'
      ? theme.colors.neutral.white
      : variant === 'soft'
        ? theme.colors.softText
        : variant === 'action'
          ? theme.colors.neutral.white
          : theme.colors.text;

  return (
    <Bounce onPress={onPress} style={style}>
      <Styled.Box
        variant={variant}
        size={size}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        <Icon name={icon} size={Math.round(size * 0.47)} color={color} />
        {dot && <PulseDot />}
        {badge !== undefined && (
          <Styled.Badge
            // Pastille orange des filtres : 18 px sans liseré (maquette)
            style={
              badgeTone === 'accent'
                ? {
                    backgroundColor: theme.colors.primary.base,
                    borderWidth: 0,
                    minWidth: 18,
                    height: 18,
                    paddingHorizontal: 0,
                  }
                : undefined
            }
          >
            {/* Hauteur de ligne = hauteur intérieure de la pastille : chiffre centré */}
            <Text
              size={11}
              extraBold
              style={[
                {
                  lineHeight: 18,
                  textAlign: 'center',
                  color:
                    badgeTone === 'accent'
                      ? theme.colors.navBarAccentIcon
                      : theme.colors.neutral.white,
                },
                CENTERED_TEXT,
              ]}
            >
              {badge}
            </Text>
          </Styled.Badge>
        )}
      </Styled.Box>
    </Bounce>
  );
};
