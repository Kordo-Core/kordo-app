import { useState } from 'react';
import { Image, Modal, Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { ActivityProps } from './Activity.types';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';
import { ListRow } from '../../layouts/ListRow/ListRow';
import { Panel } from '../../layouts/Panel/Panel';
import { AvatarStack } from '../../molecules/AvatarStack/AvatarStack';
import {
  BigHeart,
  formatPostDate,
  PostActions,
  PostHeader,
  useDoubleTapLike,
  usePostCardStyle,
} from '../../molecules/PostParts/PostParts';
import { VideoStories } from '../VideoStories/VideoStories';
import { CommentsPanel } from '../CommentsPanel/CommentsPanel';
import { usePostOptions } from '../PostOptionsPanel/usePostOptions';
import { motion } from '../../../animations/motion';
import { BoulderPublic } from 'core';
import { CENTERED_TEXT } from '../../../utils/centeredText';

// Paliers de grade de largeur 5 (1-5, 6-10, …, 26-30) → couleur du palier (idx 0..5).
const GRADE_PALIER_COLORS = ['yellow', 'green', 'blue', 'red', 'black', 'purple'] as const;
const GRADE_PALIER_LABELS = ['Jaune', 'Vert', 'Bleu', 'Rouge', 'Noir', 'Violet'];
const gradePalier = (grade: number) => {
  const idx = Math.max(0, Math.min(Math.floor((grade - 1) / 5), 5));
  return { idx, min: idx * 5 + 1, max: idx * 5 + 5 };
};

const MEDIA_HEIGHT = 280;
const GRID_GAP = 4;

// Carte d'une activité (séance), design D : en-tête, titre, mosaïque avec stats, personnes
// rencontrées pendant la séance, description, actions.
export const Activity: React.FC<ActivityProps> = ({
  activity,
  currentUser,
  onPressBloc,
  onPressUser,
  style,
}) => {
  const theme = useTheme();
  // Pastille posée sur la photo : voile très sombre (vert-noir en clair, noir en sombre)
  const GLASS = `rgba(${theme.colors.scrim}, 0.55)`;
  const fullName = [activity.user.firstName, activity.user.lastName].filter(Boolean).join(' ');
  const posterFor = (blocId: string) => activity.blocks.find((b) => b.id === blocId)?.blocUrl;

  // Like optimiste local + panneau des commentaires
  const [liked, setLiked] = useState(activity.isLiked);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const likeCount = activity.likes.length - (activity.isLiked ? 1 : 0) + (liked ? 1 : 0);
  const [comments, setComments] = useState(activity.comments);
  const addComment = (content: string) => {
    if (!currentUser) return;
    setComments((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        user: currentUser,
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Double tap sur la photo : j’aime + grand cœur
  const { onPress: onMediaPress, heartStyle } = useDoubleTapLike(
    () => setLiked(true),
    activity.likesEnabled,
    (index) => videos.length > 0 && setStoriesIndex(index),
  );

  // Visionneuse vidéos : index de la vidéo ouverte (null = fermée)
  const [storiesIndex, setStoriesIndex] = useState<number | null>(null);

  // Personnes rencontrées, sans le lecteur lui-même (il peut figurer dans les meets de la séance)
  const meets = activity.meets.filter((u) => u.id !== currentUser?.id);
  const [meetsOpen, setMeetsOpen] = useState(false);

  // Suivi local des personnes rencontrées (toggle optimiste au clic)
  const [following, setFollowing] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(meets.map((u) => [u.id, !!u.isFollowing])),
  );
  const toggleFollow = (id: string) => setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));

  // Panneau de blocs (réalisés / palier max) : null = fermé
  const [blocPanel, setBlocPanel] = useState<{ title: string; blocs: BoulderPublic[] } | null>(
    null,
  );

  const videos = activity.videos;
  const poster = (videos[0] && posterFor(videos[0].blocId)) ?? activity.blocks[0]?.blocUrl;

  // Palier du grade max : on n'affiche pas le grade mais la couleur du palier.
  // Clic → liste des blocs passés dans ce palier.
  const palier = gradePalier(activity.maxGrade.grade);
  const palierBlocs = activity.blocks.filter((b) => b.grade >= palier.min && b.grade <= palier.max);
  const maxGradeColor = theme.colors.boulderGrade[GRADE_PALIER_COLORS[palier.idx]];

  // Ligne de bloc dans un panneau. L'état validé est relatif à l'UTILISATEUR COURANT
  // (le viewer), pas à l'auteur du post : validé → nom en success + check, sinon → points.
  const renderBlocRow = (b: BoulderPublic) => (
    <Pressable
      key={b.id}
      onPress={() => {
        // Ferme le panneau puis remonte le clic (la navigation est gérée côté frontend)
        setBlocPanel(null);
        onPressBloc?.(b);
      }}
    >
      <ListRow
        left={
          // Photo carrée cerclée de la couleur du palier, comme sur la page Blocs
          <Image
            source={{ uri: b.blocUrl }}
            style={{
              width: 46,
              height: 46,
              borderRadius: 6,
              borderWidth: 2.5,
              borderColor: theme.colors.boulderGrade[GRADE_PALIER_COLORS[gradePalier(b.grade).idx]],
            }}
          />
        }
        primaryText={
          <Text size="md" bold appearance={b.isValidated ? 'success' : undefined}>
            {b.name}
          </Text>
        }
        secondaryText={
          <Text appearance="primary" size="sm">
            <Text size="sm" appearance="gray">
              par{' '}
            </Text>
            {b.setter?.firstName}
          </Text>
        }
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text size="sm" extraBold appearance="gray">
              {b.points} pts
            </Text>
            {b.isValidated && (
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors.success.base,
                }}
              >
                <Icon name="CheckmarkRegular" size={16} color={theme.colors.neutral.white} />
              </View>
            )}
          </View>
        }
      />
    </Pressable>
  );

  // Vignette de la mosaïque : poster du bloc, bouton lecture, ou « +N » pour les vidéos restantes
  const VideoCell = ({ index, more }: { index: number; more?: number }) => {
    const cellPoster = posterFor(videos[index].blocId);
    return (
      <Pressable
        onPress={() => onMediaPress(index)}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        {cellPoster && (
          <Image
            source={{ uri: cellPoster }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            resizeMode="cover"
          />
        )}
        {more ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `rgba(${theme.colors.scrim}, 0.6)`,
            }}
          >
            <Text variant="display" size="sm" appearance="white">
              +{more}
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              paddingLeft: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: GLASS,
            }}
          >
            <Icon name="play" size="sm" color={theme.colors.neutral.white} />
          </View>
        )}
      </Pressable>
    );
  };

  // Pastille de stat posée en bas de la photo, cliquable
  const StatChip = ({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        height: 30,
        paddingHorizontal: 10,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: GLASS,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        transform: [{ scale: pressed ? motion.pressScale : 1 }],
      })}
    >
      {children}
    </Pressable>
  );

  const cardStyle = usePostCardStyle();

  // « Avec Emma, Hugo et 2 autres »
  const meetName = (u: (typeof meets)[number]) => u.firstName ?? u.username;
  const othersCount = meets.length - 2;
  const meetsLabel =
    meets.length <= 2
      ? `Avec ${meets.map(meetName).join(' et ')}`
      : `Avec ${meetName(meets[0])}, ${meetName(meets[1])} et ${othersCount} ${
          othersCount > 1 ? 'autres' : 'autre'
        }`;

  const options = usePostOptions({
    author: activity.user,
    currentUser,
    meta: `${activity.title} · ${formatPostDate(activity.createdAt)}`,
    shareMessage: `${fullName || activity.user.username} · ${activity.title}`,
    commentsEnabled: activity.commentsEnabled,
  });
  if (options.hidden) return null;

  return (
    <View>
      <View style={[cardStyle, style]}>
        <PostHeader
          user={activity.user}
          meta={`${formatPostDate(activity.createdAt)} · ${activity.gym.name}`}
          tag="Activité"
          onPressUser={onPressUser}
        />

        {!!activity.title && (
          <Text
            variant="display"
            size={26}
            numberOfLines={2}
            style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.sm + 2 }}
          >
            {activity.title}
          </Text>
        )}

        {/* Mosaïque des vidéos (ou photo du 1er bloc s'il n'y en a pas), avec les stats sur un
            fondu. Appui : ouvre la vidéo ; double appui : j'aime. */}
        <View
          style={{
            marginHorizontal: theme.spacing.sm,
            height: MEDIA_HEIGHT,
            borderRadius: theme.borderRadius.card,
            overflow: 'hidden',
            // Fond de la carte dans les espaces de la mosaïque ; vert seulement sans vidéo ni photo
            backgroundColor:
              videos.length > 0 || poster ? theme.colors.surface : theme.colors.hero[0],
          }}
        >
          {videos.length === 0 ? (
            <Pressable onPress={() => onMediaPress()} style={{ flex: 1 }}>
              {poster && <Image source={{ uri: poster }} style={{ flex: 1 }} resizeMode="cover" />}
            </Pressable>
          ) : (
            <View style={{ flex: 1, flexDirection: 'row', gap: GRID_GAP }}>
              <VideoCell index={0} />
              {videos.length >= 2 && <VideoCell index={1} />}
              {videos.length === 3 && <VideoCell index={2} />}
              {videos.length >= 4 && (
                <View style={{ flex: 1, gap: GRID_GAP }}>
                  <VideoCell index={2} />
                  <VideoCell index={3} more={videos.length - 3} />
                </View>
              )}
            </View>
          )}
          <Svg
            width="100%"
            height="100%"
            style={{ position: 'absolute' }}
            pointerEvents="none"
            preserveAspectRatio="none"
          >
            <Defs>
              <LinearGradient id={`fade-${activity.id}`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0.55" stopColor="#000000" stopOpacity="0" />
                <Stop offset="1" stopColor="#000000" stopOpacity="0.6" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#fade-${activity.id})`} />
          </Svg>

          <View
            style={{ position: 'absolute', left: 12, bottom: 12, flexDirection: 'row', gap: 6 }}
          >
            <StatChip
              onPress={() => setBlocPanel({ title: 'Blocs réalisés', blocs: activity.blocks })}
            >
              <Text size="xs" bold appearance="white" style={CENTERED_TEXT}>
                {activity.blocks.length} blocs
              </Text>
            </StatChip>
            <StatChip
              onPress={() =>
                setBlocPanel({
                  title: `Palier ${GRADE_PALIER_LABELS[palier.idx].toLowerCase()}`,
                  blocs: palierBlocs,
                })
              }
            >
              <View
                style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: maxGradeColor }}
              />
              <Text size="xs" bold appearance="white" style={CENTERED_TEXT}>
                Max {GRADE_PALIER_LABELS[palier.idx]}
              </Text>
            </StatChip>
            {!!activity.duration && (
              <StatChip>
                <Text size="xs" bold appearance="white" style={CENTERED_TEXT}>
                  {activity.duration}
                </Text>
              </StatChip>
            )}
          </View>

          <BigHeart style={heartStyle} />
        </View>

        {/* Personnes rencontrées pendant la séance : l'appui ouvre la liste complète */}
        {meets.length > 0 && (
          <Pressable
            onPress={() => setMeetsOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`${meetsLabel}, voir les personnes rencontrées`}
            style={({ pressed }) => ({
              marginTop: theme.spacing.sm,
              marginHorizontal: theme.spacing.sm,
              padding: theme.spacing.sm,
              borderRadius: 7,
              backgroundColor: theme.colors.soft,
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.spacing.sm + 2,
              transform: [{ scale: pressed ? motion.pressScale : 1 }],
            })}
          >
            <AvatarStack
              uris={meets.slice(0, 3).map((u) => u.avatarUrl)}
              borderColor={theme.colors.soft}
            />
            <Text size="sm" bold numberOfLines={1} style={{ flex: 1 }}>
              {meetsLabel}
            </Text>
            <Icon name="ChevronRightRegular" size="sm" />
          </Pressable>
        )}

        {!!activity.description && (
          <Text
            numberOfLines={3}
            style={{
              paddingTop: theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
              paddingBottom: theme.spacing.xs,
              lineHeight: 22,
            }}
          >
            {activity.description}
          </Text>
        )}

        <PostActions
          likesEnabled={activity.likesEnabled}
          commentsEnabled={options.commentsEnabled}
          liked={liked}
          likeCount={likeCount}
          onToggleLike={() => setLiked((prev) => !prev)}
          commentCount={comments.length}
          onPressComments={() => setCommentsOpen(true)}
          onPressOptions={options.openOptions}
        />
      </View>

      {/* Visionneuse vidéos plein écran (Modal interne) */}
      {storiesIndex !== null && (
        <VideoStories
          videos={activity.videos}
          initialIndex={storiesIndex}
          onClose={() => setStoriesIndex(null)}
        />
      )}

      {/* Panneau de blocs : "bloc réalisé" (tous) ou "bloc max" (blocs du palier).
          Modal pour échapper au flux de la carte, GestureHandlerRootView pour que le geste
          du Panel fonctionne sous Modal (Android). */}
      <Modal
        visible={blocPanel !== null}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setBlocPanel(null)}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Panel
            isOpen={blocPanel !== null}
            onClose={() => setBlocPanel(null)}
            title={blocPanel?.title}
          >
            {blocPanel?.blocs.map(renderBlocRow)}
          </Panel>
        </GestureHandlerRootView>
      </Modal>

      {/* Personnes rencontrées pendant la séance : même principe de Modal que les blocs */}
      <Modal
        visible={meetsOpen}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setMeetsOpen(false)}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Panel isOpen={meetsOpen} onClose={() => setMeetsOpen(false)} title="Croisé·es en séance">
            {meets.map((u) => (
              <ListRow
                key={u.id}
                onPress={() => {
                  setMeetsOpen(false);
                  onPressUser?.(u);
                }}
                left={
                  <Image
                    source={{ uri: u.avatarUrl }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 6,
                      backgroundColor: theme.colors.surfaceAlt,
                    }}
                  />
                }
                primaryText={
                  <Text size="md" bold numberOfLines={1}>
                    {[u.firstName, u.lastName].filter(Boolean).join(' ') || u.username}
                  </Text>
                }
                secondaryText={
                  <Text size="sm" appearance="gray" numberOfLines={1}>
                    {activity.gym.name}
                  </Text>
                }
                right={
                  <Button
                    size="sm"
                    appearance="secondary"
                    inverted={following[u.id]}
                    title={following[u.id] ? 'Abonné·e' : 'Suivre'}
                    onPress={() => toggleFollow(u.id)}
                  />
                }
              />
            ))}
          </Panel>
        </GestureHandlerRootView>
      </Modal>

      <CommentsPanel
        isOpen={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        comments={comments}
        currentUser={currentUser}
        onAddComment={addComment}
        onPressUser={onPressUser}
      />

      {options.panel}
    </View>
  );
};
