export interface ConfettiProps {
  /** Chaque nouvelle valeur relance l'éclat (ex. un compteur incrémenté à chaque validation) */
  trigger: number;
  /** Joue aussi l'éclat à l'apparition, sans attendre un premier changement de `trigger` */
  playOnMount?: boolean;
  /** Distance maximale parcourue par les morceaux, en px (défaut 120) */
  radius?: number;
  /** Durée de l'éclat, en ms (défaut 900) */
  duration?: number;
  /** Délai avant l'éclat joué à l'apparition, en ms */
  delay?: number;
  /** Taille d'un morceau : `sm` (8×12) ou `md` (9×14) */
  size?: 'sm' | 'md';
}
