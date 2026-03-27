import styled from '@emotion/styled';
import { TagProps } from './Tag.types';
import { getColor } from '../../../utils/getColors';

export const Tag = styled.div<{ appearance: TagProps['appearance'] }>((props) => ({
  paddingLeft: props.theme.spacing.md,
  paddingRight: props.theme.spacing.md,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: getColor(props.appearance ?? 'primary'),
}));
