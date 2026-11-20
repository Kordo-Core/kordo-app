import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { PublicationProps } from './Publication.types';
import { Text } from '../../atoms/Text/Text';
import {
  BigHeart,
  formatPostDate,
  PostActions,
  PostHeader,
  useDoubleTapLike,
  usePostCardStyle,
} from '../../molecules/PostParts/PostParts';
import { CommentsPanel } from '../CommentsPanel/CommentsPanel';
import { usePostOptions } from '../PostOptionsPanel/usePostOptions';
import { Slider } from '../../../animations/Slider/Slider';
import { CENTERED_TEXT } from '../../../utils/centeredText';

const MEDIA_HEIGHT = 280;

// Carte d'une publication (post photo), design D : en-tête, carrousel de photos paginé avec
// le titre en surimpression, description, actions. Double tap sur la photo = j'aime.
export const Publication: React.FC<PublicationProps> = ({
  publication,
  currentUser,
  onPressUser,
  style,
}) => {
  const theme = useTheme();
  const cardStyle = usePostCardStyle();
  const fullName = [publication.user.firstName, publication.user.lastName]
    .filter(Boolean)
    .join(' ');

  // Index de la photo affichée, pour les points
  const [index, setIndex] = useState(0);

  // Like optimiste local + panneau des commentaires
  const [liked, setLiked] = useState(publication.isLiked);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const likeCount = publication.likes.length - (publication.isLiked ? 1 : 0) + (liked ? 1 : 0);
  const { onPress: onTapMedia, heartStyle } = useDoubleTapLike(
    () => setLiked(true),
    publication.likesEnabled,
  );

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

  const options = usePostOptions({
    author: publication.user,
    currentUser,
    meta: [publication.title, formatPostDate(publication.createdAt)].filter(Boolean).join(' · '),
    shareMessage: `${fullName || publication.user.username} · ${publication.title}`,
    commentsEnabled: publication.commentsEnabled,
  });
  if (options.hidden) return null;

  return (
    <View style={[cardStyle, style]}>
      <PostHeader
        user={publication.user}
        meta={formatPostDate(publication.createdAt)}
        tag="Poste"
        onPressUser={onPressUser}
      />

      {!!publication.title && (
        <Text
          variant="display"
          size={26}
          numberOfLines={2}
          style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.sm + 2 }}
        >
          {publication.title}
        </Text>
      )}

      {/* Carrousel de photos paginé (1..10) */}
      {photos.length > 0 && (
        <View
          style={{
            marginHorizontal: theme.spacing.sm,
            height: MEDIA_HEIGHT,
            borderRadius: theme.borderRadius.card,
            overflow: 'hidden',
            backgroundColor: theme.colors.surfaceAlt,
          }}
        >
          {/* Carrousel de kordo-ui en mode pages : glisse au doigt comme à la souris */}
          <Slider
            paging
            height={MEDIA_HEIGHT}
            selectedIndex={index}
            onChange={setIndex}
            style={{ height: MEDIA_HEIGHT }}
          >
            {photos.map((photo, i) => (
              <Pressable key={photo.id} onPress={() => onTapMedia(i)} style={{ flex: 1 }}>
                <Image
                  source={{ uri: photo.url }}
                  style={{ width: '100%', height: MEDIA_HEIGHT }}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </Slider>

          {/* Points indicateurs (overlay bas-centre) */}
          {photos.length > 1 && (
            <View
              pointerEvents="box-none"
              style={{
                position: 'absolute',
                bottom: 12,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: theme.spacing.xs,
              }}
            >
              {photos.map((photo, i) => (
                <Pressable
                  key={photo.id}
                  onPress={() => setIndex(i)}
                  hitSlop={6}
                  accessibilityLabel={`Photo ${i + 1} sur ${photos.length}`}
                  style={{
                    width: i === index ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      i === index ? theme.colors.neutral.white : theme.colors.overlay.light,
                  }}
                />
              ))}
            </View>
          )}

          {/* Compteur « 2 / 4 » (overlay haut-droite) */}
          {photos.length > 1 && (
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                height: 26,
                paddingHorizontal: 10,
                borderRadius: theme.borderRadius.rounded,
                backgroundColor: theme.colors.overlay.dark,
                justifyContent: 'center',
              }}
            >
              <Text
                size="xs"
                extraBold
                style={[{ color: theme.colors.neutral.white }, CENTERED_TEXT]}
                accessibilityLabel={`Photo ${index + 1} sur ${photos.length}`}
              >
                {`${index + 1} / ${photos.length}`}
              </Text>
            </View>
          )}

          <BigHeart style={heartStyle} />
        </View>
      )}

      {!!publication.description && (
        <Text
          numberOfLines={3}
          style={{
            paddingTop: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: theme.spacing.xs,
            lineHeight: 22,
          }}
        >
          {publication.description}
        </Text>
      )}

      <PostActions
        likesEnabled={publication.likesEnabled}
        commentsEnabled={options.commentsEnabled}
        liked={liked}
        likeCount={likeCount}
        onToggleLike={() => setLiked((prev) => !prev)}
        commentCount={comments.length}
        onPressComments={() => setCommentsOpen(true)}
        onPressOptions={options.openOptions}
      />

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
