import styled from '@emotion/native';
import { Image } from 'react-native';

export const Row = styled.View(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
}));

export const AvatarWrapper = styled.View<{ $svgSize: number }>((props) => ({
  width: props.$svgSize,
  height: props.$svgSize,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CustomImage = styled(Image)((props) => ({
  width: props.theme.avatarSizes.md,
  height: props.theme.avatarSizes.md,
  borderRadius: props.theme.borderRadius.rounded,
}));
