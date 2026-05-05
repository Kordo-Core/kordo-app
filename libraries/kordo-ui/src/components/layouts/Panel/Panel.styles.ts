import styled from '@emotion/native';

export const Container = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
});

export const Sheet = styled.View((props) => ({
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  overflow: 'hidden',
  backgroundColor: props.theme.colors.neutral.white,
}));

export const HandleArea = styled.View((props) => ({
  backgroundColor: props.theme.colors.neutral.white,
  alignItems: 'center',
  paddingVertical: props.theme.spacing.sm,
}));

export const Handle = styled.View((props) => ({
  width: 80,
  height: 4,
  backgroundColor: props.theme.colors.neutral.gray.light,
  borderRadius: props.theme.borderRadius.rounded,
}));

export const Panel = styled.View((props) => ({
  backgroundColor: props.theme.colors.neutral.white,
  padding: props.theme.spacing.md,
  minHeight: 200,
}));

export const Title = styled.Text((props) => ({
  fontSize: props.theme.fontSizes.lg,
  fontWeight: 'bold',
  color: props.theme.colors.neutral.white,
  marginBottom: props.theme.spacing.sm,
}));
