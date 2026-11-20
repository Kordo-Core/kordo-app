import styled from '@emotion/native';

type Tone = { tone?: 'surface' | 'background' };
const bg = (props: Tone & { theme: { colors: { surface: string; background: string } } }) =>
  props.tone === 'background' ? props.theme.colors.background : props.theme.colors.surface;

export const Container = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
});

export const Sheet = styled.View<Tone>((props) => ({
  borderTopLeftRadius: 13,
  borderTopRightRadius: 13,
  overflow: 'hidden',
  backgroundColor: bg(props),
}));

export const HandleArea = styled.View<Tone>((props) => ({
  backgroundColor: bg(props),
  alignItems: 'center',
  // Poignée à 10 px du haut, contenu juste dessous (maquette « sport »)
  paddingTop: 10,
  paddingBottom: 0,
}));

export const Handle = styled.View((props) => ({
  width: 40,
  height: 5,
  backgroundColor: props.theme.colors.border,
  borderRadius: props.theme.borderRadius.rounded,
}));

export const Content = styled.View<Tone>((props) => ({
  backgroundColor: bg(props),
  padding: props.theme.spacing.md,
  minHeight: 200,
}));

// Bande blanche prolongeant le panneau vers le bas (hors mesure car absolue) : masque le
// fond sombre dans la zone du clavier pendant la fermeture, évitant tout vide transitoire.
export const Filler = styled.View<Tone>((props) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  height: 1000,
  backgroundColor: bg(props),
}));

// Titre display du panneau (maquette « sport »), lisible sur la surface du panneau. La graisse passe
// par la famille du thème, la seule façon d'obtenir du gras avec une police personnalisée sur
// mobile (`fontWeight` n'y a pas d'effet).
export const Title = styled.Text((props) => ({
  fontSize: props.theme.displaySizes.sm,
  fontFamily: props.theme.fonts.display,
  textTransform: 'uppercase',
  letterSpacing: -0.3,
  color: props.theme.colors.text,
  marginBottom: props.theme.spacing.sm,
}));
