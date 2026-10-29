import styled from '@emotion/native';

export const Content = styled.View((props) => ({
  flexDirection: 'column',
  gap: props.theme.spacing.md,
}));

export const Avatar = styled.Image((props) => ({
  width: props.theme.avatarSizes.md,
  height: props.theme.avatarSizes.md,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.neutral.gray.light,
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
  paddingLeft: props.theme.spacing.lg,
}));
