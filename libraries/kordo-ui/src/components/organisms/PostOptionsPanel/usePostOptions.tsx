import { useState } from 'react';
import { UserPublic } from 'core';
import { PostOptionsPanel } from './PostOptionsPanel';
import { useOptionalToast } from '../../layouts/ToastProvider/ToastProvider';

// État partagé par les cartes du fil (activité, publication, message) pour le bouton « ⋯ » :
// ouverture du panneau d'options, post retiré du fil (supprimé, masqué, auteur bloqué) et
// commentaires coupés. Les données sont fictives : chaque action agit sur la carte et confirme
// par un toast.
export function usePostOptions(params: {
  author: UserPublic;
  currentUser?: UserPublic;
  meta: string;
  shareMessage: string;
  commentsEnabled: boolean;
}) {
  const toast = useOptionalToast();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(params.commentsEnabled);
  const isMine = !!params.currentUser && params.currentUser.id === params.author.id;
  const firstName = params.author.firstName || params.author.username;

  const notify = (message: string, type: 'success' | 'info' = 'success') =>
    toast?.addToast({ message, type, showLoader: false, isClosable: true, duration: 2500 });

  const panel = (
    <PostOptionsPanel
      isOpen={open}
      onClose={() => setOpen(false)}
      author={params.author}
      isMine={isMine}
      meta={params.meta}
      shareMessage={params.shareMessage}
      commentsEnabled={commentsEnabled}
      onEdit={() => notify('La modification des publications arrive bientôt', 'info')}
      onToggleComments={() => {
        notify(commentsEnabled ? 'Commentaires désactivés' : 'Commentaires réactivés');
        setCommentsEnabled((v) => !v);
      }}
      onDelete={() => {
        setHidden(true);
        notify('Publication supprimée');
      }}
      onHide={() => {
        setHidden(true);
        notify('Publication masquée');
      }}
      onUnfollow={() => notify(`Tu ne suis plus ${firstName}`)}
      onBlock={() => {
        setHidden(true);
        notify(`${firstName} est bloqué·e`);
      }}
      onReport={() => notify('Merci, ton signalement a bien été envoyé')}
    />
  );

  return { openOptions: () => setOpen(true), hidden, commentsEnabled, panel };
}
