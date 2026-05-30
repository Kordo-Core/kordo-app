import { BottomNavBarProps } from './BottomNavBar.types';
import * as Styled from './BottomNavBar.styles';
import { Icon } from '../../atoms/Icon/Icon';
import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { getColor } from '../../../utils/getColors';

export function BottomNavBar(props: BottomNavBarProps) {
  const [tabs, setTabs] = React.useState(props.tabs);
  const [activeTab, setActiveTab] = React.useState<number>(tabs.findIndex((t) => t.isAction));

  const paddingHorizontal = 16;
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.92 - paddingHorizontal * 2;
  const tabWidth = containerWidth / tabs.length;
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

  const handleTabPress = (index: number) => {
    const newTabs = tabs.map((t) => ({ ...t, isAction: false }));
    newTabs[index].isAction = true;
    setTabs(newTabs);
    setActiveTab(index);

    // Smooth animation - calculate absolute position including padding
    animatedX.value = withTiming(paddingHorizontal + index * tabWidth + barOffset, {
      duration: 300,
    });

    // Call onTabPress callback if provided
    if (props.onTabPress) {
      props.onTabPress(index, tabs[index].key);
    }
  };

  return (
    <Styled.Container style={props.style}>
      <Styled.highlightedBar style={animatedBarStyle} />
      {tabs.map((tab, index) => (
        <Styled.Tab
          key={tab.key}
          isAction={tab.isAction}
          onPress={() => handleTabPress(index)}
          activeOpacity={1}
        >
          <Icon name={tab.icon} size={32} color={tab.isAction ? getColor('primary') : getColor('black')} />
        </Styled.Tab>
      ))}
    </Styled.Container>
  );
}
