import Svg, { Rect, Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// Carré arrondi contenant une courbe ascendante : page de stats / progression.
// strokeWidth aligné sur le poids des icônes Home/Search (fluent regular).
export function ProgressIcon({ size = 24, color = '#000000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={18} height={18} rx={5} stroke={color} strokeWidth={1.25} />
      <Path
        d="M6.5 14.5 L10.5 10.5 L13 13 L17.5 8.5"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
