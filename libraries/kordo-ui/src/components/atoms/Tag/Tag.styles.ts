import styled from '@emotion/native';
import { TagProps } from './Tag.types';
import { getColor } from '../../../utils/getColors';

export const Tag = styled.View<{ appearance: TagProps['appearance'] }>((props) => ({
  paddingHorizontal: props.theme.spacing.sm + 2,
  height: 26,
  alignSelf: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.xs,
  borderRadius: props.theme.borderRadius.sm - 1,
  backgroundColor: getColor(props.theme, props.appearance ?? 'primary'),
}));
