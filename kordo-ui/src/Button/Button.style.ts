import styled from '@emotion/native';
import { ButtonProps } from './Button.types';

export const ButtonContainer = styled.Pressable<{ color: ButtonProps['color'] }>`
  background-color: ${(props) => {
    switch (props.color) {
      case 'primary':
        return props.theme.colors.primary.color500;
      case 'secondary':
        return props.theme.colors.secondary.color500;
      case 'black':
        return '#000000';
    }
  }};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const ButtonText = styled.Text<{ color: ButtonProps['color'] }>`
  color: ${(props) => props.theme.colors.neutral.white};
  font-size: ${(props) => props.theme.fontSizes.md};
`;
