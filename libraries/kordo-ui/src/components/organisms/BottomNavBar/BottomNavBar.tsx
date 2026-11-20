import { BottomNavBarProps, NavTab } from './BottomNavBar.types';
import * as Styled from './BottomNavBar.styles';
import { Icon } from '../../atoms/Icon/Icon';
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@emotion/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { motion } from '../../../animations/motion';

// Barre pleine largeur : les onglets se partagent toute la largeur, comme dans la maquette.
const PADDING_HORIZONTAL = 0;
const ICON_SIZE = 22;

function renderIcon(tab: NavTab, color: string) {
  const TabIcon = tab.icon;
  return typeof TabIcon === 'string' ? (
    <Icon name={TabIcon} size={ICON_SIZE} color={color} />
  ) : (
    <TabIcon size={ICON_SIZE} color={color} />
  );
}

type NavTabButtonProps = {
  tab: NavTab;
  isActive: boolean;
  /** Position (bord gauche) du carré vert quand cet onglet est actif */
  target: number;
  tabWidth: number;
  pillX: SharedValue<number>;
  pillVisible: SharedValue<number>;
  onPress: () => void;
};

/**
 * Un onglet : deux calques d'icône (inactive / blanche) dont l'opacité suit la position du
 * carré vert. La couleur change donc au moment où le carré passe sous l'icône, pas au tap.
 */
function NavTabButton({
  tab,
  isActive,
  target,
  tabWidth,
  pillX,
  pillVisible,
  onPress,
}: NavTabButtonProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  // 1 quand le carré est centré sous l'onglet, 0 dès qu'il s'en éloigne de 60 % d'onglet.
  const coverage = (x: number, visible: number) => {
    'worklet';
    if (tabWidth === 0) return isActive ? 1 : 0;
    return (
      interpolate(Math.abs(x - target), [0, tabWidth * 0.6], [1, 0], Extrapolation.CLAMP) * visible
    );
  };
  const activeLayerStyle = useAnimatedStyle(() => ({
    opacity: coverage(pillX.value, pillVisible.value),
  }));
  const inactiveLayerStyle = useAnimatedStyle(() => ({
    opacity: 1 - coverage(pillX.value, pillVisible.value),
  }));

  return (
    <Styled.Tab
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(tab.accent ? 0.9 : motion.pressScale - 0.03, {
          duration: motion.duration.press,
          easing: motion.easing.standard,
        });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, motion.press);
      }}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View style={pressStyle}>
        {tab.accent ? (
          <Styled.AccentPill>{renderIcon(tab, theme.colors.navBarAccentIcon)}</Styled.AccentPill>
        ) : (
          <Styled.IconSlot>
            <Animated.View style={[Styled.layerStyle, inactiveLayerStyle]}>
              {renderIcon(tab, theme.colors.navBarIcon)}
            </Animated.View>
            <Animated.View style={[Styled.layerStyle, activeLayerStyle]}>
              {renderIcon(tab, theme.colors.neutral.white)}
            </Animated.View>
          </Styled.IconSlot>
        )}
      </Animated.View>
    </Styled.Tab>
  );
}

export function BottomNavBar(props: BottomNavBarProps) {
  // Hauteur de la barre au-dessus du bas : 24 px, ou la zone sûre du téléphone si elle est plus grande
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(Styled.FLOAT_BOTTOM, insets.bottom);
  const initialActive = props.activeIndex ?? props.tabs.findIndex((t) => t.isAction);
  const [activeTab, setActiveTab] = React.useState<number>(initialActive);
  // Largeur mesurée de la barre : la déduire des dimensions de la fenêtre donnait un
  // indicateur hors d'échelle dès que la fenêtre n'était pas un téléphone.
  const [width, setWidth] = React.useState(0);
  const tabWidth = width > 0 ? (width - PADDING_HORIZONTAL * 2) / props.tabs.length : 0;

  // Position du bord gauche du carré vert pour un onglet donné, centré dans celui-ci.
  const pillLeft = (index: number) =>
    PADDING_HORIZONTAL + index * tabWidth + (tabWidth - Styled.PILL_SIZE) / 2;

  const pillX = useSharedValue(0);
  const pillWidth = useSharedValue(Styled.PILL_SIZE);
  // Le carré disparaît quand l'onglet actif est l'onglet mis en avant (« + »)
  const pillVisible = useSharedValue(props.tabs[initialActive]?.accent ? 0 : 1);

  // Le carré s'étire pendant le trajet puis se rétracte : la largeur grandit autour du centre.
  const animatedPillStyle = useAnimatedStyle(() => ({
    width: pillWidth.value,
    opacity: pillVisible.value,
    transform: [
      { translateX: pillX.value - (pillWidth.value - Styled.PILL_SIZE) / 2 },
      { scale: 0.85 + 0.15 * pillVisible.value },
    ],
  }));

  const moveTo = (index: number, animate: boolean) => {
    const accent = !!props.tabs[index]?.accent;
    const target = pillLeft(index);
    if (!animate) {
      pillVisible.value = accent ? 0 : 1;
      if (!accent) pillX.value = target;
      return;
    }
    // Lu avant de lancer le fondu : la valeur lue juste après serait celle de l'animation.
    const wasHidden = pillVisible.value < 0.5;
    pillVisible.value = withTiming(accent ? 0 : 1, {
      duration: 220,
      easing: motion.easing.standard,
    });
    if (accent) return;
    // Revenir du « + » : le carré réapparaît directement sous l'onglet, sans traverser la barre.
    if (wasHidden) {
      pillX.value = target;
      return;
    }
    const distance = Math.abs(target - pillX.value) / tabWidth;
    pillWidth.value = withSequence(
      withTiming(Styled.PILL_SIZE + Math.min(distance, 3) * 10, {
        duration: 160,
        easing: motion.easing.standard,
      }),
      withSpring(Styled.PILL_SIZE, motion.glide),
    );
    pillX.value = withSpring(target, motion.glide);
  };

  // Recale l'indicateur sans animation à la mesure de la barre (montage, rotation, resize).
  // Ne dépend volontairement que de `tabWidth` : réagir à `activeTab` ferait sauter
  // l'indicateur d'un onglet à l'autre sans animation, en doublon de `handleTabPress`.
  React.useEffect(() => {
    if (tabWidth === 0) return;
    moveTo(activeTab, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabWidth]);

  // Sync avec la navigation programmatique (ex : croix sur AddScreen → Home).
  // Ne dépend que de `props.activeIndex` : c'est le changement venu de l'extérieur qui
  // déclenche l'animation, pas l'état interne qu'il met à jour.
  React.useEffect(() => {
    if (props.activeIndex === undefined || props.activeIndex === activeTab) return;
    setActiveTab(props.activeIndex);
    if (tabWidth === 0) return;
    moveTo(props.activeIndex, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activeIndex]);

  const handleTabPress = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
      moveTo(index, true);
    }
    props.onTabPress?.(index, props.tabs[index].key);
  };

  return (
    <Styled.Container style={[{ bottom: bottomOffset }, props.style]}>
      <Styled.Row onLayout={(event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width)}>
        <Styled.highlightedBar style={animatedPillStyle} />
        {props.tabs.map((tab, index) => (
          <NavTabButton
            key={tab.key}
            tab={tab}
            isActive={index === activeTab}
            target={pillLeft(index)}
            tabWidth={tabWidth}
            pillX={pillX}
            pillVisible={pillVisible}
            onPress={() => handleTabPress(index)}
          />
        ))}
      </Styled.Row>
    </Styled.Container>
  );
}
