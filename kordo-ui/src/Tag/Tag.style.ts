import styled from '@emotion/native';
import { TagProps } from './Tag.types';

export const Tag = styled.View<{ appearance: TagProps['appearance'] }>`
  padding-inline: ${(props) => props.theme.spacing.md};
  height: 32px;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.rounded};
  background-color: ${(props) => {
    switch (props.appearance) {
      case 'secondary':
        return props.theme.colors.secondary.color500;
      default:
        return props.theme.colors.primary.color500;
    }
  }};
`;
