import styled from '@emotion/native';
import { Text } from '../../../components/atoms/Text/Text.style';
import { Theme } from '@emotion/react/dist/declarations/src';
import Animated from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import { SegmentedControlProps } from './SegmentedControl.types';

export const CustomText = styled(Text)(
  (props: { size?: SegmentedControlProps['size']; theme: Theme }) => ({
    paddingHorizontal: props.theme.spacing.xxl,
    height: props.size === 'lg' ? 60 : 40,
    lineHeight: props.size === 'lg' ? 60 : 40,
    fontSize: props.size ? props.theme.fontSizes[props.size] : props.theme.fontSizes.md,
  }),
);

export const SegmentedContainer = styled.View<{ borderRadius: string }>((props) => ({
  flexDirection: 'row',
  backgroundColor: props.theme.colors.neutral.gray.light,
  padding: props.theme.spacing.xs,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
  gap: props.theme.spacing.xs,
  position: 'relative',
  alignItems: 'center',
}));

export const Pointer = styled(Animated.View)<{ borderRadius: string; color?: string }>((props) => ({
  position: 'absolute',
  top: props.theme.spacing.xs,
  height: '100%',
  backgroundColor: props.color ?? props.theme.colors.primary.base,
  zIndex: 0,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
}));

export const MaskedContainer = styled(MaskedView)((props) => ({
  flexDirection: 'row',
  position: 'absolute',
  padding: props.theme.spacing.xs,
  gap: props.theme.spacing.xs,
  width: '100%',
  bottom: 0,
  zIndex: 1,
}));

export const MaskOverlay = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: props.theme.spacing.xs,
  height: '100%',
  backgroundColor: 'black',
}));
