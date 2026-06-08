import styled from '@emotion/native';
import { Theme } from '@emotion/react/dist/declarations/src';
import Animated from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { SegmentedControlProps } from './SegmentedControl.types';
import { Text } from '../../atoms/Text/Text';

export const SegmentItem = styled.View(() => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const CustomText = styled(Text)(
  (props: { size?: SegmentedControlProps['size']; theme: Theme }) => ({
    height: props.size === 'lg' ? 60 : 40,
    lineHeight: props.size === 'lg' ? 60 : 40,
    fontSize: props.size ? props.theme.fontSizes[props.size] : props.theme.fontSizes.md,
    textAlign: 'center',
  }),
);

export const SegmentedContainer = styled(BlurView)<{ borderRadius: string }>((props) => ({
  flexDirection: 'row',
  backgroundColor: 'transparent',
  padding: props.theme.spacing.xs,
  borderRadius:
    props.borderRadius === 'rounded'
      ? props.theme.borderRadius.rounded
      : props.theme.borderRadius.square,
  gap: props.theme.spacing.xs,
  position: 'relative',
  alignItems: 'center',
  flex: 1,
  overflow: 'hidden',
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
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: props.theme.spacing.xs,
  gap: props.theme.spacing.xs,
  zIndex: 1,
}));

export const MaskOverlay = styled(Animated.View)((props) => ({
  position: 'absolute',
  top: props.theme.spacing.xs,
  height: '100%',
  backgroundColor: 'black',
}));
