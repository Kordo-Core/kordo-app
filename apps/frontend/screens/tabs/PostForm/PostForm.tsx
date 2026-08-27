import { useMemo, useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@emotion/react';
import { BoulderBadge, Button, DropdownItem, Header, Icon, Text, useToast } from 'kordo-ui';
import { ScreenLayout } from '../../../components/ScreenLayout/ScreenLayout';
import { GYMS } from '../../../fake_data/gyms.fake';
import { getBlocsByGym, getCurrentUserBlocMethod } from '../../../fake_data/climbing.fake';
import { getUserSessions } from '../../../fake_data/social.fake';
import { MainTabsParamList } from '../../MainTabs';
import { MediaItem, PostType } from './PostForm.types';
import { PostTypeSelector } from './components/PostTypeSelector/PostTypeSelector';
import { ActivityForm } from './components/ActivityForm/ActivityForm';
import { PublicationForm } from './components/PublicationForm/PublicationForm';
import { MessageForm } from './components/MessageForm/MessageForm';
import { NowForm } from './components/NowForm/NowForm';

export default function PostForm() {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  const { addToast } = useToast();

  const [type, setType] = useState<PostType>('activity');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [gymId, setGymId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [selectedBlocs, setSelectedBlocs] = useState<string[]>([]);
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
            <Text size="lg" bold>
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
        <Text size="lg" bold appearance="gray">
          {bloc.points}pts
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
    navigation.navigate('Home');
  };

  return (
    <ScreenLayout>
      <Header
        left={<Icon name="DismissRegular" size="md" onPress={() => navigation.navigate('Home')} />}
        right={
          <Button
            appearance="secondary"
            size="md"
            borderRadius="rounded"
            title="Publier"
            onPress={publish}
          />
        }
        style={{ boxShadow: theme.shadows.md }}
      >
        <Text bold size="lg" numberOfLines={1}>
          Ajouter une publication
        </Text>
      </Header>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: theme.spacing.xs, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            backgroundColor: theme.colors.neutral.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: theme.spacing.lg,
            gap: theme.spacing.md,
            minHeight: height,
          }}
        >
          <PostTypeSelector value={type} onChange={setType} />

          {type === 'activity' && (
            <ActivityForm
              title={title}
              onTitleChange={setTitle}
              description={description}
              onDescriptionChange={setDescription}
              gymId={gymId}
              onGymChange={handleGymChange}
              gymItems={gymItems}
              selectedBlocs={selectedBlocs}
              onBlocsChange={setSelectedBlocs}
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
    </ScreenLayout>
  );
}
