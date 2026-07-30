import { Text, UserInfo } from 'kordo-ui';
import { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import * as Styled from './Podium.styles';
import { PodiumProps } from './Podium.types';
import { PodiumBar } from '../PodiumBar/PodiumBar';

// Hero de l'onglet classement : podium animé qui remonte/dézoome puis disparaît au scroll
export function Podium({ podium, scrollY, geometry }: PodiumProps) {
  const { topInset, heroHeight, phase1End } = geometry;

  const podiumStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [phase1End, heroHeight * 0.95],
      [1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      { translateY: interpolate(scrollY.value, [0, phase1End], [0, -140], Extrapolation.CLAMP) },
      {
        scale: interpolate(scrollY.value, [phase1End, heroHeight], [1, 0.85], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <Styled.PodiumContainer
      pointerEvents="none"
      style={[{ top: topInset, height: heroHeight }, podiumStyle]}
    >
      <Styled.Podium>
        {podium.map(({ entry, bar, delay, label }) => (
          <Styled.PodiumColumn key={entry.user.id}>
            <UserInfo
              user={entry.user}
              layout="column"
              onPressUser={() => {}}
              primaryText={
                <Text size="md" bold>
                  {entry.user.firstName}
                </Text>
              }
              tertiaryText={
                <Text appearance="gray" bold>
                  {entry.totalPoints} pts
                </Text>
              }
            />
            <PodiumBar height={bar} delay={delay} scrollY={scrollY} shrinkEnd={phase1End}>
              <Text appearance="white" size="lg" extraBold>
                {label}
              </Text>
            </PodiumBar>
          </Styled.PodiumColumn>
        ))}
      </Styled.Podium>
    </Styled.PodiumContainer>
  );
}
