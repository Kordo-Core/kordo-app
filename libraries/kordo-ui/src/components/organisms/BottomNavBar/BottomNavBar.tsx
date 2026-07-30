import { BottomNavBarProps } from './BottomNavBar.types';
import * as Styled from './BottomNavBar.styles';
import { Icon } from '../../atoms/Icon/Icon';
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { getColor } from '../../../utils/getColors';

// Padding horizontal de la barre, à retirer de sa largeur pour obtenir la zone des onglets.
const PADDING_HORIZONTAL = 16;
// Part de la largeur d'un onglet occupée par l'indicateur.
const BAR_RATIO = 0.6;

export function BottomNavBar(props: BottomNavBarProps) {
  const initialActive = props.activeIndex ?? props.tabs.findIndex((t) => t.isAction);
  const [activeTab, setActiveTab] = React.useState<number>(initialActive);
  // Largeur mesurée de la barre. Elle vaut 92 % de l'écran : la déduire des dimensions de la
  // fenêtre donnait un indicateur hors d'échelle dès que la fenêtre n'était pas un téléphone.
  const [width, setWidth] = React.useState(0);

  const tabWidth = width > 0 ? (width - PADDING_HORIZONTAL * 2) / props.tabs.length : 0;
  const barWidth = tabWidth * BAR_RATIO;
  // Position du bord gauche de l'indicateur pour un onglet donné, centré dans celui-ci.
  const barLeft = (index: number) =>
    PADDING_HORIZONTAL + index * tabWidth + (tabWidth - barWidth) / 2;

  const animatedX = useSharedValue(0);

  const animatedBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedX.value }],
    width: barWidth,
  }));

  // Recale l'indicateur sans animation à la mesure de la barre (montage, rotation, resize).
  // Ne dépend volontairement que de `tabWidth` : réagir à `activeTab` ferait sauter
  // l'indicateur d'un onglet à l'autre sans animation, en doublon de `handleTabPress`.
  React.useEffect(() => {
    if (tabWidth === 0) return;
    animatedX.value = barLeft(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabWidth]);

  // Sync avec la navigation programmatique (ex : croix sur AddScreen → Home).
  // Ne dépend que de `props.activeIndex` : c'est le changement venu de l'extérieur qui
  // déclenche l'animation, pas l'état interne qu'il met à jour.
  React.useEffect(() => {
    if (props.activeIndex === undefined || props.activeIndex === activeTab) return;
    setActiveTab(props.activeIndex);
    if (tabWidth === 0) return;
    animatedX.value = withTiming(barLeft(props.activeIndex), { duration: 300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activeIndex]);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    animatedX.value = withTiming(barLeft(index), { duration: 300 });
    props.onTabPress?.(index, props.tabs[index].key);
  };

  return (
    <Styled.Container
      style={props.style}
      onLayout={(event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width)}
    >
      <Styled.highlightedBar style={animatedBarStyle} />
      {props.tabs.map((tab, index) => {
        const isActive = index === activeTab;
        const color = isActive ? getColor('primary') : getColor('black');
        const TabIcon = tab.icon;
        return (
          <Styled.Tab
            key={tab.key}
            isAction={isActive}
            onPress={() => handleTabPress(index)}
            activeOpacity={1}
          >
            {typeof TabIcon === 'string' ? (
              <Icon name={TabIcon} size={32} color={color} />
            ) : (
              <TabIcon size={32} color={color} />
            )}
          </Styled.Tab>
        );
      })}
    </Styled.Container>
  );
}
