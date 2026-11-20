import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@emotion/react';
import { BoulderBadge, DropdownItem, SlideToConfirm, Text, useToast } from 'kordo-ui';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { ScreenHeader } from '../../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { GYMS } from '../../../fake_data/gyms.fake';
import { getBlocsByGym, getCurrentUserBlocMethod } from '../../../fake_data/climbing.fake';
import { getUserSessions } from '../../../fake_data/social.fake';
import { MainTabsParamList } from '../../MainTabs';
import { MediaItem, PostType } from './PostForm.types';
import { PostTypeSelector } from './components/PostTypeSelector/PostTypeSelector';
import { ActivityForm, gradeTier } from './components/ActivityForm/ActivityForm';
import { PublicationForm } from './components/PublicationForm/PublicationForm';
import { MessageForm } from './components/MessageForm/MessageForm';
import { NowForm } from './components/NowForm/NowForm';

// Second mot du titre selon le type de publication
const TYPE_WORDS: Record<PostType, string> = {
  activity: 'activité',
  publication: 'publication',
  message: 'pensée',
  now: 'session now',
};

export default function PostForm() {
  const theme = useTheme();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  const { addToast } = useToast();

  // Hauteur du pied fixe (bouton de publication), réservée en bas du formulaire
  const [footerHeight, setFooterHeight] = useState(120);
  const [type, setType] = useState<PostType>('activity');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [gymId, setGymId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [selectedBlocs, setSelectedBlocs] = useState<string[]>([]);
  const [blocCount, setBlocCount] = useState(0);
  // Palier de couleur choisi pour le niveau max (-1 : pas encore choisi)
  const [maxTier, setMaxTier] = useState(-1);
  const [discipline, setDiscipline] = useState<string | null>(null);
  const [shoes, setShoes] = useState<string | null>(null);
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [visibility, setVisibility] = useState<string | null>('all');
  const [likesEnabled, setLikesEnabled] = useState(true);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [includeMeets, setIncludeMeets] = useState(false);

  const gymItems = useMemo<DropdownItem[]>(
    () =>
      GYMS.map((gym) => ({ key: gym.id, text: gym.name, left: <Text size="md">{gym.name}</Text> })),
    [],
  );

  const sessionItems = useMemo<DropdownItem[]>(() => {
    if (!gymId) return [];
    return getUserSessions(gymId).map((s) => {
      const d = new Date(s.createdAt);
      const MONTHS = [
        'janv.',
        'févr.',
        'mars',
        'avr.',
        'mai',
        'juin',
        'juil.',
        'août',
        'sept.',
        'oct.',
        'nov.',
        'déc.',
      ];
      const label = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
      return { key: s.id, text: label, left: <Text size="md">{label}</Text> };
    });
  }, [gymId]);

  const blocItems = useMemo<DropdownItem[]>(() => {
    if (!gymId) return [];
    return getBlocsByGym(gymId).map(({ bloc, setter }) => ({
      key: bloc.id,
      text: bloc.name ?? 'Bloc',
      left: (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
          <BoulderBadge avatarUrl={bloc.blocUrl} grade={bloc.grade} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text size="md" bold>
              {bloc.name}
            </Text>
            <Text appearance="primary" size="sm">
              <Text size="sm" appearance="gray">
                par{' '}
              </Text>
              {setter?.firstName}
            </Text>
          </View>
        </View>
      ),
      right: (
        <Text size="sm" extraBold appearance="gray">
          {bloc.points} pts
        </Text>
      ),
    }));
  }, [gymId]);

  const autoVideos = useMemo<MediaItem[]>(
    () =>
      selectedBlocs
        .map((id) => getCurrentUserBlocMethod(id))
        .filter((m): m is NonNullable<typeof m> => !!m)
        .map((m) => ({ id: m.id, uri: m.url, kind: 'video' as const })),
    [selectedBlocs],
  );

  // Palier de couleur du bloc coché le plus dur (-1 si aucun) : plancher du « Niveau max »
  const minTier = useMemo(() => {
    if (!gymId || selectedBlocs.length === 0) return -1;
    const grades = new Map(getBlocsByGym(gymId).map(({ bloc }) => [bloc.id, bloc.grade]));
    return Math.max(...selectedBlocs.map((id) => gradeTier(grades.get(id) ?? 1)));
  }, [gymId, selectedBlocs]);

  // Le compteur et le niveau ne descendent jamais sous ce que les blocs cochés imposent,
  // mais l'utilisateur peut aller au-dessus (blocs hors liste)
  const effectiveBlocCount = Math.max(blocCount, selectedBlocs.length);
  const effectiveMaxTier = Math.max(maxTier, minTier);

  const handleBlocsChange = (value: string[]) => {
    setSelectedBlocs(value);
    // Fige les valeurs effectives : décocher un bloc ne fait pas redescendre le compteur
    setBlocCount(Math.max(effectiveBlocCount, value.length));
    setMaxTier(effectiveMaxTier);
  };

  const handleGymChange = (value: string | null) => {
    setGymId(value);
    setSessionId(null);
    setSelectedBlocs([]);
  };

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (result.canceled) return;
    setPhotos((prev) => [
      ...prev,
      ...result.assets.map((asset) => ({
        id: asset.assetId ?? asset.uri,
        uri: asset.uri,
        kind: (asset.type === 'video' ? 'video' : 'image') as 'image' | 'video',
      })),
    ]);
  };

  const publish = () => {
    addToast({
      message: 'Publication créée',
      type: 'success',
      showLoader: false,
      isClosable: true,
      duration: 2500,
    });
    // Laisse le temps de voir la confirmation du curseur avant de revenir au fil
    setTimeout(() => navigation.navigate('Home'), 900);
  };

  return (
    <ScreenLayout>
      <ScreenHeader
        gap={12}
        backIcon="DismissRegular"
        // Maquette : bouton à 18 px sous la zone sûre et 16 px du bord, aligné sur le formulaire
        topGap={10}
        style={{ paddingHorizontal: 2 }}
        onBack={() => navigation.navigate('Home')}
        right={
          title || description || message ? (
            <Text variant="eyebrow" size={11}>
              Brouillon enregistré
            </Text>
          ) : undefined
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.xs,
          // Juste la place du bouton fixe, plus un court espace : pas de blanc en fin de page
          paddingBottom: footerHeight + theme.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: theme.spacing.md + 2 }}>
          {/* Titre display : le second mot change avec le type de publication */}
          <View>
            <Text variant="display" size={52}>
              Nouvelle
            </Text>
            <Animated.View key={type} entering={FadeInDown.duration(350)}>
              <Text variant="display" size={52} appearance="secondary">
                {TYPE_WORDS[type]}
              </Text>
            </Animated.View>
          </View>

          <PostTypeSelector value={type} onChange={setType} />

          {type === 'activity' && (
            <ActivityForm
              title={title}
              onTitleChange={setTitle}
              description={description}
              onDescriptionChange={setDescription}
              photos={photos}
              onAddMedia={pickMedia}
              gymId={gymId}
              onGymChange={handleGymChange}
              gymItems={gymItems}
              selectedBlocs={selectedBlocs}
              onBlocsChange={handleBlocsChange}
              blocCount={effectiveBlocCount}
              onBlocCountChange={setBlocCount}
              maxTier={effectiveMaxTier}
              minTier={minTier}
              onMaxTierChange={setMaxTier}
              blocItems={blocItems}
              autoVideos={autoVideos}
              sessionId={sessionId}
              onSessionChange={setSessionId}
              sessionItems={sessionItems}
              discipline={discipline}
              onDisciplineChange={setDiscipline}
              shoes={shoes}
              onShoesChange={setShoes}
              visibility={visibility}
              onVisibilityChange={setVisibility}
              likesEnabled={likesEnabled}
              onLikesChange={setLikesEnabled}
              commentsEnabled={commentsEnabled}
              onCommentsChange={setCommentsEnabled}
              includeMeets={includeMeets}
              onMeetsChange={setIncludeMeets}
            />
          )}

          {type === 'publication' && (
            <PublicationForm
              title={title}
              onTitleChange={setTitle}
              description={description}
              onDescriptionChange={setDescription}
              photos={photos}
              onAdd={pickMedia}
              visibility={visibility}
              onVisibilityChange={setVisibility}
              likesEnabled={likesEnabled}
              onLikesChange={setLikesEnabled}
              commentsEnabled={commentsEnabled}
              onCommentsChange={setCommentsEnabled}
            />
          )}

          {type === 'message' && (
            <MessageForm
              message={message}
              onMessageChange={setMessage}
              visibility={visibility}
              onVisibilityChange={setVisibility}
              likesEnabled={likesEnabled}
              onLikesChange={setLikesEnabled}
              commentsEnabled={commentsEnabled}
              onCommentsChange={setCommentsEnabled}
            />
          )}

          {type === 'now' && (
            <NowForm
              gymId={gymId}
              onGymChange={handleGymChange}
              gymItems={gymItems}
              visibility={visibility}
              onVisibilityChange={setVisibility}
            />
          )}
        </View>
      </ScrollView>

      {/* Action finale : glisser pour publier, ancrée en bas d'écran (la barre de navigation
          est masquée ici) sur un fondu qui fait disparaître le formulaire en dessous */}
      <View
        onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: theme.spacing.xl,
          paddingHorizontal: theme.spacing.lg,
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <Svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          pointerEvents="none"
        >
          <Defs>
            <LinearGradient id="publish-fade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={theme.colors.background} stopOpacity="0" />
              <Stop offset="0.35" stopColor={theme.colors.background} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#publish-fade)" />
        </Svg>
        <SlideToConfirm label="Glisser pour publier" doneLabel="Publié !" onConfirm={publish} />
      </View>
    </ScreenLayout>
  );
}
