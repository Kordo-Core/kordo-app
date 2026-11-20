import styled from '@emotion/native';
import { View } from 'react-native';

// En-tête de date dans la liste des blocs
export const SectionHeader = styled(View)((props) => ({
  paddingTop: props.theme.spacing.md,
  paddingBottom: props.theme.spacing.sm,
  paddingInline: props.theme.spacing.lg + 2,
}));
