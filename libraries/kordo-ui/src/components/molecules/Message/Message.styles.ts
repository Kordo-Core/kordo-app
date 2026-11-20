import styled from '@emotion/native';
import { MessageProps } from './Message.types';

type Direction = Pick<MessageProps, 'direction'>;

// Rayon relevé sur la maquette. Le thème n'en propose pas d'équivalent : une bulle n'est ni
// une carte ni une pilule.
// Bulles très arrondies, queue resserrée : seule exception aux petits rayons de la maquette
const RADIUS = 20;

// Coins vifs du côté de l'émetteur. Le dernier message d'une suite n'en garde qu'un, en bas ;
// les messages qui en précèdent un autre du même auteur l'ont aussi en haut, pour que la suite
// se lise comme un seul bloc.
const TAIL_RADIUS = 6;

type BubbleProps = Direction & { continued: boolean };

// Aligne la bulle et son horodatage sur le même bord, celui qui dépend de l'émetteur.
export const Row = styled.View<Direction>((props) => ({
  width: '100%',
  alignItems: props.direction === 'out' ? 'flex-end' : 'flex-start',
}));

export const Bubble = styled.View<BubbleProps>((props) => {
  const out = props.direction === 'out';
  return {
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: RADIUS,
    ...(out
      ? {
          borderBottomRightRadius: TAIL_RADIUS,
          borderTopRightRadius: props.continued ? TAIL_RADIUS : RADIUS,
        }
      : {
          borderBottomLeftRadius: TAIL_RADIUS,
          borderTopLeftRadius: props.continued ? TAIL_RADIUS : RADIUS,
        }),
    backgroundColor: out ? props.theme.colors.secondary.base : props.theme.colors.surface,
  };
});

// Une bulle de média se passe du rembourrage : l'image occupe toute la bulle.
export const MediaBubble = styled(Bubble)(() => ({
  padding: 0,
  overflow: 'hidden',
}));
