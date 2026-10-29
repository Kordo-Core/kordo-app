import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import * as Styled from './Checkbox.styles';
import { CheckboxProps } from './Checkbox.types';
import { Icon } from '../Icon/Icon';
import { getColor } from '../../../utils/getColors';

// Case à cocher, et rien d'autre : le libellé et la mise en page de la ligne appartiennent
// au parent, en général un `ListRow`.
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  appearance = 'secondary',
  disabled,
  style,
}) => {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={style}
    >
      <Styled.Box checked={checked} color={getColor(theme, appearance)} disabled={disabled}>
        {checked && <Icon name="CheckmarkFilled" size={14} color={theme.colors.neutral.white} />}
      </Styled.Box>
    </Pressable>
  );
};
