import { useState } from 'react';
import { Image, Modal, Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@emotion/react';
import { ActivityProps } from './Activity.types';
import { UserInfo } from '../../molecules/UserInfo/UserInfo';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';
import { ListRow } from '../../layouts/ListRow/ListRow';
import { Panel } from '../../layouts/Panel/Panel';
import { BoulderBadge } from '../../molecules/BoulderBadge/BoulderBadge';
import { VideoStories } from '../VideoStories/VideoStories';
import { CommentsPanel } from '../CommentsPanel/CommentsPanel';
import { BoulderPublic } from 'core';

// Paliers de grade de largeur 5 (1-5, 6-10, …, 26-30) → couleur du palier (idx 0..5).
const GRADE_PALIER_COLORS = ['yellow', 'green', 'blue', 'red', 'black', 'purple'] as const;
const gradePalier = (grade: number) => {
  const idx = Math.max(0, Math.min(Math.floor((grade - 1) / 5), 5));
  return { idx, min: idx * 5 + 1, max: idx * 5 + 5 };
};

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];
const pad = (n: number) => String(n).padStart(2, '0');
const formatActivityDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} à ${pad(d.getHours())}h${pad(d.getMinutes())}`;
};

const GRID_HEIGHT = 200;

// Carte d'une activité (séance) : header, stats, meets, grille vidéos, compteurs, description.
export const Activity: React.FC<ActivityProps> = ({
  activity,
  currentUser,
  onPressBloc,
  onPressUser,
  style,
}) => {
  const theme = useTheme();
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
      { id: `local-${Date.now()}`, user: currentUser, content, createdAt: new Date().toISOString() },
    ]);
  };

  // Visionneuse vidéos : index de la vidéo ouverte (null = fermée)
  const [storiesIndex, setStoriesIndex] = useState<number | null>(null);

  // Panneau des grimpeurs croisés + état de suivi local (toggle optimiste au clic)
  const [meetsOpen, setMeetsOpen] = useState(false);
  const [following, setFollowing] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(activity.meets.map((u) => [u.id, !!u.isFollowing])),
  );
  const toggleFollow = (id: string) => setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));

  // Panneau de blocs (réalisés / palier max) : null = fermé
  const [blocPanel, setBlocPanel] = useState<{ title: string; blocs: BoulderPublic[] } | null>(
    null,
  );

  const videos = activity.videos;
  const gap = theme.spacing.xs;
  const halfHeight = (GRID_HEIGHT - gap) / 2;

  // Palier du grade max : on n'affiche pas le grade mais le NOMBRE de blocs passés dans ce palier,
  // dans la couleur du palier. Clic → liste de ces blocs.
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
        left={<BoulderBadge avatarUrl={b.blocUrl} grade={b.grade} />}
        primaryText={
          <Text size="lg" bold appearance={b.isValidated ? 'success' : undefined}>
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
          b.isValidated ? (
            <Icon name="CheckmarkCircleFilled" size="md" color={theme.colors.success.base} />
          ) : (
            <Text size="lg" bold appearance="gray">
              {b.points}pts
            </Text>
          )
        }
      />
    </Pressable>
  );

  // Cellule vidéo : poster (image du bloc) + bouton play, cliquable
  const VideoCell = ({ index, height }: { index: number; height: number }) => {
    const poster = posterFor(videos[index].blocId);
    return (
      <Pressable
        onPress={() => setStoriesIndex(index)}
        style={{
          flex: 1,
          height,
          borderRadius: theme.borderRadius.square,
          overflow: 'hidden',
          backgroundColor: theme.colors.secondary.lighter,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {poster && (
          <Image
            source={{ uri: poster }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            resizeMode="cover"
          />
        )}
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(0,0,0,0.45)',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 2,
          }}
        >
          <Icon name="play" size="md" color={theme.colors.neutral.white} />
        </View>
      </Pressable>
    );
  };

  // Cellule "+N" (vidéos restantes), ouvre la visionneuse sur la 1re vidéo cachée
  const OverflowCell = ({ count, height }: { count: number; height: number }) => (
    <Pressable
      onPress={() => setStoriesIndex(3)}
      style={{
        flex: 1,
        height,
        borderRadius: theme.borderRadius.square,
        backgroundColor: theme.colors.secondary.light,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text bold size="xl" style={{ color: theme.colors.neutral.white }}>
        +{count}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: theme.colors.neutral.white,
          padding: theme.spacing.md,
          gap: theme.spacing.md,
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
        },
        style,
      ]}
    >
      <UserInfo
        user={activity.user}
        layout="row"
        primaryText={fullName || activity.user.username}
        secondaryText={
          <Text appearance="gray" size="sm">
            {formatActivityDate(activity.createdAt)}
          </Text>
        }
        tertiaryText={
          <Text appearance="primary" size="sm">
            {activity.gym.name}
          </Text>
        }
        onPressUser={() => onPressUser?.(activity.user)}
      />

      {!!activity.title && (
        <Text size="lg" bold>
          {activity.title}
        </Text>
      )}

      {/* Stats : bloc réalisé + bloc max (cliquables → panneau de blocs) */}
      <View style={{ flexDirection: 'row', gap: theme.spacing.xxl }}>
        <Pressable
          style={{ gap: 2 }}
          onPress={() => setBlocPanel({ title: 'Blocs réalisés', blocs: activity.blocks })}
        >
          <Text appearance="gray" size="md">
            bloc réalisé
          </Text>
          <Text bold size="lg">
            {activity.blocks.length}
          </Text>
        </Pressable>
        <Pressable
          style={{ gap: 2 }}
          onPress={() =>
            setBlocPanel({ title: `Blocs ${palier.min}–${palier.max}`, blocs: palierBlocs })
          }
        >
          <Text appearance="gray" size="md">
            bloc max
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
            <Text bold size="lg">
              {palierBlocs.length}
            </Text>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: maxGradeColor,
              }}
            />
          </View>
        </Pressable>
      </View>

      {/* Bandeau meets : cliquable pour ouvrir le panneau des grimpeurs croisés */}
      {activity.meets.length > 0 && (
        <Pressable
          onPress={() => setMeetsOpen(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            backgroundColor: theme.colors.primary.lighter,
            borderRadius: theme.borderRadius.square,
            padding: theme.spacing.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {activity.meets.slice(0, 3).map((u, i) => (
              <Image
                key={u.id}
                source={{ uri: u.avatarUrl }}
                style={{
                  width: theme.avatarSizes.sm,
                  height: theme.avatarSizes.sm,
                  borderRadius: theme.borderRadius.rounded,
                  borderWidth: 2,
                  borderColor: theme.colors.primary.lighter,
                  marginLeft: i === 0 ? 0 : -10,
                  backgroundColor: theme.colors.neutral.gray.light,
                }}
              />
            ))}
            {activity.meets.length > 3 && (
              <Text appearance="gray" size="sm" bold style={{ marginLeft: theme.spacing.xs }}>
                +{activity.meets.length - 3}
              </Text>
            )}
          </View>
          <Text bold style={{ flex: 1, textAlign: 'center' }}>
            Ils étaient aussi présents !
          </Text>
        </Pressable>
      )}

      {/* Grille vidéos : 2 grandes à gauche + colonne (3e vidéo + "+N") */}
      {videos.length > 0 && (
        <View style={{ flexDirection: 'row', gap, height: GRID_HEIGHT }}>
          <VideoCell index={0} height={GRID_HEIGHT} />
          {videos.length >= 2 && <VideoCell index={1} height={GRID_HEIGHT} />}
          {videos.length === 3 && <VideoCell index={2} height={GRID_HEIGHT} />}
          {videos.length >= 4 && (
            <View style={{ flex: 1, gap }}>
              <VideoCell index={2} height={halfHeight} />
              <OverflowCell count={videos.length - 3} height={halfHeight} />
            </View>
          )}
        </View>
      )}

      {/* Compteurs likes / commentaires (cliquables, selon les autorisations de l'auteur) */}
      {(activity.likesEnabled || activity.commentsEnabled) && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.lg }}>
          {activity.likesEnabled && (
            <Pressable
              onPress={() => setLiked((prev) => !prev)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}
            >
              <Icon
                name={liked ? 'HeartFilled' : 'HeartRegular'}
                size="md"
                color={liked ? theme.colors.error.base : theme.colors.neutral.gray.base}
              />
              <Text appearance="gray" size="sm">
                {likeCount}
              </Text>
            </Pressable>
          )}
          {activity.commentsEnabled && (
            <Pressable
              onPress={() => setCommentsOpen(true)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}
            >
              <Icon name="ChatRegular" size="md" color={theme.colors.neutral.gray.base} />
              <Text appearance="gray" size="sm">
                {comments.length}
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Description */}
      {!!activity.description && <Text numberOfLines={3}>{activity.description}</Text>}

      {/* Visionneuse vidéos plein écran (Modal interne) */}
      {storiesIndex !== null && (
        <VideoStories
          videos={activity.videos}
          initialIndex={storiesIndex}
          onClose={() => setStoriesIndex(null)}
        />
      )}

      {/* Panneau des grimpeurs croisés : Modal pour échapper au flux de la carte,
          GestureHandlerRootView pour que le geste du Panel fonctionne sous Modal (Android). */}
      <Modal
        visible={meetsOpen}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setMeetsOpen(false)}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Panel isOpen={meetsOpen} onClose={() => setMeetsOpen(false)}>
            {activity.meets.map((u) => (
              <ListRow
                key={u.id}
                primaryText={<UserInfo user={u} layout="row" onPressUser={() => {}} />}
                right={
                  <Button
                    size="md"
                    borderRadius="square"
                    appearance="secondary"
                    inverted={following[u.id]}
                    title={following[u.id] ? 'Following' : 'Follow'}
                    onPress={() => toggleFollow(u.id)}
                  />
                }
              />
            ))}
          </Panel>
        </GestureHandlerRootView>
      </Modal>

      {/* Panneau de blocs : "bloc réalisé" (tous) ou "bloc max" (blocs du palier) */}
      <Modal
        visible={blocPanel !== null}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setBlocPanel(null)}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Panel isOpen={blocPanel !== null} onClose={() => setBlocPanel(null)}>
            {blocPanel?.blocs.map(renderBlocRow)}
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
    </View>
  );
};
