import { useTheme } from '@emotion/react';
import * as Styled from './Radio.styles';
import { RadioProps } from './Radio.types';
import { Text } from '../Text/Text';
import { getColor } from '../../../utils/getColors';

// Option exclusive : libellé, description optionnelle, pastille à droite.
// Un radio seul ne connaît pas ses voisins — c'est `RadioGroup` qui garantit l'exclusivité.
export const Radio: React.FC<RadioProps> = ({
  selected,
  onSelect,
  label,
  description,
  appearance = 'secondary',
  disabled,
  style,
}) => {
  const theme = useTheme();

  return (
    <Styled.Container
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onSelect}
      style={style}
    >
      <Styled.Labels>
        {typeof label === 'string' ? <Text size="md">{label}</Text> : label}
        {typeof description === 'string' ? (
          <Text size="sm" appearance="gray">
            {description}
          </Text>
        ) : (
          description
        )}
      </Styled.Labels>

      <Styled.Dot selected={selected} color={getColor(theme, appearance)} />
    </Styled.Container>
  );
};
