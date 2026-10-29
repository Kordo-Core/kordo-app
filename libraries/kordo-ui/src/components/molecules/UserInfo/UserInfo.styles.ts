import styled from '@emotion/native';
import { Image } from 'react-native';
import { UserInfoProps } from './UserInfo.types';
import { Text } from '../../atoms/Text/Text';

export const Column = styled.View(() => ({
  alignItems: 'center',
  display: 'flex',
  gap: 8,
}));

export const Row = styled.View(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
}));

export const AvatarWrapper = styled.View<Pick<UserInfoProps, 'highlightedAvatar'>>((props) => {
  if (!props.highlightedAvatar) {
    return {
      borderWidth: 0,
      padding: 0,
    };
  }

  return {
    borderColor: props.theme.colors.secondary.base,
    borderWidth: 2,
    borderRadius: props.theme.borderRadius.rounded,
    padding: 2,
  };
});

export const CustomImage = styled(Image)<Pick<UserInfoProps, 'layout'>>((props) => ({
  width: props.layout === 'column' ? props.theme.avatarSizes.lg : props.theme.avatarSizes.md,
  height: props.layout === 'column' ? props.theme.avatarSizes.lg : props.theme.avatarSizes.md,
  borderRadius: props.theme.borderRadius.rounded,
}));

export const UserData = styled.View<Pick<UserInfoProps, 'layout'>>((props) => ({
  alignItems: props.layout === 'column' ? 'center' : 'flex-start',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: props.layout === 'column' ? 2 : 0,
  // En mode ligne, autorise le bloc texte à se rétrécir pour revenir à la ligne
  // au lieu de déborder (ex. message long d'une notification à côté d'un bouton).
  flexShrink: props.layout === 'column' ? 0 : 1,
}));

export const CustomText = styled(Text)<Pick<UserInfoProps, 'layout'>>((props) => ({
  textAlign: props.layout === 'column' ? 'center' : 'left',
}));

export const Now = styled.View((props) => ({
  paddingHorizontal: 0,
  width: 36,
  height: 16,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.secondary.base,
  position: 'absolute',
  bottom: -6,
  left: 9,
}));
