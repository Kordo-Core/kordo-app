import { Text, UserInfo } from 'kordo-ui';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import * as Styled from './Podium.styles';
import { PodiumProps } from './Podium.types';
import { PodiumBar } from '../PodiumBar/PodiumBar';
import { RootStackParamList } from '../../../../../../App';

// Hero de l'onglet classement : podium animé qui remonte/dézoome puis disparaît au scroll
export function Podium({ podium, scrollY, geometry }: PodiumProps) {
  const { topInset, heroHeight, phase1End } = geometry;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const podiumStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [phase1End, heroHeight * 0.95],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      // Le podium recouvre la liste : il ne capte que les touches de ses enfants (`box-none`),
      // et plus rien du tout une fois estompé, sinon il intercepterait des clics en étant
      // invisible. Le style porte `pointerEvents` pour qu'il suive l'opacité, image par image.
      pointerEvents: opacity > 0.5 ? 'box-none' : 'none',
      transform: [
        { translateY: interpolate(scrollY.value, [0, phase1End], [0, -140], Extrapolation.CLAMP) },
        {
          scale: interpolate(
            scrollY.value,
            [phase1End, heroHeight],
            [1, 0.85],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Styled.PodiumContainer style={[{ top: topInset, height: heroHeight }, podiumStyle]}>
      <Styled.Podium>
        {podium.map(({ entry, bar, delay, label }) => (
          <Styled.PodiumColumn key={entry.user.id}>
            <UserInfo
              user={entry.user}
              layout="column"
              onPressUser={(user) => navigation.push('UserProfile', { userId: user.id })}
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
