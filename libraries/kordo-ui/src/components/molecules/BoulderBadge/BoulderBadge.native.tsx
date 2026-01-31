import { Text } from '../../atoms/Text/Text';
import { BoulderBadgeProps } from './BoulderBadge.types';
import * as Styled from './BoulderBadge.styles';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { Bounce } from '../../../animations/Bounce/Bounce';

export const BoulderBadge: React.FC<BoulderBadgeProps> = (props) => {
  const theme = useTheme();

  const strokeWidth = 3;
  const dashCount = 5; // always 5 dashes
  const avatarSize = theme.avatarSizes.md;
  const radius = avatarSize / 2 + 4; // 2px margin on each side inside the calculation
  const circumference = 2 * Math.PI * radius;

  // dash/space ratio (e.g. dash = 4x space). Adjust if needed.
  const dashRatio = 4;
  const segmentLength = circumference / dashCount;
  const dashLength = segmentLength * (dashRatio / (1 + dashRatio));
  const spaceLength = segmentLength - dashLength;
  const baseOffset = -circumference / 4 - spaceLength / 2; // to place the first dash at the top (12 o'clock)

  // compute the number of active dashes and their color based on props.grade
  const grade = props.grade;
  let activeCount = 0;
  let activeColor = theme.colors.neutral.gray.light;

  if (grade <= 5) {
    activeCount = grade; // 0..5 for first group
    activeColor = theme.colors.boulderGrade.yellow;
  } else if (grade <= 10) {
    activeCount = grade - 5; // 1..5 for second group
    activeColor = theme.colors.boulderGrade.green;
  } else if (grade <= 15) {
    activeCount = grade - 10;
    activeColor = theme.colors.boulderGrade.blue;
  } else if (grade <= 20) {
    activeCount = grade - 15;
    activeColor = theme.colors.boulderGrade.red;
  } else if (grade <= 25) {
    activeCount = grade - 20;
    activeColor = theme.colors.boulderGrade.black;
  } else if (grade <= 30) {
    activeCount = grade - 25;
    activeColor = theme.colors.boulderGrade.purple;
  }

  // SVG size / centering
  const svgSize = radius * 2 + strokeWidth;
  const center = radius + strokeWidth / 2;

  // helper to compute the offset of the i-th dash (0-based)
  const offsetForIndex = (i: number) => {
    // shift by a full segment (dash + space) multiplied by i
    return -(dashLength + spaceLength) * i;
  };

  return (
    <Styled.AvatarWrapper $svgSize={svgSize}>
      <Svg width={svgSize} height={svgSize} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Base circle: all dashes in gray */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={theme.colors.neutral.gray.light}
          strokeWidth={strokeWidth}
          strokeDashoffset={baseOffset}
          strokeDasharray={`${dashLength}, ${spaceLength}`}
          strokeLinecap="butt"
          fill="transparent"
        />

        {/* Overlays: one circle per active dash to individually color them */}
        {Array.from({ length: activeCount }).map((_, i) => (
          <Circle
            key={`active-${i}`}
            cx={center}
            cy={center}
            r={radius}
            stroke={activeColor}
            strokeWidth={strokeWidth}
            // one single active dash: dashLength then the rest of the circle as "space"
            strokeDasharray={`${dashLength}, ${circumference - dashLength}`}
            strokeDashoffset={baseOffset + offsetForIndex(i)}
            strokeLinecap="butt"
            fill="transparent"
          />
        ))}
      </Svg>

      {/* Centered avatar */}
      <Styled.CustomImage
        source={{ uri: props.avatarUrl }}
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        }}
      />
    </Styled.AvatarWrapper>
  );
};
