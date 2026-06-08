import styled from '@emotion/native';
import { theme } from 'kordo-ui';
import { View } from 'react-native';

export const Container = styled.View(() => ({
  flex: 1,
  backgroundColor: theme.colors.primary.lightest,
}));

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
