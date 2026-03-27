import styled from '@emotion/styled';
import { Text } from '../../atoms/Text/Text';

export const SegmentedContainer = styled.div<{ borderRadius?: 'rounded' | 'square' }>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: props.theme.colors.neutral.gray.light,
  borderRadius: props.borderRadius === 'rounded' ? 100 : 8,
  padding: 4,
  position: 'relative',
}));

export const Segment = styled.div<{ isSelected: boolean; color?: string }>((props) => ({
  padding: '8px 16px',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
  transition: 'color 0.2s ease',
}));

export const Pointer = styled.div<{
  borderRadius?: 'rounded' | 'square';
  left: number;
  width: number;
  color: string;
}>((props) => ({
  position: 'absolute',
  top: 4,
  bottom: 4,
  left: props.left,
  width: props.width,
  backgroundColor: props.color,
  borderRadius: props.borderRadius === 'rounded' ? 100 : 6,
  transition: 'left 0.2s ease, width 0.2s ease, background-color 0.2s ease',
}));

export const CustomText = styled(Text)<{ isSelected?: boolean }>((props) => ({
  cursor: 'pointer',
  padding: '8px 16px',
  position: 'relative',
  zIndex: 1,
  color: props.isSelected ? '#fff' : props.theme.colors.neutral.black,
  transition: 'color 0.2s ease',
}));
