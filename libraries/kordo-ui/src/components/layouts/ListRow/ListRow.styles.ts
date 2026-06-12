import styled from '@emotion/native';

export const Row = styled.View((props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
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
  //TODO alignItems: 'center',
  pointerEvents: 'none',
}));

export const LeftWrapper = styled.View((props) => ({
  minWidth: props.theme.spacing.xxl,
}));
