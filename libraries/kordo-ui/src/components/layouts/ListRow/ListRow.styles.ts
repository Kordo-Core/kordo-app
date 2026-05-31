import styled from '@emotion/native';

export const Row = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: 16,
  paddingVertical: 8,
  gap: 16,
}));

export const Left = styled.View(() => ({
  flexDirection: 'row',
  gap: 4,
}));

export const Right = styled.View(() => ({
  flexDirection: 'row',
  gap: 4,
  marginLeft: 'auto',
}));

export const TextWrapper = styled.View(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  alignItems: 'center',
  pointerEvents: 'none',
}));
