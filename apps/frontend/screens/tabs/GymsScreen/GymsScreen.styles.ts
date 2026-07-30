import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { Image, View } from 'react-native';

export const ImageContainer = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
});

export const Img = styled(Image)({
  width: '100%',
  height: '115%',
});

export const Card = styled(View)({
  backgroundColor: theme.colors.neutral.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  width: '100%',
  overflow: 'hidden',
  boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.05)',
});
