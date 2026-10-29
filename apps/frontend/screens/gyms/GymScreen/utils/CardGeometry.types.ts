// Géométrie de la mécanique "card qui se docke + ghost scroll", calculée une fois
// dans GymScreen et passée aux deux onglets (qui partagent le même slot hero).
export type CardGeometry = {
  height: number;
  headerHeight: number;
  heroHeight: number;
  topInset: number; // header + segmented control
  cardHeight: number;
  cardRest: number; // position de repos de la card (avant scroll)
  cardDock: number; // décalage de scroll au bout duquel la card est dockée
  shadowGap: number;
  phase1End: number; // fin de la phase 1 (montée de la card) pour les anims hero
};
