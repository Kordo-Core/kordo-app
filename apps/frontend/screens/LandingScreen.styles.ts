import styled from '@emotion/native';
import { Image, View } from 'react-native';
import { theme } from 'kordo-ui';

export const ImageContainer = styled(View)({
  height: '60%',
});

export const Img = styled(Image)({
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Card = styled(View)({
  flex: 1,
  backgroundColor: theme.colors.neutral.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '45%',
  padding: theme.spacing.xxl,
  paddingBottom: 60,
  justifyContent: 'space-between',
});

export const Header = styled(View)({
  gap: theme.spacing.md,
});

export const Actions = styled(View)({
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  gap: theme.spacing.lg,
});
