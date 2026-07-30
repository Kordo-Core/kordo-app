import { createRNPrimitive } from './rn-primitives';

// react-native-web couvre l'essentiel (View, Pressable, ScrollView, Dimensions…), à trois
// exceptions près, remplacées ici :
//
// - `Image` : ses composants ne transmettent pas la prop `className`, donc un `styled(Image)`
//   perd toutes ses règles emotion et l'avatar se retrouve sans dimensions, donc invisible.
// - `Modal` : le sien recouvre toute la fenêtre du navigateur, hors du cadre téléphone.
// - `useWindowDimensions` : renvoie la taille du cadre téléphone plutôt que celle de la fenêtre.
export * from 'react-native-web';

export const Image = createRNPrimitive('img', 'image');
export { Modal } from './rn-modal';
export { useWindowDimensions } from './rn-viewport';
