import { Conversation, Message, User } from './db.types';
import { ConversationPublic, MessagePublic, UserPublic } from 'core';
import { CURRENT_USER, USERS } from './users.fake';
import { toUserPublic } from './social.fake';

// Présence simulée : sans backend, on fige qui est « en ligne ».
const ONLINE_USER_IDS = new Set(['u-adam', 'u-emma', 'u-nina']);

const IMAGE_URL =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png';

// Les dates sont calculées au chargement plutôt qu'écrites en dur. La liste des conversations les
// range par fraîcheur (Récent, Il y a 1h, Aujourd'hui, Hier, Cette semaine, Plus ancien) : avec
// des dates figées, tous les fils tomberaient dans le dernier bloc et le découpage ne se verrait
// pas. Chaque fil vise donc un bloc, et les écarts au sein d'un fil restent ceux d'origine.
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const NOW = Date.now();
const ago = (ms: number) => new Date(NOW - ms).toISOString();

// Pour le fil visé par « Aujourd'hui », l'écart est replié dans la journée en cours : ouverte au
// petit matin, l'application a moins de cinq heures de journée derrière elle et un écart fixe
// basculerait dans « Hier ».
const earlierToday = (ms: number) => {
  const midnight = new Date(NOW);
  midnight.setHours(0, 0, 0, 0);
  return ago(Math.min(ms, NOW - midnight.getTime()));
};

// --- Conversations (table "conversation") ---
export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-adam',
    userAId: CURRENT_USER.id,
    userBId: 'u-adam',
    status: 'accepted',
    requestedBy: 'u-adam',
    createdAt: ago(90 * DAY),
  },
  {
    id: 'conv-emma',
    userAId: CURRENT_USER.id,
    userBId: 'u-emma',
    status: 'accepted',
    requestedBy: 'u-emma',
    createdAt: ago(60 * DAY),
  },
  {
    id: 'conv-janja',
    userAId: CURRENT_USER.id,
    userBId: 'u-janja',
    status: 'accepted',
    requestedBy: CURRENT_USER.id,
    createdAt: ago(45 * DAY),
  },
  {
    id: 'conv-tomoa',
    userAId: CURRENT_USER.id,
    userBId: 'u-tomoa',
    status: 'accepted',
    requestedBy: 'u-tomoa',
    createdAt: ago(120 * DAY),
  },
  {
    id: 'conv-chloe',
    userAId: CURRENT_USER.id,
    userBId: 'u-chloe',
    status: 'accepted',
    requestedBy: CURRENT_USER.id,
    createdAt: ago(150 * DAY),
  },
  // Demande reçue : c'est Hugo qui a écrit, donc l'écran propose « Accepter ».
  {
    id: 'conv-hugo',
    userAId: CURRENT_USER.id,
    userBId: 'u-hugo',
    status: 'pending',
    requestedBy: 'u-hugo',
    createdAt: earlierToday(5 * HOUR),
  },
  // Demande envoyée : on attend la réponse de Marco, la saisie est bloquée.
  {
    id: 'conv-marco',
    userAId: CURRENT_USER.id,
    userBId: 'u-marco',
    status: 'pending',
    requestedBy: CURRENT_USER.id,
    createdAt: ago(3 * DAY),
  },
];

