import React from 'react';

// Écran de téléphone dessiné autour d'une story.
//
// Le cadre ne peut pas être un simple conteneur : plusieurs composants raisonnent en fenêtre,
// pas en boîte. `useWindowDimensions` renseigne la hauteur d'écran dont Panel, CommentsPanel,
// VideoStories et Dropdown déduisent leur position, et le `Modal` de react-native-web se
// téléporte dans `document.body` en `position: fixed`. Un cadre dessiné dans la page laisserait
// ces deux-là parler de la fenêtre du navigateur — c'est ce qui imposait jusqu'ici de remplacer
// les primitives correspondantes.
//
// Ici, la story est rechargée dans une iframe aux dimensions d'un téléphone : sa fenêtre *est*
// l'écran. Les deux comportements redeviennent exacts sans qu'on touche à quoi que ce soit, et
// l'habillage reste libre puisqu'il vit à l'extérieur.

export const PHONE_WIDTH = 390;
export const PHONE_HEIGHT = 780;

// Marqueur porté par l'URL de l'iframe imbriquée. Sans lui, le décorateur se réappliquerait à
// l'intérieur et redessinerait un cadre à l'infini.
const NESTED_FLAG = 'phoneFrameNested';

/** Vrai dans l'iframe imbriquée : c'est le rendu réel de la story, sans habillage. */
export const isNestedRender = (): boolean =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has(NESTED_FLAG);

const chrome: React.CSSProperties = {
  width: PHONE_WIDTH,
  height: PHONE_HEIGHT,
  margin: '24px auto',
  border: '1px solid #D9D9D9',
  borderRadius: 12,
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
};

export const PhoneFrame: React.FC<{ storyId: string }> = ({ storyId }) => (
  <div style={chrome}>
    <iframe
      // Chemin relatif : la story est rechargée par le même serveur Storybook, marqueur en plus.
      src={`iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story&${NESTED_FLAG}=1`}
      title="Écran de téléphone"
      style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
    />
  </div>
);
