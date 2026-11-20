import { Platform, TextStyle } from 'react-native';

/**
 * Texte d'une boîte de hauteur fixe (étiquette, bouton, badge) : sa boîte épouse les majuscules,
 * de leur sommet à la ligne de base, pour que le centrage du conteneur centre réellement les
 * lettres. Sur le web, cette boîte serrée couperait les jambages et les accents dès que le texte
 * est tronqué (`overflow: hidden`) : le padding rouvre la zone visible, la marge négative l'annule
 * dans la mise en page. Sur Android, on retire la marge interne que la plateforme ajoute autour du
 * texte.
 *
 * Interne à kordo-ui : les écrans passent par `Tag` ou `Button`, qui l'appliquent eux-mêmes.
 */
export const CENTERED_TEXT: TextStyle =
  Platform.OS === 'web'
    ? ({ textBox: 'trim-both cap alphabetic', paddingVertical: 6, marginVertical: -6 } as TextStyle)
    : { includeFontPadding: false, textAlignVertical: 'center' };
