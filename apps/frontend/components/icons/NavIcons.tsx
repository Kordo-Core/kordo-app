import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// Icônes de la barre de navigation, tracés repris de la maquette du design D (trait 2 px).
function NavIcon({
  d,
  size = 22,
  color = '#000000',
  strokeWidth = 2,
}: IconProps & { d: string; strokeWidth?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const HomeIcon = (props: IconProps) => (
  <NavIcon {...props} d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" />
);

export const SearchIcon = (props: IconProps) => (
  <NavIcon {...props} d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5" />
);

export const AddIcon = (props: IconProps) => (
  <NavIcon {...props} strokeWidth={2.6} d="M12 5v14M5 12h14" />
);

export const ShoeIcon = (props: IconProps) => (
  <NavIcon
    {...props}
    d="M2 16.5V14c0-2 1.2-3.2 3-4l2.5-1.2L9 5h3.5l.8 3.2 4.7 2.1c2.4 1 4 2.6 4 4.7v1.5zM2 16.5h20M6.5 12.5l1.5-1M9.5 12l1.2-1.2"
  />
);

export const StatsIcon = (props: IconProps) => <NavIcon {...props} d="M18 20V10M12 20V4M6 20v-6" />;
