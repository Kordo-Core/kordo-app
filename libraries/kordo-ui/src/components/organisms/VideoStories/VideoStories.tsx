import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { VideoStoriesProps } from './VideoStories.types';

// Seuil (px) / vélocité de glissement vers le bas au-delà desquels on ferme la visionneuse.
const DISMISS_DISTANCE = 140;
const DISMISS_VELOCITY = 800;

// Visionneuse type "stories" : plein écran, tap droite = suivante, tap gauche = précédente,
// barre de progression qui se remplit selon l'avancement de la vidéo, swipe vers le bas pour fermer.
export function VideoStories({ videos, initialIndex = 0, onClose }: VideoStoriesProps) {
  const [index, setIndex] = useState(initialIndex);
  // Avancement de la vidéo courante (0 → 1) pour remplir progressivement sa barre
  const [progress, setProgress] = useState(0);
  const { height } = useWindowDimensions();

  const player = useVideoPlayer(videos[initialIndex]?.url ?? '', (p) => {
    // Émet un événement de temps régulier pour animer la barre de progression
    p.timeUpdateEventInterval = 0.1;
    p.play();
  });

  // Change la source à chaque changement d'index
  useEffect(() => {
    const current = videos[index];
    if (current) {
      player.replace(current.url);
      player.play();
    }
  }, [index]);

  // Suit l'avancement de la vidéo courante → remplissage de la barre (reset à chaque vidéo)
  useEffect(() => {
    setProgress(0);
    const sub = player.addListener('timeUpdate', (payload) => {
      const duration = player.duration;
      if (duration > 0) setProgress(Math.min(payload.currentTime / duration, 1));
    });
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Avance automatiquement à la fin de la vidéo
  useEffect(() => {
    const sub = player.addListener('playToEnd', () => goNext());
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const goNext = () => setIndex((i) => (i < videos.length - 1 ? i + 1 : (onClose(), i)));
  const goPrev = () => setIndex((i) => Math.max(0, i - 1));

  // Glissement vertical : on suit le doigt vers le bas, et on ferme au-delà du seuil / d'une vélocité franche.
  const translateY = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .activeOffsetY(12)
    .failOffsetX([-20, 20])
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_DISTANCE || e.velocityY > DISMISS_VELOCITY) {
        translateY.value = withTiming(height, { duration: 200 }, (finished) => {
          if (finished) runOnJS(onClose)();
        });
      } else {
        translateY.value = withTiming(0, { duration: 150 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  if (videos.length === 0) return null;

  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <VideoView
              player={player}
              style={StyleSheet.absoluteFill}
              contentFit="contain"
              nativeControls={false}
            />

            {/* Zones de tap : gauche (précédent) / droite (suivant) */}
            <Pressable style={styles.left} onPress={goPrev} />
            <Pressable style={styles.right} onPress={goNext} />

            {/* Barres de progression : vidéos passées pleines, vidéo courante remplie selon l'avancement */}
            <View style={styles.progress} pointerEvents="none">
              {videos.map((v, i) => (
                <View key={v.id} style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%' },
                    ]}
                  />
                </View>
              ))}
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  left: { position: 'absolute', top: 0, bottom: 0, left: 0, width: '33%' },
  right: { position: 'absolute', top: 0, bottom: 0, right: 0, width: '67%' },
  progress: {
    position: 'absolute',
    top: 50,
    left: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
  },
  barTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 2, backgroundColor: '#fff' },
});
