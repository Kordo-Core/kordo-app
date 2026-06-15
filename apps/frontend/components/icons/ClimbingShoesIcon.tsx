import Svg, { G, Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// Chausson d'escalade (profil) : pointe recourbée + languette de talon, légèrement incliné.
// strokeWidth 1.1 × scale 1.13 ≈ 1.24 → aligné sur le poids des icônes Home/Search.
export function ClimbingShoesIcon({ size = 24, color = '#000000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G origin="12, 12" rotation={-13} scale={1.13}>
        <Path
          d="M5 11.6C5 10.7 5.6 10.2 6.8 10.2C8.8 10.2 9.8 10.6 11.2 10.6C14 10.6 16.5 11.6 19 13.4C20.4 14.4 21.2 15.2 20.6 16.1C20.2 16.7 19.4 16.9 18.4 16.8C16 16.9 14 15.4 12 15.4C10 15.4 8 16.9 6.2 16.9C5.2 16.9 4.6 16.3 4.6 15.2L4.6 12.8C4.6 12 4.7 11.6 5 11.6Z"
          stroke={color}
          strokeWidth={1.1}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <Path
          d="M5 10.4C4.1 9.3 4.3 8.1 5.5 7.9C6.4 7.78 7.1 8.5 7 9.6"
          stroke={color}
          strokeWidth={1.1}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}
