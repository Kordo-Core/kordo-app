import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { CommentItem, CommentsPanelProps } from './CommentsPanel.types';
import { Text } from '../../atoms/Text/Text';
import { Icon } from '../../atoms/Icon/Icon';
import { Input } from '../../molecules/Input/Input';
import { Panel } from '../../layouts/Panel/Panel';
import { motion } from '../../../animations/motion';

const AVATAR = 36;
const SEND = 42;

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

// Un commentaire (design D) : avatar arrondi, bulle claire avec le nom et le texte, puis une
// ligne d'actions discrète (date, Répondre) et un petit cœur à droite.
function CommentRow({
  comment,
  onPressUser,
  onReply,
}: {
  comment: CommentItem;
  onPressUser?: () => void;
  onReply?: () => void;
}) {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const name =
    [comment.user.firstName, comment.user.lastName].filter(Boolean).join(' ') ||
    comment.user.username;

  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Pressable onPress={onPressUser} disabled={!onPressUser} accessibilityLabel={name}>
        <Image
          source={{ uri: comment.user.avatarUrl }}
          style={{
            width: AVATAR,
            height: AVATAR,
            borderRadius: Math.round(AVATAR * 0.13),
            backgroundColor: theme.colors.surfaceAlt,
          }}
        />
      </Pressable>

      <View style={{ flex: 1, gap: 4 }}>
        <View
          style={{
            alignSelf: 'flex-start',
            maxWidth: '100%',
            paddingVertical: 9,
            paddingHorizontal: 12,
            gap: 2,
            borderRadius: 8,
            borderTopLeftRadius: 3,
            backgroundColor: theme.colors.surfaceAlt,
          }}
        >
          <Text size="sm" extraBold onPress={onPressUser}>
            {name}
          </Text>
          <Text size="sm" style={{ lineHeight: 20 }}>
            {comment.content}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingLeft: 12 }}>
          <Text size="xs" bold appearance="gray">
            {formatRelative(comment.createdAt)}
          </Text>
          {onReply && (
            <Pressable onPress={onReply} hitSlop={8}>
              <Text size="xs" extraBold appearance="gray">
                Répondre
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <Pressable
        onPress={() => setLiked((v) => !v)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={liked ? 'Ne plus aimer' : 'Aimer le commentaire'}
        style={({ pressed }) => ({
          paddingTop: 12,
          alignItems: 'center',
          transform: [{ scale: pressed ? motion.pressScale : 1 }],
        })}
      >
        <Icon
          name={liked ? 'HeartFilled' : 'HeartRegular'}
          size={16}
          color={liked ? theme.colors.error.base : theme.colors.textMuted}
        />
      </Pressable>
    </View>
  );
}

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

  const title =
    comments.length > 0
      ? `${comments.length} commentaire${comments.length > 1 ? 's' : ''}`
      : 'Commentaires';
  const canSend = draft.trim().length > 0;

  return (
    <Modal
      visible={mounted}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Panel isOpen={isOpen} onClose={onClose} title={title}>
          <View style={{ gap: 18, paddingTop: 4 }}>
            {comments.length === 0 ? (
              // État vide : une invitation plutôt qu'un panneau blanc
              <View style={{ alignItems: 'center', gap: 8, paddingVertical: 28 }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.soft,
                  }}
                >
                  <Icon name="ChatRegular" size={26} color={theme.colors.softText} />
                </View>
                <Text bold>Aucun commentaire</Text>
                <Text size="sm" appearance="gray">
                  Lance la conversation.
                </Text>
              </View>
            ) : (
              comments.map((comment) => {
                // Ferme le panneau avant de remonter le clic : la navigation est gérée côté
                // frontend, et sans cette fermeture l'écran ouvert s'empilerait *derrière* le
                // Modal resté visible.
                const openUser = onPressUser
                  ? () => {
                      onClose();
                      onPressUser(comment.user);
                    }
                  : undefined;
                return (
                  <CommentRow
                    key={comment.id}
                    comment={comment}
                    onPressUser={openUser}
                    onReply={currentUser ? () => setDraft(`@${comment.user.username} `) : undefined}
                  />
                );
              })
            )}

            {/* Zone de saisie (avatar + champ + bouton d'envoi rond), séparée de la liste ;
                le Panel la remonte au-dessus du clavier à l'ouverture. */}
            {currentUser && (
              <View
                style={{
                  flexDirection: 'row',
                  // flex-start + décalages : on aligne l'avatar et le bouton sur la boîte de
                  // saisie (42px), sans subir la ligne d'erreur réservée sous l'Input.
                  alignItems: 'flex-start',
                  gap: 10,
                  paddingTop: 14,
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.border,
                }}
              >
                <Image
                  source={{ uri: currentUser.avatarUrl }}
                  style={{
                    width: AVATAR,
                    height: AVATAR,
                    borderRadius: Math.round(AVATAR * 0.13),
                    backgroundColor: theme.colors.surfaceAlt,
                    marginTop: 4 + (42 - AVATAR) / 2,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Input value={draft} onChange={setDraft} placeholder="Ajouter un commentaire…" />
                </View>
                <Pressable
                  onPress={send}
                  disabled={!canSend}
                  accessibilityRole="button"
                  accessibilityLabel="Envoyer le commentaire"
                  style={({ pressed }) => ({
                    width: SEND,
                    height: SEND,
                    marginTop: 4,
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: canSend
                      ? theme.colors.secondary.base
                      : theme.colors.surfaceAlt,
                    transform: [{ scale: pressed ? motion.pressScale : 1 }],
                  })}
                >
                  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 19V5M6 11l6-6 6 6"
                      stroke={canSend ? '#FFFFFF' : theme.colors.textMuted}
                      strokeWidth={2.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </Pressable>
              </View>
            )}
          </View>
        </Panel>
      </GestureHandlerRootView>
    </Modal>
  );
};
