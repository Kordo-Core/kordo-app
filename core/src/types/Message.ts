import { UserPublic } from './User';

// Nature d'un message : du texte, ou un média dont `content` porte l'URL.
export type MessageKind = 'text' | 'image' | 'video';

// Vue frontend d'un message (table message, débarrassée du destinataire : le fil le connaît).
export type MessagePublic = {
  id: string;
  conversationId: string;
  authorId: string;
  kind: MessageKind;
  content: string; // le texte, ou l'URL du média
  createdAt: string; // ISO
};

// Une conversation reste `pending` tant que le destinataire du premier message n'a pas accepté.
export type ConversationStatus = 'accepted' | 'pending';

// Vue frontend d'une conversation à deux (table conversation enrichie du contact et du dernier
// message). Tout ce qu'il faut pour afficher une ligne de la liste, sans requête côté UI.
export type ConversationPublic = {
  id: string;
  contact: UserPublic; // l'autre participant
  lastMessage?: MessagePublic; // absent sur une conversation tout juste créée
  unreadCount: number;
  status: ConversationStatus;
  requestedBy: string; // couplé à `status`, décide qui voit « Accepter »
  isContactOnline: boolean; // présence simulée, faute de backend
};
