import { memo, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { BoulderBadge, Icon, ListRow, Text } from 'kordo-ui';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import * as Styled from './BlocSwipeRow.styles';
import { BlocSwipeRowProps } from './BlocSwipeRow.types';

// Promotion en texture GPU : la vue est dessinée une fois puis simplement déplacée par le
// GPU pendant le slide (sinon Android/iOS redessinent tout le sous-arbre à chaque frame).
const RASTERIZE = { renderToHardwareTextureAndroid: true, shouldRasterizeIOS: true } as const;

// Ligne de bloc swipable : son offset vit DANS la ligne (donc il scrolle avec la liste,
// persiste et n'a pas de top fixe à l'écran). Pendant le drag elle suit `activeDragX`
// (UI thread, pas de re-render) ; au repos elle lit `restOffsets[id]`.
// memo : la ligne ne dépend que de son id/detail/status (les shared values sont stables),
// donc elle ne re-rend pas quand BlocsTab se re-rend (scroll carte, mesures…).
export const BlocSwipeRow = memo(function BlocSwipeRow(props: BlocSwipeRowProps) {
  const theme = useTheme();
  // Offset PROPRE de la ligne (initialisé depuis l'état persistant pour survivre à la
  // virtualisation). Pendant le drag elle suit `activeDragX` ; sinon elle suit son offset,
  // qui anime indépendamment → une animation en cours n'est pas annulée par un autre swipe.
  // NB : init via un getter JS (pas de lecture de shared value pendant le render).
  const offset = useSharedValue(props.getInitialOffset(props.id));
  useEffect(() => {
    props.register(props.id, offset);
    return () => props.unregister(props.id);
  }, [props.id, props.register, props.unregister, offset]);

  const foregroundStyle = useAnimatedStyle(() => {
    const tx = props.activeId.value === props.id ? props.activeDragX.value : offset.value;
    return { transform: [{ translateX: tx }] };
  });
  const greenStyle = useAnimatedStyle(() => {
    const tx = props.activeId.value === props.id ? props.activeDragX.value : offset.value;
    return { opacity: tx > 0 ? 1 : 0 };
  });
  const redStyle = useAnimatedStyle(() => {
    const tx = props.activeId.value === props.id ? props.activeDragX.value : offset.value;
    return { opacity: tx < 0 ? 1 : 0 };
  });

  return (
    <Styled.BlocRow onLayout={(e) => props.onRowLayout(props.id, e.nativeEvent.layout.height)}>
      <Animated.View
        pointerEvents="none"
        {...RASTERIZE}
        style={[
          StyleSheet.absoluteFill,
          greenStyle,
          { backgroundColor: theme.colors.success.base },
        ]}
      >
        <Styled.BlocActionIconLeft>
          <Icon name="CheckmarkFilled" size="md" color={theme.colors.neutral.white} />
        </Styled.BlocActionIconLeft>
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        {...RASTERIZE}
        style={[StyleSheet.absoluteFill, redStyle, { backgroundColor: theme.colors.error.base }]}
      >
        <Styled.BlocActionIconRight>
          <Icon name="DismissFilled" size="md" color={theme.colors.neutral.white} />
        </Styled.BlocActionIconRight>
      </Animated.View>
      <Styled.BlocForeground pointerEvents="none" {...RASTERIZE} style={foregroundStyle}>
        <ListRow
          left={
            <BoulderBadge avatarUrl={props.detail.bloc.blocUrl} grade={props.detail.bloc.grade} />
          }
          primaryText={
            <Text size="lg" bold appearance={props.status === 'validated' ? 'success' : undefined}>
              {props.detail.bloc.name}
            </Text>
          }
          secondaryText={
            <Text appearance="primary" size="sm">
              <Text size="sm" appearance="gray">
                par{' '}
              </Text>
              {props.detail.setter?.firstName}
            </Text>
          }
          right={
            props.status === 'validated' ? (
              <Icon name="CheckmarkCircleFilled" size="md" color={theme.colors.success.base} />
            ) : (
              <Text size="lg" bold appearance="gray">
                {props.detail.bloc.points}pts
              </Text>
            )
          }
        />
      </Styled.BlocForeground>
    </Styled.BlocRow>
  );
});
