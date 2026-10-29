import styled from '@emotion/native';
import { Pressable } from 'react-native';

export const TILE_W = 130;
export const TILE_H = 180;

export const AddTile = styled(Pressable)<{ $media: boolean }>((props) => ({
  width: props.$media ? TILE_W : '100%',
  height: TILE_H,
  borderRadius: props.theme.borderRadius.square,
  borderWidth: 2,
  borderStyle: 'dashed' as const,
  borderColor: props.theme.colors.primary.base,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  gap: props.theme.spacing.xs,
}));

export const MediaTile = styled(Pressable)((props) => ({
  width: TILE_W,
  height: TILE_H,
  borderRadius: props.theme.borderRadius.square,
  overflow: 'hidden' as const,
  backgroundColor: props.theme.colors.neutral.gray.light,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
}));

export const VideoOverlay = styled.View((props) => ({
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: props.theme.colors.overlay.dark,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  paddingLeft: 2,
}));

export const FullscreenBackdrop = styled(Pressable)(() => ({
  flex: 1,
  backgroundColor: '#000',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
}));
