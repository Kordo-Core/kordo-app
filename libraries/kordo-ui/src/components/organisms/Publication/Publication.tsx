import { useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useTheme } from '@emotion/react';
import { PublicationProps } from './Publication.types';
import { UserInfo } from '../../molecules/UserInfo/UserInfo';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { CommentsPanel } from '../CommentsPanel/CommentsPanel';

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
const formatPublicationDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} à ${pad(d.getHours())}h${pad(d.getMinutes())}`;
};

// Ratio type Instagram (portrait 4:5) appliqué à la largeur mesurée du carrousel.
const PHOTO_RATIO = 1.25;

// Carte d'une publication (post photo) : header, carrousel de photos paginé + points,
// like cliquable, panneau de commentaires, description.
export const Publication: React.FC<PublicationProps> = ({
  publication,
  currentUser,
  onPressUser,
  style,
}) => {
  const theme = useTheme();
  const fullName = [publication.user.firstName, publication.user.lastName]
    .filter(Boolean)
    .join(' ');

  // Largeur du carrousel (mesurée) + index de la photo affichée pour les points
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  // Like optimiste local + panneau des commentaires
  const [liked, setLiked] = useState(publication.isLiked);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const likeCount = publication.likes.length - (publication.isLiked ? 1 : 0) + (liked ? 1 : 0);

  // Commentaires (état local pour refléter l'ajout)
  const [comments, setComments] = useState(publication.comments);
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

  const photos = publication.photos;
  const photoHeight = width * PHOTO_RATIO;

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width === 0) return;
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

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
        user={publication.user}
        layout="row"
        primaryText={fullName || publication.user.username}
        secondaryText={
          <Text appearance="gray" size="sm">
            {formatPublicationDate(publication.createdAt)}
          </Text>
        }
        onPressUser={() => onPressUser?.(publication.user)}
      />

      {!!publication.title && (
        <Text size="lg" bold>
          {publication.title}
        </Text>
      )}

      {/* Carrousel de photos paginé (1..10) */}
      {photos.length > 0 && (
        <View
          onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
          style={{
            // Plein-bord : annule le padding horizontal de la carte pour occuper 100% de la largeur
            marginHorizontal: -theme.spacing.lg,
            height: photoHeight,
            overflow: 'hidden',
            backgroundColor: theme.colors.neutral.gray.light,
          }}
        >
          {width > 0 &&
            (photos.length === 1 ? (
              <Image
                source={{ uri: photos[0].url }}
                style={{ width, height: photoHeight }}
                resizeMode="cover"
              />
            ) : (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={onScrollEnd}
              >
                {photos.map((photo) => (
                  <Image
                    key={photo.id}
                    source={{ uri: photo.url }}
                    style={{ width, height: photoHeight }}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            ))}

          {/* Points indicateurs (overlay bas-centre) */}
          {photos.length > 1 && (
            <View
              style={{
                position: 'absolute',
                bottom: theme.spacing.sm,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: theme.spacing.xs,
              }}
            >
              {photos.map((photo, i) => (
                <View
                  key={photo.id}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      i === index ? theme.colors.secondary.base : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* Compteurs likes / commentaires (cliquables, selon les autorisations de l'auteur) */}
      {(publication.likesEnabled || publication.commentsEnabled) && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.lg }}>
          {publication.likesEnabled && (
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
          {publication.commentsEnabled && (
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
      {!!publication.description && <Text numberOfLines={3}>{publication.description}</Text>}

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
