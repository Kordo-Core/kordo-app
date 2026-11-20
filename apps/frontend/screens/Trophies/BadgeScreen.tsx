import { useEffect, useState } from 'react';
import { Pressable, Share, useWindowDimensions, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, G, LinearGradient as SvgGradient, Path, Rect, Stop } from 'react-native-svg';
import { Confetti, Icon, IconButton, Tag, Text } from 'kordo-ui';
import { CURRENT_USER } from 'fake_data';
import { getTrophy } from '../../fake_data/trophies.fake';
import { RootStackParamList } from '../../App';

const MEDAL = 180;
const RAYS = 340;
const MEDAL_TOP = 300;
// Hauteur de référence de la maquette : en dessous, la scène rétrécit pour laisser la place au
// texte et aux boutons
const REFERENCE_HEIGHT = 844;

// Badge débloqué (design D) : médaille qui surgit au milieu de rayons tournants et de confettis,
// puis le nom du trophée, son histoire et les actions. Toucher la médaille rejoue l'animation.
export default function BadgeScreen() {
  const theme = useTheme();
  // Maquette sombre : dégradé plus vif, rayons cuivrés, bouton principal sombre
  const dark = theme.mode === 'dark';
  const rayColor = dark ? 'rgb(122,58,20)' : 'rgb(255,178,122)';
  const ink = dark ? theme.colors.background : '#0B1410';
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const stage = Math.max(0.5, Math.min(1, (height - 500) / (REFERENCE_HEIGHT - 500)));
  const medalTop = 60 + (MEDAL_TOP - 60) * stage;
  const { params } = useRoute<RouteProp<RootStackParamList, 'Badge'>>();
  const trophy = getTrophy(params.trophyId);
  const [pinned, setPinned] = useState(false);
  const [run, setRun] = useState(0);

  // Rayons : rotation lente et continue
  const rays = useSharedValue(0);
  useEffect(() => {
    rays.value = withRepeat(withTiming(1, { duration: 24000, easing: Easing.linear }), -1);
  }, [rays]);
  const raysStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rays.value * 360}deg` }] }));

  // Médaille : surgit en tournant, avec un dépassement
  const medal = useSharedValue(0);
  useEffect(() => {
    medal.value = 0;
    medal.value = withTiming(1, { duration: 900, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
  }, [medal, run]);
  const medalStyle = useAnimatedStyle(() => ({
    transform: [{ scale: medal.value }, { rotate: `${-30 * (1 - medal.value)}deg` }],
  }));

  // Reflet qui balaie la médaille
  const shine = useSharedValue(0);
  useEffect(() => {
    shine.value = withDelay(
      1000,
      withRepeat(
        withSequence(withTiming(1, { duration: 1500 }), withTiming(1, { duration: 1500 })),
        -1,
      ),
    );
  }, [shine]);
  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -MEDAL + shine.value * MEDAL * 2.2 }, { skewX: '-20deg' }],
  }));

  // Rebond de l'icône d'épingle
  const pinPop = useSharedValue(1);
  const pinStyle = useAnimatedStyle(() => ({ transform: [{ scale: pinPop.value }] }));
  const togglePin = () => {
    setPinned((p) => !p);
    pinPop.value = withSequence(withTiming(0.6, { duration: 0 }), withSpring(1, { damping: 8 }));
  };

  if (!trophy) return null;

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <LinearGradient colors={[dark ? '#00A36F' : '#00845A', '#06261B']} style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: insets.top + 16, right: 18, zIndex: 5 }}>
          <IconButton
            icon="DismissRegular"
            variant="tint"
            accessibilityLabel="Fermer"
            onPress={() => navigation.goBack()}
          />
        </View>

        {/* Centre de la scène : rayons, confettis et médaille */}
        <View
          style={{
            position: 'absolute',
            left: '50%',
            top: medalTop,
            width: 0,
            height: 0,
            transform: [{ scale: stage }],
          }}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              { position: 'absolute', left: -RAYS / 2, top: -RAYS / 2, width: RAYS, height: RAYS },
              raysStyle,
            ]}
          >
            <Svg width={RAYS} height={RAYS}>
              <Defs>
                <SvgGradient id="ray" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={rayColor} stopOpacity="0.35" />
                  <Stop offset="0.45" stopColor={rayColor} stopOpacity="0" />
                  <Stop offset="0.55" stopColor={rayColor} stopOpacity="0" />
                  <Stop offset="1" stopColor={rayColor} stopOpacity="0.35" />
                </SvgGradient>
              </Defs>
              {Array.from({ length: 12 }, (_, i) => (
                <G key={i} rotation={i * 15} origin={`${RAYS / 2}, ${RAYS / 2}`}>
                  <Rect x={RAYS / 2 - 2} y={0} width={4} height={RAYS} fill="url(#ray)" />
                </G>
              ))}
            </Svg>
          </Animated.View>

          <Confetti trigger={run} playOnMount radius={260} duration={1600} delay={350} size="md" />

          <Pressable
            onPress={() => setRun((r) => r + 1)}
            accessibilityLabel="Rejouer l’animation"
            style={{ position: 'absolute', left: -MEDAL / 2, top: -MEDAL / 2 }}
          >
            <Animated.View
              style={[
                {
                  width: MEDAL,
                  height: MEDAL,
                  borderRadius: 24,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors.primary.base,
                  boxShadow:
                    '0px 0px 0px 10px rgba(255, 255, 255, 0.12), 0px 30px 60px rgba(0, 0, 0, 0.35)',
                },
                medalStyle,
              ]}
            >
              <Animated.View
                pointerEvents="none"
                style={[
                  {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: MEDAL * 0.4,
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                  },
                  shineStyle,
                ]}
              />
              <Svg width={84} height={84} viewBox="0 0 24 24" fill="none">
                <Path
                  d={trophy.icon}
                  stroke={ink}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Animated.View>
          </Pressable>
        </View>

        {/* Nom, histoire et détails du badge */}
        <View
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            top: medalTop + 140 * stage,
            alignItems: 'center',
            gap: stage < 1 ? 6 : 10,
          }}
        >
          <Animated.View entering={FadeInDown.delay(500).duration(500)}>
            <View
              style={{
                height: 30,
                paddingHorizontal: 14,
                borderRadius: 999,
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.14)',
              }}
            >
              <Text variant="eyebrow" size={12} appearance="white">
                Badge débloqué
              </Text>
            </View>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(650).duration(500)}>
            <Text
              variant="display"
              size={stage < 0.8 ? 38 : 52}
              appearance="white"
              style={{ textAlign: 'center' }}
            >
              {trophy.name}
            </Text>
          </Animated.View>
          {!!trophy.story && (
            <Animated.View entering={FadeInDown.delay(800).duration(500)}>
              <Text
                size="md"
                appearance="white"
                style={{ textAlign: 'center', lineHeight: 22.5, opacity: 0.85 }}
              >
                {CURRENT_USER.firstName}, {trophy.story}
              </Text>
            </Animated.View>
          )}
          <Animated.View
            entering={FadeInDown.delay(900).duration(500)}
            style={{ flexDirection: 'row', gap: theme.spacing.sm, marginTop: 6 }}
          >
            {trophy.chips?.map((chip) => (
              <Tag
                key={chip}
                size="lg"
                appearance="glass"
                title={chip}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
              />
            ))}
          </Animated.View>
        </View>

        {/* Actions */}
        <Animated.View
          entering={FadeInDown.delay(1000).duration(500)}
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            bottom: insets.bottom + 34,
            gap: 10,
          }}
        >
          <Pressable
            onPress={togglePin}
            accessibilityState={{ selected: pinned }}
            style={({ pressed }) => ({
              height: 58,
              borderRadius: theme.borderRadius.square,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: pinned ? 'rgba(255, 255, 255, 0.16)' : theme.colors.surface,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Animated.View style={pinStyle}>
              {pinned ? (
                <Icon name="CheckmarkRegular" size={18} color="#FFFFFF" />
              ) : (
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"
                    stroke={theme.colors.text}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </Animated.View>
            <Text size={16} extraBold style={{ color: pinned ? '#FFFFFF' : theme.colors.text }}>
              {pinned ? 'Épinglé sur ton profil' : 'Épingler au profil'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              Share.share({ message: `J’ai débloqué le badge ${trophy.name} sur Kordo !` }).catch(
                () => {},
              )
            }
            style={({ pressed }) => ({
              height: 52,
              borderRadius: theme.borderRadius.square,
              borderWidth: 1.5,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Icon name="ShareRegular" size={18} color="#FFFFFF" />
            <Text size={16} extraBold appearance="white">
              Partager
            </Text>
          </Pressable>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}
