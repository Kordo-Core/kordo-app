import { useTheme } from '@emotion/react';
import * as Styled from './Checkbox.styles';
import { CheckboxProps } from './Checkbox.types';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

// Case à cocher contrôlée, avec libellé optionnel à gauche
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const theme = useTheme();
  return (
    <Styled.Container
      disabled={props.disabled}
      onPress={() => !props.disabled && props.onChange(!props.checked)}
    >
      {props.label != null && (
        <Styled.LabelWrapper>
          {typeof props.label === 'string' ? <Text size="md">{props.label}</Text> : props.label}
        </Styled.LabelWrapper>
      )}
      <Styled.Box checked={props.checked}>
        {props.checked && (
          <Icon name="CheckmarkFilled" size={14} color={theme.colors.neutral.white} />
        )}
      </Styled.Box>
    </Styled.Container>
  );
};
