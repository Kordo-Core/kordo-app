import styled from '@emotion/styled';
import { UserInfoProps } from './UserInfo.types';

export const Column = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: 8,
}));

export const Row = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
  gap: 16,
}));

export const AvatarWrapper = styled.div<Pick<UserInfoProps, 'highlightedAvatar'>>((props) => {
  if (!props.highlightedAvatar) {
    return {
      borderWidth: 0,
      padding: 0,
      position: 'relative' as const,
    };
  }

  return {
    borderColor: props.theme.colors.secondary.base,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: props.theme.borderRadius.rounded,
    padding: 2,
    position: 'relative' as const,
  };
});

export const CustomImage = styled.img<Pick<UserInfoProps, 'layout'>>((props) => ({
  width: props.layout === 'column' ? props.theme.avatarSizes.lg : props.theme.avatarSizes.md,
  height: props.layout === 'column' ? props.theme.avatarSizes.lg : props.theme.avatarSizes.md,
  borderRadius: props.theme.borderRadius.rounded,
  objectFit: 'cover' as const,
}));

export const UserData = styled.div<Pick<UserInfoProps, 'layout'>>((props) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: props.layout === 'column' ? 'center' : 'flex-start',
  justifyContent: 'flex-start',
  gap: props.layout === 'column' ? 2 : 0,
}));

export const Now = styled.div((props) => ({
  width: 36,
  height: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.secondary.base,
  position: 'absolute' as const,
  bottom: -6,
  left: 9,
}));
