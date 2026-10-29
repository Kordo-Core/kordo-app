import { StyleProp, ViewStyle } from 'react-native';

export interface ScreenHeaderProps {
  /** Grand titre display de l'écran (affiché en majuscules) */
  title?: string;
  /** Surtitre en petites majuscules à côté du bouton retour (écran parent, compteur…) */
  eyebrow?: string;
  /** Texte d'introduction sous le titre */
  subtitle?: string;
  /** Action du bouton gauche. Sans elle, pas de bouton. */
  onBack?: () => void;
  /** Icône du bouton gauche : flèche retour par défaut, croix pour fermer */
  backIcon?: string;
  /** Contenu à droite de la ligne du haut (boutons d'action) */
  right?: React.ReactNode;
  /** Contenu ajouté sous le titre, dans l'en-tête fixe (onglets, recherche…) */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
