import { BottomNavBarProps } from './BottomNavBar.types';
import * as Styled from './BottomNavBar.styles';
import { Icon } from '../../atoms/Icon/Icon';
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { useTheme } from '@emotion/react';

// Padding horizontal de la barre, à retirer de sa largeur pour obtenir la zone des onglets.
const PADDING_HORIZONTAL = 8;

export function BottomNavBar(props: BottomNavBarProps) {
  const theme = useTheme();
  const initialActive = props.activeIndex ?? props.tabs.findIndex((t) => t.isAction);
  const [activeTab, setActiveTab] = React.useState<number>(initialActive);
  // Largeur mesurée de la barre : la déduire des dimensions de la fenêtre donnait un
  // indicateur hors d'échelle dès que la fenêtre n'était pas un téléphone.
  const [width, setWidth] = React.useState(0);
  const tabWidth = width > 0 ? (width - PADDING_HORIZONTAL * 2) / props.tabs.length : 0;

  // Position du bord gauche du carré vert pour un onglet donné, centré dans celui-ci.
  const pillLeft = (index: number) =>
    PADDING_HORIZONTAL + index * tabWidth + (tabWidth - Styled.PILL_SIZE) / 2;

  const animatedX = useSharedValue(0);
  // Le carré disparaît quand l'onglet actif est l'onglet mis en avant (« + »)
  const pillOpacity = useSharedValue(props.tabs[initialActive]?.accent ? 0 : 1);
  const animatedPillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedX.value }],
    opacity: pillOpacity.value,
  }));

  const moveTo = (index: number, animate: boolean) => {
    const accent = !!props.tabs[index]?.accent;
    pillOpacity.value = animate ? withTiming(accent ? 0 : 1, { duration: 200 }) : accent ? 0 : 1;
    if (accent) return;
    animatedX.value = animate
      ? withSpring(pillLeft(index), { damping: 16, stiffness: 180 })
      : pillLeft(index);
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
    setActiveTab(index);
    moveTo(index, true);
    props.onTabPress?.(index, props.tabs[index].key);
  };

  return (
    <Styled.Container
      style={props.style}
      onLayout={(event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width)}
    >
      <Styled.highlightedBar style={animatedPillStyle} />
      {props.tabs.map((tab, index) => {
        const isActive = index === activeTab;
        const color = tab.accent
          ? '#13201B'
          : isActive
            ? theme.colors.neutral.white
            : theme.colors.navBarIcon;
        const TabIcon = tab.icon;
        const icon =
          typeof TabIcon === 'string' ? (
            <Icon name={TabIcon} size={24} color={color} />
          ) : (
            <TabIcon size={24} color={color} />
          );

        return (
          <Styled.Tab
            key={tab.key}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            {tab.accent ? <Styled.AccentPill>{icon}</Styled.AccentPill> : icon}
          </Styled.Tab>
        );
      })}
    </Styled.Container>
  );
}
