import { BottomNavBarProps } from './BottomNavBar.types';
import * as Styled from './BottomNavBar.styles';
import { Icon } from '../../atoms/Icon/Icon';
import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export function BottomNavBar(props: BottomNavBarProps) {
  const [tabs, setTabs] = React.useState(props.tabs);
  const [activeTab, setActiveTab] = React.useState<number>(tabs.findIndex((t) => t.isAction));

  const animatedX = useSharedValue(0);
  const paddingHorizontal = 16;
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.92 - paddingHorizontal * 2; // Total width minus padding
  const tabWidth = containerWidth / tabs.length;
  const barWidth = tabWidth * 0.6; // 30% of tab width
  const barOffset = (tabWidth - barWidth) / 2; // Center bar under icon

  // Initialize animation to active tab
  React.useEffect(() => {
    animatedX.value = activeTab * tabWidth + barOffset;
  }, []);

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
          <Icon name={tab.icon} size={32} color={tab.isAction ? 'primary' : 'black'} />
        </Styled.Tab>
      ))}
    </Styled.Container>
  );
}
