import { ReactNode, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { Text } from '../../atoms/Text/Text';
import { motion } from '../../../animations/motion';

export interface PostageStampProps {
  image?: string;
  title: string;
  caption?: string;
  /** Photo en noir et blanc : le timbre n'est pas encore acquis */
  muted?: boolean;
  /** Inclinaison du timbre, par exemple « -2deg » */
  rotate?: string;
  /** Élément posé sur le coin de la photo (cachet, date…) */
  mark?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STEP = 12;
const R = 3.6;
const PHOTO_HEIGHT = 76;

// Noir et blanc : `filter` s'écrit différemment sur le web et sur mobile
const MUTED_FILTER = Platform.select({
  web: { filter: 'grayscale(1) contrast(.85) brightness(1.1)' },
  default: { filter: [{ grayscale: 1 }] },
}) as object;

// Tous les festons du bord en un seul tracé : un seul élément à dessiner par timbre
const scallops = (w: number, h: number) => {
  const dot = (x: number, y: number) =>
    `M${x - R} ${y}a${R} ${R} 0 1 0 ${R * 2} 0a${R} ${R} 0 1 0 ${-R * 2} 0`;
  const parts: string[] = [`M0 0H${w}V${h}H0Z`];
  for (let x = 6; x < w; x += STEP) parts.push(dot(x, 0), dot(x, h));
  for (let y = 6; y < h; y += STEP) parts.push(dot(0, y), dot(w, y));
  return parts.join('');
};

// Timbre-poste : papier clair aux bords dentelés, photo et légende. Le papier reste clair dans
// les deux thèmes.
export const PostageStamp: React.FC<PostageStampProps> = ({
  image,
  title,
  caption,
  muted = false,
  rotate = '0deg',
  mark,
  onPress,
  style,
}) => {
  const theme = useTheme();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const onLayout = (e: LayoutChangeEvent) =>
    setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });

  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      accessibilityRole="button"
      accessibilityLabel={caption ? `${title}, ${caption}` : title}
      style={({ pressed }) => [
        {
          paddingTop: 6,
          paddingHorizontal: 6,
          paddingBottom: 8,
          transform: [{ rotate }, { scale: pressed ? motion.pressScale : 1 }],
        },
        style,
      ]}
    >
      {size.w > 0 && (
        <Svg
          width={size.w + R * 2}
          height={size.h + R * 2}
          viewBox={`${-R} ${-R} ${size.w + R * 2} ${size.h + R * 2}`}
          pointerEvents="none"
          style={{ position: 'absolute', left: -R, top: -R }}
        >
          <Path d={scallops(size.w, size.h)} fill={theme.colors.surface} />
        </Svg>
      )}
      <View style={{ height: PHOTO_HEIGHT, backgroundColor: theme.colors.surfaceAlt }}>
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          style={[{ width: '100%', height: '100%' }, muted ? MUTED_FILTER : null]}
        />
      </View>
      {mark}
      <Text
        size={11}
        extraBold
        numberOfLines={1}
        style={{ marginTop: 6, color: theme.colors.text }}
      >
        {title}
      </Text>
      {!!caption && (
        <Text
          size={11}
          numberOfLines={1}
          style={{ color: theme.colors.textMuted, fontFamily: theme.fonts.semiBold }}
        >
          {caption}
        </Text>
      )}
    </Pressable>
  );
};
