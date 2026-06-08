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
  boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.05)',
});

export const Header = styled(View)({
  gap: theme.spacing.md,
});

export const Actions = styled(View)({
  width: '100%',
  flexDirection: 'row',
  gap: theme.spacing.lg,
});