// --- Messages (table "message") ---
export const MESSAGES: Message[] = [
  // conv-adam : le fil le plus fourni, celui des maquettes
  {
    id: 'msg-a1',
    conversationId: 'conv-adam',
    senderId: 'u-adam',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content: 'Salut ! Tu as vu les nouveaux blocs du secteur jaune ?',
    createdAt: ago(38 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-a2',
    conversationId: 'conv-adam',
    senderId: 'u-adam',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content: 'Il y en a un qui devrait te plaire.',
    createdAt: ago(37 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-a3',
    conversationId: 'conv-adam',
    senderId: CURRENT_USER.id,
    receiverId: 'u-adam',
    type: 'text',
    content: "Pas encore ! J'y passe demain matin, tu es dispo ?",
    createdAt: ago(35 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-a4',
    conversationId: 'conv-adam',
    senderId: 'u-adam',
    receiverId: CURRENT_USER.id,
    type: 'image',
    content: IMAGE_URL,
    createdAt: ago(20 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-a5',
    conversationId: 'conv-adam',
    senderId: 'u-adam',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content:
      "Voilà le bloc dont je te parlais. Le départ est assis, et il y a un jeté sur la fin qui m'a donné du fil à retordre.",
    createdAt: ago(19 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-a6',
    conversationId: 'conv-adam',
    senderId: CURRENT_USER.id,
    receiverId: 'u-adam',
    type: 'text',
    content: "Ça a l'air costaud. On se retrouve à 10h sur place ?",
    createdAt: ago(15 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-a7',
    conversationId: 'conv-adam',
    senderId: 'u-adam',
    receiverId: CURRENT_USER.id,
    type: 'video',
    content: IMAGE_URL,
    createdAt: ago(12 * MINUTE),
    isRead: false,
  },

  // conv-emma
  {
    id: 'msg-1',
    conversationId: 'conv-emma',
    senderId: 'u-emma',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content: 'Salut ! On grimpe ce soir à Nation ?',
    createdAt: ago(HOUR + 40 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-2',
    conversationId: 'conv-emma',
    senderId: CURRENT_USER.id,
    receiverId: 'u-emma',
    type: 'text',
    content: 'Carrément, 19h ça te va ?',
    createdAt: ago(HOUR + 35 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-3',
    conversationId: 'conv-emma',
    senderId: 'u-emma',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content: 'Parfait, à toute 🙌',
    createdAt: ago(HOUR + 30 * MINUTE),
    isRead: false,
  },

  // conv-janja
  {
    id: 'msg-j1',
    conversationId: 'conv-janja',
    senderId: CURRENT_USER.id,
    receiverId: 'u-janja',
    type: 'text',
    content: 'Bien joué pour la finale de samedi !',
    createdAt: ago(DAY + 3 * HOUR),
    isRead: true,
  },
  {
    id: 'msg-j2',
    conversationId: 'conv-janja',
    senderId: 'u-janja',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content: 'Merci beaucoup 😊 On se voit à la prochaine session ?',
    createdAt: ago(DAY + 1 * HOUR),
    isRead: false,
  },

  // conv-tomoa
  {
    id: 'msg-t1',
    conversationId: 'conv-tomoa',
    senderId: 'u-tomoa',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content: 'Tu as récupéré ma brosse la dernière fois ?',
    createdAt: ago(12 * DAY + 30 * MINUTE),
    isRead: true,
  },
  {
    id: 'msg-t2',
    conversationId: 'conv-tomoa',
    senderId: CURRENT_USER.id,
    receiverId: 'u-tomoa',
    type: 'text',
    content: 'Oui elle est dans mon sac, je te la ramène jeudi.',
    createdAt: ago(12 * DAY),
    isRead: true,
  },

  // conv-chloe
  {
    id: 'msg-c1',
    conversationId: 'conv-chloe',
    senderId: CURRENT_USER.id,
    receiverId: 'u-chloe',
    type: 'text',
    content: 'Séance demain matin si tu es partante.',
    createdAt: ago(40 * DAY),
    isRead: true,
  },

  // conv-hugo : demande reçue, un seul message
  {
    id: 'msg-h1',
    conversationId: 'conv-hugo',
    senderId: 'u-hugo',
    receiverId: CURRENT_USER.id,
    type: 'text',
    content: "Salut ! On s'est croisés à Arkose hier, tu ouvres souvent là-bas ?",
    createdAt: earlierToday(5 * HOUR),
    isRead: false,
  },

  // conv-marco : demande envoyée, un seul message
  {
    id: 'msg-m1',
    conversationId: 'conv-marco',
    senderId: CURRENT_USER.id,
    receiverId: 'u-marco',
    type: 'text',
    content: 'Salut Marco, tu serais partant pour une sortie bloc ce week-end ?',
    createdAt: ago(3 * DAY),
    isRead: true,
  },
];

// --- Sélecteurs ---

const toMessagePublic = (message: Message): MessagePublic => ({
  id: message.id,
  conversationId: message.conversationId,
  authorId: message.senderId,
  kind: message.type,
  content: message.content,
  createdAt: message.createdAt,
});

/** L'autre participant d'une conversation, vu depuis l'utilisateur courant. */
const contactOf = (conversation: Conversation): User | undefined => {
  const contactId =
    conversation.userAId === CURRENT_USER.id ? conversation.userBId : conversation.userAId;
  return USERS.find((u) => u.id === contactId);
};

const toConversationPublic = (
  conversation: Conversation,
  contact: User,
): ConversationPublic | null => {
  const messages = MESSAGES.filter((m) => m.conversationId === conversation.id).sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );

  return {
    id: conversation.id,
    contact: toUserPublic(contact),
    lastMessage: messages.length ? toMessagePublic(messages[messages.length - 1]) : undefined,
    unreadCount: messages.filter((m) => m.receiverId === CURRENT_USER.id && !m.isRead).length,
    status: conversation.status,
    requestedBy: conversation.requestedBy,
    isContactOnline: ONLINE_USER_IDS.has(contact.id),
  };
};

/** Conversations de l'utilisateur courant, dernier message en premier. */
export function getConversations(): ConversationPublic[] {
  return CONVERSATIONS.map((conversation) => {
    const contact = contactOf(conversation);
    return contact ? toConversationPublic(conversation, contact) : null;
  })
    .filter((c): c is ConversationPublic => !!c)
    .sort((a, b) => (b.lastMessage?.createdAt ?? '').localeCompare(a.lastMessage?.createdAt ?? ''));
}

/** Une conversation précise, ou `undefined` si l'identifiant ne correspond à rien. */
export function getConversation(conversationId: string): ConversationPublic | undefined {
  const conversation = CONVERSATIONS.find((c) => c.id === conversationId);
  if (!conversation) return undefined;

  const contact = contactOf(conversation);
  return contact ? (toConversationPublic(conversation, contact) ?? undefined) : undefined;
}

/** Messages d'un fil, du plus ancien au plus récent. */
export function getConversationMessages(conversationId: string): MessagePublic[] {
  return MESSAGES.filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(toMessagePublic);
}

/** Conversation existante avec un utilisateur, pour ne pas en ouvrir un doublon. */
export function findConversationWith(userId: string): ConversationPublic | undefined {
  const conversation = CONVERSATIONS.find(
    (c) =>
      (c.userAId === CURRENT_USER.id && c.userBId === userId) ||
      (c.userBId === CURRENT_USER.id && c.userAId === userId),
  );
  return conversation ? getConversation(conversation.id) : undefined;
}

/** Destinataires proposés à l'ouverture d'une nouvelle conversation. */
export function getMessageableUsers(): UserPublic[] {
  return USERS.filter((u) => u.id !== CURRENT_USER.id)
    .map(toUserPublic)
    .sort((a, b) => a.username.localeCompare(b.username));
}
