import styled from '@emotion/native';

export const Container = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
});

export const Sheet = styled.View((props) => ({
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  overflow: 'hidden',
  backgroundColor: props.theme.colors.surface,
}));

export const HandleArea = styled.View((props) => ({
  backgroundColor: props.theme.colors.surface,
  alignItems: 'center',
  paddingVertical: props.theme.spacing.sm,
}));

export const Handle = styled.View((props) => ({
  width: 40,
  height: 5,
  backgroundColor: props.theme.colors.surfaceAlt,
  borderRadius: props.theme.borderRadius.rounded,
}));

export const Content = styled.View((props) => ({
  backgroundColor: props.theme.colors.surface,
  padding: props.theme.spacing.md,
  minHeight: 200,
}));

// Bande blanche prolongeant le panneau vers le bas (hors mesure car absolue) : masque le
// fond sombre dans la zone du clavier pendant la fermeture, évitant tout vide transitoire.
export const Filler = styled.View((props) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  height: 1000,
  backgroundColor: props.theme.colors.surface,
}));

// Titre display du panneau (design D), lisible sur la surface du panneau. La graisse passe
// par la famille du thème, la seule façon d'obtenir du gras avec une police personnalisée sur
// mobile (`fontWeight` n'y a pas d'effet).
export const Title = styled.Text((props) => ({
  fontSize: props.theme.displaySizes.sm,
  fontFamily: props.theme.fonts.display,
  textTransform: 'uppercase',
  letterSpacing: -0.6,
  color: props.theme.colors.text,
  marginBottom: props.theme.spacing.sm,
}));
