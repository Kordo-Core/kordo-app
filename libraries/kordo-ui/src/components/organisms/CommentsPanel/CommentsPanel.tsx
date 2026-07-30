import { useEffect, useState } from 'react';
import { Image, Modal, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@emotion/react';
import { CommentItem, CommentsPanelProps } from './CommentsPanel.types';
import { UserInfo } from '../../molecules/UserInfo/UserInfo';
import { Text } from '../../atoms/Text/Text';
import { Input } from '../../molecules/Input/Input';
import { ListRow } from '../../layouts/ListRow/ListRow';
import { Panel } from '../../layouts/Panel/Panel';

// Temps relatif compact : "5min", "12h", "3j", "2 sem", "4 mois".
const formatRelative = (iso: string): string => {
  const diffMin = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (diffMin < 60) return `${diffMin}min`;
  const h = Math.round(diffMin / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}j`;
  if (d < 30) return `${Math.round(d / 7)} sem`;
  return `${Math.round(d / 30)} mois`;
};

// Panneau des commentaires d'un post (liste + zone de saisie), réutilisé par tous les posts.
// Le Panel se cale au-dessus du clavier à l'ouverture de la saisie.
export const CommentsPanel: React.FC<CommentsPanelProps> = ({
  isOpen,
  onClose,
  comments,
  currentUser,
  onAddComment,
  onPressUser,
}) => {
  const theme = useTheme();
  const [draft, setDraft] = useState('');

  // Garde le Modal monté pendant l'animation de fermeture du Panel (sinon le Modal disparaît
  // instantanément et coupe le glissement vers le bas). Démontage différé après l'anim.
  const [mounted, setMounted] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(t);
  }, [isOpen]);

  const send = () => {
    const content = draft.trim();
    if (!content) return;
    onAddComment?.(content);
    setDraft('');
  };

  // Ligne de commentaire : nom + date à côté, contenu en dessous (structure proche de TextPost).
  const renderComment = (comment: CommentItem) => {
    const name =
      [comment.user.firstName, comment.user.lastName].filter(Boolean).join(' ') ||
      comment.user.username;
    return (
      <ListRow
        key={comment.id}
        primaryText={
          <UserInfo
            user={comment.user}
            layout="row"
            primaryText={
              <Text size="md">
                <Text size="md" bold>
                  {name}
                </Text>
                {'  '}
                <Text appearance="gray" size="sm">
                  {formatRelative(comment.createdAt)}
                </Text>
              </Text>
            }
            secondaryText={
              <Text size="sm" style={{ marginTop: theme.spacing.xs }}>
                {comment.content}
              </Text>
            }
            onPressUser={() => onPressUser?.(comment.user)}
          />
        }
      />
    );
  };

  return (
    <Modal
      visible={mounted}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Panel isOpen={isOpen} onClose={onClose}>
          {comments.map(renderComment)}

          {/* Zone de saisie d'un nouveau commentaire (avatar + input + bouton d'envoi),
              en bas du panneau ; le Panel la remonte au-dessus du clavier à l'ouverture. */}
          {currentUser && (
            <View
              style={{
                flexDirection: 'row',
                // flex-start + décalage de l'avatar : on aligne l'avatar sur la boîte de saisie
                // (42px), sans subir la ligne d'erreur réservée sous l'Input.
                alignItems: 'flex-start',
                gap: theme.spacing.sm,
                marginTop: theme.spacing.sm,
              }}
            >
              <Image
                source={{ uri: currentUser.avatarUrl }}
                style={{
                  width: theme.avatarSizes.sm,
                  height: theme.avatarSizes.sm,
                  borderRadius: theme.borderRadius.rounded,
                  backgroundColor: theme.colors.neutral.gray.light,
                  marginTop: 4 + (42 - theme.avatarSizes.sm) / 2,
                }}
              />
              <View style={{ flex: 1 }}>
                <Input
                  value={draft}
                  onChange={setDraft}
                  placeholder="Ajouter un commentaire…"
                  // Bouton d'envoi (flèche vers le haut) affiché uniquement à la saisie
                  rightIcon={
                    draft.trim()
                      ? {
                          name: 'ArrowCircleUpRegular',
                          size: theme.iconSizes.lg,
                          color: theme.colors.secondary.base,
                          onPress: send,
                        }
                      : undefined
                  }
                />
              </View>
            </View>
          )}
        </Panel>
      </GestureHandlerRootView>
    </Modal>
  );
};
