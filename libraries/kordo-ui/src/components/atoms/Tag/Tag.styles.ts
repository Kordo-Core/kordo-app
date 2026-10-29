import styled from '@emotion/native';
import { TagProps } from './Tag.types';
import { getColor } from '../../../utils/getColors';

export const Tag = styled.View<{ appearance: TagProps['appearance'] }>((props) => ({
  paddingHorizontal: props.theme.spacing.md,
  height: 32,
  alignSelf: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.xs,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: getColor(props.theme, props.appearance ?? 'primary'),
}));
