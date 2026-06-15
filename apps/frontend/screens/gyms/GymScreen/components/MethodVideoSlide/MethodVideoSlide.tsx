import { useRef } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Icon, Text, theme } from 'kordo-ui';
import { BlocMediaWithAuthor } from '../../../../../fake_data';

interface MethodVideoSlideProps {
  entry: BlocMediaWithAuthor;
  width?: number;
  height?: number;
  /** Ouvre la visionneuse type "stories" (gérée par le parent) sur cette vidéo. */
  onPress?: () => void;
}

// Slide d'aperçu d'une vidéo de méthode : première frame (aperçu réel) + bouton play + auteur.
// Au tap, ouvre la visionneuse type "stories" (tap gauche/droite = vidéo préc./suiv.) via `onPress`.
export function MethodVideoSlide({ entry, width = 180, height = 260, onPress }: MethodVideoSlideProps) {
  const { media, author } = entry;
  const ref = useRef<VideoView>(null);
  const player = useVideoPlayer(media.url, (p) => {
    p.loop = true;
  });

  return (
    <Pressable
      onPress={onPress}
      style={{
        width,
        height,
        borderRadius: theme.borderRadius.square,
        overflow: 'hidden',
        backgroundColor: theme.colors.secondary.base,
      }}
    >
      {/* Le VideoView en pause affiche la première frame → l'aperçu reflète la vidéo */}
      <VideoView
        ref={ref}
        player={player}
        style={{ width, height }}
        contentFit="cover"
        // TextureView : la SurfaceView par défaut (Android) ne suit pas le scroll/les transforms
        // du Slider et « bave » d'une preview à l'autre quand plusieurs vidéos se chevauchent.
        surfaceType="textureView"
        nativeControls={false}
      />

      {/* Écran de présentation : bouton play + auteur */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Voile léger pour faire ressortir le bouton sans masquer la frame */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        />
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 4,
          }}
        >
          <Icon name="play" size="lg" color={theme.colors.neutral.white} />
        </View>

        {author && (
          <View
            style={{
              position: 'absolute',
              left: theme.spacing.sm,
              bottom: theme.spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.spacing.xs,
              backgroundColor: 'rgba(0,0,0,0.45)',
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.sm,
              borderRadius: theme.borderRadius.rounded,
            }}
          >
            <Image
              source={{ uri: author.avatarUrl }}
              style={{ width: 24, height: 24, borderRadius: 12 }}
            />
            <Text size="sm" style={{ color: theme.colors.neutral.white }}>
              {author.firstName}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
