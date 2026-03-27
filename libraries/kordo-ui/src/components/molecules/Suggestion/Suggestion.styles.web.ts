import styled from '@emotion/styled';

export const Container = styled.div(() => ({
  width: 180,
  height: 220,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));

export const Content = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: 8,
}));

export const ButtonWrapper = styled.div((props) => ({
  position: 'absolute' as const,
  top: props.theme.spacing.md,
  right: props.theme.spacing.md,
  cursor: 'pointer',
}));

export const CustomImage = styled.img((props) => ({
  width: props.theme.avatarSizes.lg,
  height: props.theme.avatarSizes.lg,
  borderRadius: props.theme.borderRadius.rounded,
  objectFit: 'cover' as const,
}));

export const UserInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
}));
