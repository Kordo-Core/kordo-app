import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import * as Styled from './Radio.styles';
import { RadioProps } from './Radio.types';
import { getColor } from '../../../utils/getColors';

// Pastille de choix exclusif, et rien d'autre : le libellé et la mise en page de la ligne
// appartiennent au parent, en général un `ListRow`. Un radio ne connaît pas ses voisins —
// l'exclusivité vient de l'état unique que le parent compare à chaque valeur.
export const Radio: React.FC<RadioProps> = ({
  selected,
  onSelect,
  appearance = 'secondary',
  disabled,
  style,
}) => {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onSelect}
      style={style}
    >
      <Styled.Dot selected={selected} color={getColor(theme, appearance)} disabled={disabled}>
        {selected && <Styled.Inner />}
      </Styled.Dot>
    </Pressable>
  );
};
