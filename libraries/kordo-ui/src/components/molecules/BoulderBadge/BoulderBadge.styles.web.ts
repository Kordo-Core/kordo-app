import styled from '@emotion/styled';

export const AvatarWrapper = styled.div<{ $svgSize: number }>((props) => ({
  position: 'relative',
  width: props.$svgSize,
  height: props.$svgSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const CustomImage = styled.img({
  borderRadius: '50%',
  objectFit: 'cover',
});
