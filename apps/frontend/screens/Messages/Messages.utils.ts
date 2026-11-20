import { ConversationPublic, MessagePublic } from 'core';

const pad = (n: number) => String(n).padStart(2, '0');

/** Heure d'un message dans le fil : « 09:54 ». */
export const formatTime = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
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

// --- Liste des conversations ---

const DAY = 86_400_000;
const WEEKDAYS = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
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

const startOfDay = (ms: number) => {
  const d = new Date(ms);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};

/** Horodatage d'une ligne de la liste : « 09:58 » aujourd'hui, « Hier », « Lun. », puis « 12 mai ». */
export const formatListTime = (iso: string | undefined, now: number = Date.now()) => {
  if (!iso) return '';
  const d = new Date(iso);
  const days = Math.round((startOfDay(now) - startOfDay(d.getTime())) / DAY);
  if (days <= 0) return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (days === 1) return 'Hier';
  if (days < 7) return WEEKDAYS[d.getDay()];
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
};

/** Conversations du plus récent au plus ancien ; celles sans message ferment la liste. */
export const sortByRecency = (conversations: ConversationPublic[]) =>
  [...conversations].sort((a, b) =>
    (b.lastMessage?.createdAt ?? '').localeCompare(a.lastMessage?.createdAt ?? ''),
  );
