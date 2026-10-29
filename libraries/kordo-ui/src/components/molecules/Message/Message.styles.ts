import styled from '@emotion/native';
import { MessageProps } from './Message.types';

type Direction = Pick<MessageProps, 'direction'>;

// La bulle ne dépasse jamais les trois quarts de la largeur : un message long revient à la
// ligne au lieu de s'étirer d'un bord à l'autre.
const MAX_WIDTH = '75%';

// Rayon relevé sur la maquette. Le thème n'en propose pas d'équivalent : `square` (8) est le
// rayon des cartes, `rounded` (100) celui des pilules — une bulle n'est ni l'un ni l'autre.
const RADIUS = 20;

// Un coin reste vif, et c'est lui qui désigne l'émetteur : en bas à gauche pour un message
// reçu, en haut à droite pour un message envoyé.
const TAIL_RADIUS = 2;

// Aligne la bulle et son horodatage sur le même bord, celui qui dépend de l'émetteur.
export const Row = styled.View<Direction>((props) => ({
  width: '100%',
  alignItems: props.direction === 'out' ? 'flex-end' : 'flex-start',
  gap: props.theme.spacing.xs,
}));

export const Bubble = styled.View<Direction>((props) => ({
  maxWidth: MAX_WIDTH,
  padding: props.theme.spacing.md,
  borderRadius: RADIUS,
  ...(props.direction === 'out'
    ? { borderTopRightRadius: TAIL_RADIUS }
    : { borderBottomLeftRadius: TAIL_RADIUS }),
  backgroundColor:
    props.direction === 'out'
      ? props.theme.colors.secondary.lighter
      : props.theme.colors.neutral.gray.lightest,
}));

// Une bulle de média se passe du rembourrage : l'image occupe toute la bulle.
export const MediaBubble = styled(Bubble)(() => ({
  padding: 0,
  overflow: 'hidden',
}));
