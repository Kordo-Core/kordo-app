import styled from '@emotion/native';

export const Content = styled.View((props) => ({
  flexDirection: 'column',
  gap: props.theme.spacing.md,
}));

export const Avatar = styled.Image((props) => ({
  width: props.theme.avatarSizes.md,
  height: props.theme.avatarSizes.md,
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.surfaceAlt,
}));

export const PostContent = styled.View((props) => ({
  flexDirection: 'row',
  gap: props.theme.spacing.sm,
  alignItems: 'center',
}));

// Le commentaire est décalé sous le rappel de la publication, comme une réponse.
export const Reply = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: props.theme.spacing.md,
  marginLeft: props.theme.spacing.lg,
  paddingLeft: props.theme.spacing.md,
  borderLeftWidth: 2,
  borderLeftColor: props.theme.colors.secondary.base,
}));
