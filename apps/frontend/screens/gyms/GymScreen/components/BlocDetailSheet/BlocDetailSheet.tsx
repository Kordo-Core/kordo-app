import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Share, View } from 'react-native';
import { useTheme } from '@emotion/react';
import * as ImagePicker from 'expo-image-picker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Confetti, Icon, Text } from 'kordo-ui';
import {
  BlocDetail,
  CURRENT_USER,
  TOPS,
  getMediaByBloc,
  getSectorsByGym,
  getTopCount,
} from '../../../../../fake_data';

const TIER_COLORS = ['yellow', 'green', 'blue', 'red', 'black', 'purple'] as const;
const TIER_LABELS = ['Jaune', 'Vert', 'Bleu', 'Rouge', 'Noir', 'Violet'];
const tierOf = (grade: number) => Math.max(0, Math.min(Math.floor((grade - 1) / 5), 5));

export interface BlocDetailSheetProps {
  detail: BlocDetail;
  /** Ouvre la visionneuse sur une vidéo de méthode */
  onOpenVideo: (videos: { id: string; url: string }[], index: number) => void;
}

// Fiche d'un bloc, posée dans le panneau qui monte du bas (design D) : photo, cotation et
// secteur, ouvreur, points, stats, étiquettes, description, méthodes vidéo, puis j'aime et
// validation à la fin de la fiche.
export function BlocDetailSheet({ detail, onOpenVideo }: BlocDetailSheetProps) {
  const theme = useTheme();
  const { bloc, setter, tags } = detail;
  const media = useMemo(() => getMediaByBloc(bloc.id), [bloc.id]);
  const tops = useMemo(() => TOPS.filter((t) => t.blocId === bloc.id), [bloc.id]);
  const alreadyValidated = tops.some((t) => t.userId === CURRENT_USER.id);
  const [validated, setValidated] = useState(alreadyValidated);
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);
  const [myVideos, setMyVideos] = useState<string[]>([]);

  // Rebonds des icônes de j'aime et de validation
  const likePop = useSharedValue(1);
  const likePopStyle = useAnimatedStyle(() => ({ transform: [{ scale: likePop.value }] }));
  const valPop = useSharedValue(1);
  const valPopStyle = useAnimatedStyle(() => ({ transform: [{ scale: valPop.value }] }));
  const pop = (v: typeof likePop) => {
    v.value = withSequence(withTiming(0.6, { duration: 0 }), withSpring(1, { damping: 8 }));
  };

  const tier = tierOf(bloc.grade);
  const sectorNumber = getSectorsByGym(bloc.gymId).findIndex((x) => x.id === detail.sector.id) + 1;
  const topCount = getTopCount(bloc.id) + (validated && !alreadyValidated ? 1 : 0);
  const flashRate = tops.length
    ? Math.round((tops.filter((t) => t.isFlash).length / tops.length) * 100)
    : 0;
  const videos = [
    ...media.map((m) => ({
      id: m.media.id,
      url: m.media.url,
      name: m.author?.firstName ?? 'Grimpeur',
    })),
    ...myVideos.map((url, i) => ({ id: `mine-${i}`, url, name: 'Toi' })),
  ];

  const toggleValidate = () => {
    const next = !validated;
    setValidated(next);
    pop(valPop);
    if (next) setBurst((b) => b + 1);
  };

  const addVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      quality: 0.8,
    });
    if (!result.canceled) setMyVideos((v) => [...v, result.assets[0].uri]);
  };

  return (
    <View style={{ gap: 14 }}>
      {/* Photo du bloc, avec le partage posé dessus */}
      <View style={{ height: 230, borderRadius: theme.borderRadius.card, overflow: 'hidden' }}>
        <Image
          source={{ uri: bloc.blocUrl }}
          accessibilityLabel={`Bloc ${bloc.name ?? ''}`}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <Pressable
          onPress={() => Share.share({ message: `Le bloc ${bloc.name} sur Kordo` }).catch(() => {})}
          accessibilityLabel="Partager"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 44,
            height: 44,
            borderRadius: theme.borderRadius.square,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
          }}
        >
          <Icon name="ShareRegular" size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Fiche : 18 px de marge (12 du panneau + 6) et 22 px sous la photo, comme la maquette */}
      <View style={{ paddingHorizontal: 6, paddingTop: 8, gap: 14 }}>
        {/* Cotation, nom, ouvreur et points */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: theme.colors.boulderGrade[TIER_COLORS[tier]],
                }}
              />
              <Text variant="eyebrow" size={12}>
                {TIER_LABELS[tier]} · Secteur {sectorNumber}
              </Text>
            </View>
            <Text variant="display" size={40} style={{ marginTop: 6 }}>
              {bloc.name}
            </Text>
            <Text size="sm" appearance="gray" style={{ marginTop: 6 }}>
              par{' '}
              <Text size="sm" bold>
                {setter?.firstName ?? 'un ouvreur'}
              </Text>{' '}
              · ouvert le {new Date(bloc.createdAt).toLocaleDateString('fr-FR')}
            </Text>
          </View>
          <View
            style={{
              height: 36,
              paddingHorizontal: 12,
              borderRadius: 5,
              justifyContent: 'center',
              backgroundColor: theme.colors.primary.base,
            }}
          >
            <Text size={14} extraBold style={{ color: theme.colors.navBarAccentIcon }}>
              {bloc.points} pts
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {[
            { v: String(topCount), l: 'tops' },
            { v: `${flashRate} %`, l: 'flash' },
            { v: TIER_LABELS[tier], l: 'palier' },
          ].map((s) => (
            <View
              key={s.l}
              style={{
                flex: 1,
                padding: 12,
                gap: 2,
                borderRadius: 8,
                backgroundColor: theme.colors.surface,
                boxShadow: theme.shadows.sm,
              }}
            >
              <Text variant="display" size={26} style={{ textTransform: 'none', lineHeight: 31 }}>
                {s.v}
              </Text>
              <Text size="xs" appearance="gray" style={{ fontFamily: theme.fonts.semiBold }}>
                {s.l}
              </Text>
            </View>
          ))}
        </View>

        {tags.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {tags.map((t) => (
              <View
                key={t.id}
                style={{
                  height: 30,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  justifyContent: 'center',
                  backgroundColor: theme.colors.surfaceAlt,
                }}
              >
                <Text size="sm" bold>
                  {t.name}
                </Text>
              </View>
            ))}
          </View>
        )}

        {!!bloc.description && (
          <Text size="md" style={{ lineHeight: 23.25 }}>
            {bloc.description}
          </Text>
        )}

        <Text variant="eyebrow" size={12} style={{ marginTop: 4 }}>
          Méthodes vidéo · {videos.length}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // Rangée qui déborde jusqu’au bord de l’écran, premier élément à 14 px
          style={{ marginHorizontal: -18 }}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 14 }}
        >
          {videos.map((v, i) => (
            <Pressable
              key={v.id}
              onPress={() => onOpenVideo(videos, i)}
              style={({ pressed }) => ({
                width: 120,
                height: 160,
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: theme.colors.surfaceAlt,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              })}
            >
              <Image source={{ uri: bloc.blocUrl }} style={{ width: '100%', height: '100%' }} />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 61,
                  left: 41,
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  paddingLeft: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Icon name="play" size="sm" color="#0B1410" />
              </View>
              <Text
                size="xs"
                bold
                appearance="white"
                style={{ position: 'absolute', left: 10, bottom: 8 }}
              >
                {v.name}
              </Text>
            </Pressable>
          ))}
          <Pressable
            onPress={addVideo}
            style={({ pressed }) => ({
              width: 120,
              height: 160,
              borderRadius: 8,
              borderWidth: 2,
              borderStyle: 'dashed',
              borderColor: theme.colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Icon name="CameraRegular" size="md" color={theme.colors.textMuted} />
            <Text size="xs" bold appearance="gray" style={{ textAlign: 'center' }}>
              Ajouter{'\n'}ta vidéo
            </Text>
          </Pressable>
        </ScrollView>

        {/* J'aime et validation, à la fin de la fiche */}
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 6, marginHorizontal: 4 }}>
        <Pressable
          onPress={() => {
            setLiked((l) => !l);
            pop(likePop);
          }}
          accessibilityLabel="Aimer"
          accessibilityState={{ selected: liked }}
          style={({ pressed }) => ({
            width: 58,
            height: 58,
            borderRadius: theme.borderRadius.square,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          <Animated.View style={likePopStyle}>
            <Icon
              name={liked ? 'HeartFilled' : 'HeartRegular'}
              size="md"
              color={liked ? theme.colors.error.base : theme.colors.text}
            />
          </Animated.View>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Pressable
            onPress={toggleValidate}
            accessibilityState={{ selected: validated }}
            style={({ pressed }) => ({
              height: 58,
              borderRadius: theme.borderRadius.square,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: theme.colors.secondary.base,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            })}
          >
            <Animated.View style={valPopStyle}>
              <Icon
                name={validated ? 'CheckmarkCircleFilled' : 'CheckmarkRegular'}
                size="md"
                color="#FFFFFF"
              />
            </Animated.View>
            <Text size="md" extraBold appearance="white">
              {validated ? `Validé · +${bloc.points} pts` : 'Valider ce bloc'}
            </Text>
          </Pressable>
          {/* Confettis hors du bouton : ils ne déforment ni ne débordent de celui-ci */}
          <Confetti trigger={burst} radius={130} />
        </View>
      </View>
    </View>
  );
}
