import styled from '@emotion/native';
import { TagProps } from './Tag.types';

export const Tag = styled.View<{ appearance: TagProps['appearance'] }>((props) => ({
  paddingHorizontal: props.theme.spacing.md,
  height: 32,
  justifyContent: 'center',
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor:
    props.appearance === 'secondary'
      ? props.theme.colors.secondary.base
      : props.theme.colors.primary.base,
}));
