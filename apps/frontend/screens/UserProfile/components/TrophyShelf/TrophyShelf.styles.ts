import styled from '@emotion/native';

export const Container = styled.View((props) => ({
  gap: props.theme.spacing.md,
}));

export const Slots = styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}));
