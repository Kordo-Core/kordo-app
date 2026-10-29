import styled from '@emotion/native';
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

export const Card = styled(View)((props) => ({
  backgroundColor: props.theme.colors.background,
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  width: '100%',
  overflow: 'hidden',
  boxShadow: props.theme.shadows.up,
}));
