import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { TextPostProps } from './TextPost.types';
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
const formatTextPostDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} à ${pad(d.getHours())}h${pad(d.getMinutes())}`;
};

// Carte d'un post texte : header (user/date), contenu texte, like cliquable, panneau de commentaires.
export const TextPost: React.FC<TextPostProps> = ({
  textPost,
  currentUser,
  onPressUser,
  style,
}) => {
  const theme = useTheme();
  const fullName = [textPost.user.firstName, textPost.user.lastName].filter(Boolean).join(' ');

  const [liked, setLiked] = useState(textPost.isLiked);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const likeCount = textPost.likes.length - (textPost.isLiked ? 1 : 0) + (liked ? 1 : 0);

  const [comments, setComments] = useState(textPost.comments);
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

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: theme.colors.neutral.white,
          padding: theme.spacing.md,
          gap: theme.spacing.md,
          boxShadow: theme.shadows.sm,
        },
        style,
      ]}
    >
      <UserInfo
        user={textPost.user}
        layout="row"
        primaryText={fullName || textPost.user.username}
        secondaryText={
          <Text appearance="gray" size="sm">
            {formatTextPostDate(textPost.createdAt)}
          </Text>
        }
        onPressUser={() => onPressUser?.(textPost.user)}
      />

      {/* Contenu texte du post */}
      {!!textPost.content && <Text>{textPost.content}</Text>}

      {/* Compteurs likes / commentaires (cliquables, selon les autorisations de l'auteur) */}
      {(textPost.likesEnabled || textPost.commentsEnabled) && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.lg }}>
          {textPost.likesEnabled && (
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
          {textPost.commentsEnabled && (
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
