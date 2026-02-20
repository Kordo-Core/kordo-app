import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  useDerivedValue,
  useAnimatedProps,
  cancelAnimation,
} from 'react-native-reanimated';
import { Bar, ProgressBar } from './Loader.style';
import { useEffect, useState } from 'react';
import * as Styled from './Loader.style';
import { LoaderProps } from './Loder.type';
import { Circle } from 'react-native-svg';
import { useTheme } from '@emotion/react';

export const Loader: React.FC<LoaderProps> = (props) => {
  const theme = useTheme();
  const progress = useSharedValue(props.infinite ? 0 : props.reverse ? 1 : 0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (props.infinite) {
      progress.value = withRepeat(
        withTiming(1, { duration: props.duration, easing: Easing.linear }),
        -1,
        props.type === 'bar' ? true : false,
      );
    } else {
      progress.value = withTiming(props.reverse ? 0 : 1, { duration: props.duration });
    }
    return () => {
      cancelAnimation(progress);
    };
  }, [width, props.duration, props.reverse, props.infinite]);

  const size = props.size === 'sm' ? 20 : props.size === 'md' ? 30 : 40;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;

  const barStyle = useAnimatedStyle(() => {
    if (props.infinite) {
      return {
        transform: [{ translateX: progress.value * (width - width * 0.2) }],
      };
    }
    return { transform: [{ scaleX: progress.value }], transformOrigin: 'left' };
  });

  const strokeDashoffset = useDerivedValue(() => {
    if (props.infinite) return circumference * 0.25;
    return circumference * (1 - (progress.value * size) / size);
  });

  const animatedProps = useAnimatedProps(() => {
    return { strokeDashoffset: strokeDashoffset.value };
  });

  const spinnerStyle = useAnimatedStyle(() => {
    const rotation = `${progress.value * 360}deg`;
    return { transform: [{ rotate: rotation }] };
  });

  return (
    <>
      {props.type === 'bar' && (
        <ProgressBar
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          appearance={props.appearance}
          style={props.style}
        >
          <Bar style={barStyle} infinite={props.infinite ?? false} appearance={props.appearance} />
        </ProgressBar>
      )}

      {props.type === 'spinner' && (
        <>
          <Styled.AnimatedSvg
            width={size}
            height={size}
            style={{ ...spinnerStyle, ...props.style }}
          >
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={theme.colors[props.appearance ?? 'primary'].lighter}
              strokeWidth={4}
              fillOpacity={0}
            />
            <Styled.AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={theme.colors[props.appearance ?? 'primary'].base}
              strokeWidth={4}
              strokeDasharray={`${circumference} ${circumference}`}
              animatedProps={animatedProps}
              strokeLinecap="round"
              fillOpacity={0}
            />
          </Styled.AnimatedSvg>
        </>
      )}
    </>
  );
};
