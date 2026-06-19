import { BottomNavBarProps } from './BottomNavBar.types';
import * as Styled from './BottomNavBar.styles';
import { Icon } from '../../atoms/Icon/Icon';
import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { getColor } from '../../../utils/getColors';

export function BottomNavBar(props: BottomNavBarProps) {
  const initialActive = props.activeIndex ?? props.tabs.findIndex((t) => t.isAction);
  const [activeTab, setActiveTab] = React.useState<number>(initialActive);

  const paddingHorizontal = 16;
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.92 - paddingHorizontal * 2;
  const tabWidth = containerWidth / props.tabs.length;
  const barWidth = tabWidth * 0.6;
  const barOffset = (tabWidth - barWidth) / 2;

  const animatedX = useSharedValue(paddingHorizontal + activeTab * tabWidth + barOffset);

  const animatedBarStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: animatedX.value }],
      width: barWidth,
    }),
    [barWidth],
  );

  // Sync avec la navigation programmatique (ex : croix sur AddScreen → Home)
  React.useEffect(() => {
    if (props.activeIndex === undefined || props.activeIndex === activeTab) return;
    setActiveTab(props.activeIndex);
    animatedX.value = withTiming(paddingHorizontal + props.activeIndex * tabWidth + barOffset, {
      duration: 300,
    });
  }, [props.activeIndex]);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    animatedX.value = withTiming(paddingHorizontal + index * tabWidth + barOffset, {
      duration: 300,
    });
    props.onTabPress?.(index, props.tabs[index].key);
  };

  return (
    <Styled.Container style={props.style}>
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
