export interface FadeProps {
  children: React.ReactNode;
  type?: 'in' | 'out'; // fadeIn ou fadeOut
  direction?: 'up' | 'down' | 'left' | 'right'; // direction du mouvement
  duration?: number;
  delay?: number;
  distance?: number; // distance du mouvement (px)
}
