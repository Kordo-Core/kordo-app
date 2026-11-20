import { memo, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { Icon, ListRow, Text } from 'kordo-ui';
import { Image, StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import * as Styled from './BlocSwipeRow.styles';
import { BlocSwipeRowProps } from './BlocSwipeRow.types';
import { getTopCount } from '../../../../../../fake_data';

// Promotion en texture GPU : la vue est dessinée une fois puis simplement déplacée par le
// GPU pendant le slide (sinon Android/iOS redessinent tout le sous-arbre à chaque frame).
// Paliers de cotation : grades 1 à 30 par tranches de 5, une couleur par tranche
const TIER_COLORS = ['yellow', 'green', 'blue', 'red', 'black', 'purple'] as const;
const tierOf = (grade: number) => Math.max(0, Math.min(Math.floor((grade - 1) / 5), 5));

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
    <GestureDetector gesture={props.gesture} touchAction="pan-y">
      <Styled.BlocRow>
        <Styled.Card>
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
            style={[
              StyleSheet.absoluteFill,
              redStyle,
              { backgroundColor: theme.colors.error.base },
            ]}
          >
            <Styled.BlocActionIconRight>
              <Icon name="DismissFilled" size="md" color={theme.colors.neutral.white} />
            </Styled.BlocActionIconRight>
          </Animated.View>
          <Styled.BlocForeground pointerEvents="none" {...RASTERIZE} style={foregroundStyle}>
            <ListRow
              left={
                // Photo carrée cerclée de la couleur du palier de cotation (design D)
                <Image
                  source={{ uri: props.detail.bloc.blocUrl }}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 6,
                    borderWidth: 2.5,
                    borderColor:
                      theme.colors.boulderGrade[TIER_COLORS[tierOf(props.detail.bloc.grade)]],
                  }}
                />
              }
              primaryText={
                <Text
                  size="md"
                  bold
                  appearance={props.status === 'validated' ? 'success' : undefined}
                >
                  {props.detail.bloc.name}
                </Text>
              }
              secondaryText={
                <Text appearance="primary" size="sm">
                  <Text size="sm" appearance="gray">
                    par{' '}
                  </Text>
                  {props.detail.setter?.firstName}
                  <Text size="sm" appearance="gray">
                    {' '}
                    · {getTopCount(props.detail.bloc.id)} tops
                  </Text>
                </Text>
              }
              right={
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text size="sm" extraBold appearance="gray">
                    {props.detail.bloc.points} pts
                  </Text>
                  {/* Case de validation : pleine quand le bloc est validé (glisser à droite) */}
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: props.status === 'validated' ? 0 : 1.5,
                      borderColor: theme.colors.border,
                      backgroundColor:
                        props.status === 'validated' ? theme.colors.success.base : 'transparent',
                    }}
                  >
                    <Icon
                      name="CheckmarkRegular"
                      size={16}
                      color={
                        props.status === 'validated'
                          ? theme.colors.neutral.white
                          : theme.colors.text
                      }
                    />
                  </View>
                </View>
              }
            />
          </Styled.BlocForeground>
        </Styled.Card>
      </Styled.BlocRow>
    </GestureDetector>
  );
});
