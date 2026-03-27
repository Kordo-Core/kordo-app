export interface ShakeProps {
  children: React.ReactNode;
  amplitude?: number; // maximum horizontal offset in pixels
  duration?: number; // duration of each step in the shake sequence (ms)
}
