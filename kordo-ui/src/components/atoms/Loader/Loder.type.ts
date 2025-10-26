export interface LoaderProps {
  type: 'bar' | 'spinner';
  duration: number;
  appearance?: 'primary' | 'secondary';
  infinite?: boolean;
  reverse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
