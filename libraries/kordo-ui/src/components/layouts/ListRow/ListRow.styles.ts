import styled from '@emotion/native';

// Gabarit partagé par les deux variantes de ligne, cliquable ou non.
const row = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingVertical: 8,
  gap: 16,
} as const;

export const Row = styled.View(row);

// Même gabarit, mais la ligne entière déclenche l'action du parent.
export const PressableRow = styled.Pressable(row);

export const Left = styled.View(() => ({
  flexDirection: 'row',
  gap: 4,
}));

export const Right = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  marginLeft: 'auto',
}));

export const TextWrapper = styled.View(() => ({
  //TODO alignItems: 'center',
  // `box-none` et non `none` : le conteneur lui-même ne capte jamais le toucher — une ligne
  // cliquable reçoit donc bien le clic posé sur son texte — mais ses enfants gardent le leur.
  // Avec `none`, tout contenu interactif passé en `primaryText` (un UserInfo, un lien vers un
  // profil) était muet, sans que rien ne le signale.
  pointerEvents: 'box-none',
  // Borne la zone de texte à l'espace disponible entre Left et Right → le texte long
  // revient à la ligne au lieu de déborder sur la droite.
  flex: 1,
}));

export const LeftWrapper = styled.View((props) => ({
  minWidth: props.theme.spacing.xxl,
}));
