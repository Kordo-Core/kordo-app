import styled from '@emotion/native';

const TROPHY_SIZE = 60;

export const Container = styled.View((props) => ({
  gap: props.theme.spacing.md,
}));

export const Slots = styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const Slot = styled.View<{ earned: boolean }>((props) => ({
  width: TROPHY_SIZE,
  height: TROPHY_SIZE,
  borderRadius: 18,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.earned
    ? props.theme.colors.primary.lightest
    : props.theme.colors.surfaceAlt,
}));

export const Footer = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: props.theme.spacing.md,
  borderTopWidth: 1,
  borderTopColor: props.theme.colors.border,
}));
