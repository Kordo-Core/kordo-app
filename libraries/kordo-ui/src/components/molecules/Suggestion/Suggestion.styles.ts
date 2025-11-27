import styled from '@emotion/native';
import { Bounce } from '../../../animations/Bounce/Bounce';
import { Image } from 'react-native';

export const Container = styled.View(() => ({
  width: 200,
  height: 230,
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));

export const Content = styled.View(() => ({
  alignItems: 'center',
  display: 'flex',
  gap: 8,
}));

export const ButtonWrapper = styled.View(() => ({
  position: 'absolute',
  top: 8,
  right: 8,
}));

export const CustomImage = styled(Image)(() => ({
  width: 80,
  height: 80,
  borderRadius: 40,
}));

export const UserInfo = styled.View(() => ({
  alignItems: 'center',
  display: 'flex',
}));
