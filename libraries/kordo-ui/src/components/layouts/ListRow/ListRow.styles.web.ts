import styled from '@emotion/styled';

export const Row = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
  width: '100%',
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
  gap: 16,
  boxSizing: 'border-box' as const,
}));

export const Left = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row' as const,
  gap: 4,
}));

export const Right = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row' as const,
  gap: 4,
  marginLeft: 'auto',
}));

export const TextWrapper = styled.div(() => ({
  flexShrink: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: 0,
}));
