import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { ClipPath, Defs, Image as SvgImage, Text as SvgText } from 'react-native-svg';

const AnimatedSvgImage = Animated.createAnimatedComponent(SvgImage);

// La photo est plus large que le texte : elle a de la place pour glisser derrière lui
const IMAGE_RATIO = 1.7;
const BASELINE = 0.84;

export interface PhotoTextProps {
  /** Texte très court : quelques caractères en grand */
  text: string;
  imageUri: string;
  /** Taille du texte, en px */
  size: number;
  /** Hauteur du bloc, en px (défaut : 0,86 × size) */
  height?: number;
  /** Interlettrage, en px (défaut : −0,3 px, comme tous les titres display) */
  letterSpacing?: number;
  /** Durée d'un aller de la photo, en ms (défaut 18000) */
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

// Grand texte en Barlow Condensed italique rempli d'une photo qui glisse lentement derrière les lettres.
export const PhotoText: React.FC<PhotoTextProps> = ({
  text,
  imageUri,
  size,
  height = Math.round(size * 0.86),
  letterSpacing = -0.3,
  duration = 18000,
  style,
}) => {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const progress = useSharedValue(0);
  const imageWidth = width * IMAGE_RATIO;
  const travel = imageWidth - width;

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [duration, progress]);

  const imageProps = useAnimatedProps(() => ({ x: -progress.value * travel }));

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={text}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      style={[{ height }, style]}
    >
      {width > 0 && (
        <Svg width={width} height={height}>
          <Defs>
            <ClipPath id="photo-text">
              <SvgText
                x={width / 2}
                y={height * BASELINE + size * 0.08}
                textAnchor="middle"
                fontFamily={theme.fonts.display}
                fontSize={size}
                letterSpacing={letterSpacing}
              >
                {text}
              </SvgText>
            </ClipPath>
          </Defs>
          <AnimatedSvgImage
            animatedProps={imageProps}
            y={0}
            width={imageWidth}
            height={height}
            href={{ uri: imageUri }}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#photo-text)"
          />
        </Svg>
      )}
    </View>
  );
};
