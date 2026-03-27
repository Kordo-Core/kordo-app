export interface FadeProps {
  children: React.ReactNode;
  type?: 'in' | 'out'; // fade in or fade out
  direction?: 'up' | 'down' | 'left' | 'right'; // direction of movement
  duration?: number;
  delay?: number;
  distance?: number; // translation distance in pixels
}
