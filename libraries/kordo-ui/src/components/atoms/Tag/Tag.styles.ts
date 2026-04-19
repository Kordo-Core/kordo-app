import styled from '@emotion/native';
import { TagProps } from './Tag.types';
import { getColor } from '../../../utils/getColors';

export const Tag = styled.View<{ appearance: TagProps['appearance'] }>((props) => ({
  paddingHorizontal: props.theme.spacing.md,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: getColor(props.appearance ?? 'primary'),
}));
