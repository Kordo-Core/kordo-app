import { useState } from 'react';
import { ListRow } from '../../layouts/ListRow/ListRow';
import { HeaderProps } from './Header.types';
import * as Styled from './Header.styles';
import { useEffect, useRef } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const Header: React.FC<HeaderProps & { scrollY?: number }> = (props) => {
  const [height, setHeight] = useState(0); // hauteur du header récupérée dynamiquement
  const translateY = useSharedValue(0);
  const lastY = useRef(0);

  const UP_THRESHOLD = 80;
  const DOWN_THRESHOLD = 30;
  const FORCE_SHOW_SCROLL = 100;

  useEffect(() => {
    if (props.scrollY === undefined || height === 0) return;

    const diffY = props.scrollY - lastY.current;

    if (props.scrollY < FORCE_SHOW_SCROLL) {
      translateY.value = withTiming(0, { duration: 200 });
    } else if (diffY > 0 && diffY >= DOWN_THRESHOLD) {
      translateY.value = withTiming(-height, { duration: 200 }); // utiliser la hauteur dynamique
    } else if (diffY < 0 && Math.abs(diffY) >= UP_THRESHOLD) {
      translateY.value = withTiming(0, { duration: 200 });
    }

    lastY.current = props.scrollY;
  }, [props.scrollY, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Styled.Header
      style={props.smart ? animatedStyle : undefined}
      onLayout={(event) => {
        setHeight(event.nativeEvent.layout.height);
      }} // récupère la hauteur réelle
    >
      <ListRow {...props} />
    </Styled.Header>
  );
};
