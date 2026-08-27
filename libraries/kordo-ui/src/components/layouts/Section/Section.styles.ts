import styled from '@emotion/native';
import { ExtendedSizeType } from '../../../types/theme.types';

export const Section = styled.View<{ gap: ExtendedSizeType }>((props) => ({
  width: '100%',
  backgroundColor: props.theme.colors.neutral.white,
  padding: props.theme.spacing.md,
  gap: props.theme.spacing[props.gap],
  boxShadow: props.theme.shadows.sm,
}));
