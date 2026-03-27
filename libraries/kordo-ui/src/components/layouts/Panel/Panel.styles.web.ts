import styled from '@emotion/styled';

const DURATION = '300ms';

export const Container = styled.div({
  position: 'fixed',
  inset: 0,
  zIndex: 999,
  pointerEvents: 'none',
});

export const Overlay = styled.div<{ isOpen: boolean }>((props) => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: props.isOpen ? 1 : 0,
  transition: `opacity ${DURATION} ease`,
  pointerEvents: props.isOpen ? 'auto' : 'none',
  cursor: 'pointer',
}));

export const Sheet = styled.div<{ isOpen: boolean }>((props) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: 400,
  backgroundColor: props.theme.colors.neutral.white,
  transform: props.isOpen ? 'translateX(0)' : 'translateX(100%)',
  transition: `transform ${DURATION} ease`,
  pointerEvents: 'auto',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
}));

export const PanelHeader = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: props.theme.spacing.md,
  borderBottom: `1px solid ${props.theme.colors.neutral.gray.light}`,
}));

export const Title = styled.span((props) => ({
  fontSize: props.theme.fontSizes.lg,
  fontWeight: 700,
  fontFamily: props.theme.fonts.bold,
  color: props.theme.colors.neutral.black,
}));

export const CloseButton = styled.button((props) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: props.theme.fontSizes.md,
  color: props.theme.colors.neutral.black,
  padding: props.theme.spacing.xs,
  lineHeight: 1,
  opacity: 0.6,
  ':hover': {
    opacity: 1,
  },
}));

export const Content = styled.div((props) => ({
  padding: props.theme.spacing.md,
  flex: 1,
  overflowY: 'auto',
}));
