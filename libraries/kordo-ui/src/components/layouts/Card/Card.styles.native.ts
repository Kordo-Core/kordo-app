import styled from '@emotion/native';

export const Card = styled.View((props) => ({
  borderRadius: props.theme.borderRadius.square,
  backgroundColor: props.theme.colors.neutral.white,
  position: 'relative',
  alignSelf: 'flex-start',
  padding: props.theme.spacing.md,
  // Shadow iOS
  shadowColor: props.theme.colors.neutral.black,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,

  // Shadow Android
  elevation: 3,
}));
