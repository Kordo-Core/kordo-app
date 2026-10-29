import { ConversationPublic, MessagePublic } from 'core';

const pad = (n: number) => String(n).padStart(2, '0');

/** Heure d'un message, au format des autres écrans : « 9h54 ». */
export const formatTime = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getHours())}h${pad(d.getMinutes())}`;
};

/** Résumé d'un message pour la liste des conversations : les médias n'ont pas de texte. */
export const messagePreview = (message: MessagePublic | undefined, currentUserId: string) => {
  if (!message) return 'Démarrez la conversation';

  const body =
    message.kind === 'image' ? 'Photo' : message.kind === 'video' ? 'Vidéo' : message.content;

  return message.authorId === currentUserId ? `Vous : ${body}` : body;
};

/** Une demande reçue attend une réponse : c'est l'autre qui a écrit, et rien n'est encore accepté. */
export const isIncomingRequest = (conversation: ConversationPublic, currentUserId: string) =>
  conversation.status === 'pending' && conversation.requestedBy !== currentUserId;

/** Une demande envoyée bloque la saisie tant que le destinataire n'a pas répondu. */
export const isPendingApproval = (conversation: ConversationPublic, currentUserId: string) =>
  conversation.status === 'pending' && conversation.requestedBy === currentUserId;

// --- Découpage de la liste par fraîcheur ---

type SectionKey = 'recent' | 'hour' | 'today' | 'yesterday' | 'week' | 'older';

export type ConversationSection = {
  key: SectionKey;
  title: string;
  items: ConversationPublic[];
};

const HOUR = 3_600_000;
const DAY = 86_400_000;

const startOfDay = (ms: number) => {
  const d = new Date(ms);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};

// Deux échelles se succèdent, et c'est voulu : la première heure se compte en heures écoulées,
// le reste en jours de calendrier. Sans quoi un message de 23h55 basculerait dans « Hier » cinq
// minutes plus tard, alors qu'il vient d'arriver.
const sectionKeyOf = (iso: string | undefined, now: number): SectionKey => {
  // Une conversation ouverte sans message n'a pas de date : elle ferme la liste.
  if (!iso) return 'older';

  const at = new Date(iso).getTime();
  const elapsed = now - at;
  if (elapsed < HOUR) return 'recent';
  if (elapsed < 2 * HOUR) return 'hour';

  const days = Math.round((startOfDay(now) - startOfDay(at)) / DAY);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return 'week';
  return 'older';
};

const SECTIONS: { key: SectionKey; title: string }[] = [
  { key: 'recent', title: 'Récent' },
  { key: 'hour', title: 'Il y a 1h' },
  { key: 'today', title: "Aujourd'hui" },
  { key: 'yesterday', title: 'Hier' },
  { key: 'week', title: 'Cette semaine' },
  { key: 'older', title: 'Plus ancien' },
];

/**
 * Conversations du plus récent au plus ancien, réparties en blocs de fraîcheur. Le tri est refait
 * ici plutôt que supposé de la source : la liste est filtrée et remaniée par l'écran entre-temps.
 * Les blocs vides ne sont pas retournés.
 */
export const groupConversationsByRecency = (
  conversations: ConversationPublic[],
  now: number = Date.now(),
): ConversationSection[] => {
  const sorted = [...conversations].sort((a, b) =>
    (b.lastMessage?.createdAt ?? '').localeCompare(a.lastMessage?.createdAt ?? ''),
  );

  return SECTIONS.map(({ key, title }) => ({
    key,
    title,
    items: sorted.filter((c) => sectionKeyOf(c.lastMessage?.createdAt, now) === key),
  })).filter((section) => section.items.length > 0);
};
