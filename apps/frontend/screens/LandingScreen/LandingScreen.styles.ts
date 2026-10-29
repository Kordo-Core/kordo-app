import styled from '@emotion/native';
import { Image, View } from 'react-native';

export const ImageContainer = styled(View)({
  height: '60%',
});

export const Img = styled(Image)({
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Card = styled(View)((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.neutral.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '45%',
  padding: props.theme.spacing.xxl,
  paddingBottom: 60,
  justifyContent: 'space-between',
  boxShadow: props.theme.shadows.up,
}));

export const Header = styled(View)((props) => ({
  gap: props.theme.spacing.md,
}));

export const Actions = styled(View)((props) => ({
  width: '100%',
  flexDirection: 'row',
  gap: props.theme.spacing.lg,
}));
