import React from 'react';
import { useTheme } from '@emotion/react';
import { IconButtonProps } from './IconButton.types';
import * as Styled from './IconButton.styles';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { Bounce } from '../../../animations/Bounce/Bounce';

// Bouton carré arrondi portant une seule icône : retour, paramètres, filtres, appel…
// C'est le bouton des en-têtes du design D.
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  accessibilityLabel,
  variant = 'surface',
  size = 44,
  badge,
  style,
}) => {
  const theme = useTheme();
  const color =
    variant === 'glass'
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
        {badge !== undefined && (
          <Styled.Badge>
            <Text size={10} extraBold style={{ color: '#13201B' }}>
              {badge}
            </Text>
          </Styled.Badge>
        )}
      </Styled.Box>
    </Bounce>
  );
};
