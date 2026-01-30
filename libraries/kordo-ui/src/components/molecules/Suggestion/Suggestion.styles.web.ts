import styled from '@emotion/styled';

export const Container = styled.div(() => ({
  width: 200,
  height: 240,
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

export const ButtonWrapper = styled.div(() => ({
  position: 'absolute' as const,
  top: 8,
  right: 8,
  cursor: 'pointer',
}));

export const CustomImage = styled.img(() => ({
  width: 80,
  height: 80,
  borderRadius: 40,
  objectFit: 'cover' as const,
}));

export const UserInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
}));
