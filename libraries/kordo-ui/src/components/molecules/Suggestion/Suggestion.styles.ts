import styled from '@emotion/native';
import { Image } from 'react-native';

export const Container = styled.View(() => ({
  width: 180,
  height: 220,
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
  top: 0,
  right: 0,
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
