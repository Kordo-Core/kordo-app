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
      position: 'relative' as const,
    };
  }

  const size = props.theme.avatarSizes.md + 8;
  return {
    width: size,
    height: size,
    borderColor: props.theme.colors.secondary.base,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: '50%',
    padding: 2,
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box' as const,
  };
});

export const CustomImage = styled.img<Pick<UserInfoProps, 'layout'>>((props) => ({
  width: props.layout === 'column' ? props.theme.avatarSizes.lg : props.theme.avatarSizes.md,
  height: props.layout === 'column' ? props.theme.avatarSizes.lg : props.theme.avatarSizes.md,
  borderRadius: '50%',
  objectFit: 'cover' as const,
  display: 'block' as const,
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
  bottom: -5,
  left: '50%',
  transform: 'translateX(-50%)',
}));
