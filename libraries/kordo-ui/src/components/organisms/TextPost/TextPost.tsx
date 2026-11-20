import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { TextPostProps } from './TextPost.types';
import { Text } from '../../atoms/Text/Text';
import {
  formatPostDate,
  PostActions,
  PostHeader,
  usePostCardStyle,
} from '../../molecules/PostParts/PostParts';
import { CommentsPanel } from '../CommentsPanel/CommentsPanel';
import { usePostOptions } from '../PostOptionsPanel/usePostOptions';

// Carte d'un post texte (« pensée »), design D : en-tête, texte, actions, panneau de commentaires.
export const TextPost: React.FC<TextPostProps> = ({
  textPost,
  currentUser,
  onPressUser,
  style,
}) => {
  const theme = useTheme();
  const cardStyle = usePostCardStyle();
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

  const options = usePostOptions({
    author: textPost.user,
    currentUser,
    meta: formatPostDate(textPost.createdAt),
    shareMessage: `${fullName || textPost.user.username} · ${textPost.content}`,
    commentsEnabled: textPost.commentsEnabled,
  });
  if (options.hidden) return null;

  return (
    <View style={[cardStyle, style]}>
      <PostHeader
        user={textPost.user}
        meta={formatPostDate(textPost.createdAt)}
        tag="Message"
        onPressUser={onPressUser}
      />

      {/* Contenu texte du post */}
      {!!textPost.content && (
        <Text style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: 4, lineHeight: 22 }}>
          {textPost.content}
        </Text>
      )}

      <PostActions
        likesEnabled={textPost.likesEnabled}
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
