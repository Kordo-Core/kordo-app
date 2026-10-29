import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Icon, SegmentedControl, Text } from 'kordo-ui';
import React from 'react';
import { Bounce } from 'kordo-ui/src/animations/Bounce/Bounce';
import * as Styled from './LandingScreen.styles';
import { RootStackParamList } from 'App';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
      <Styled.ImageContainer>
        <Styled.Img
          source={{
            uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg',
          }}
        />
      </Styled.ImageContainer>

      <Styled.Card>
        <Styled.Header>
          <Text size={42}>
            Hey,{' '}
            <Text size={42} appearance="primary" extraBold>
              Welcome{' '}
            </Text>
            to{' '}
            <Text size={42} appearance="secondary" extraBold>
              Kordo{' '}
            </Text>
          </Text>

          <Text size="lg" appearance="gray">
            Join ours community, find yours mate, join or create IRL events with people from around
            the world
          </Text>
        </Styled.Header>

        <Styled.Actions>
          <SegmentedControl
            segments={[
              { text: 'Sign up' },
              { text: 'Sign in', color: theme.colors.secondary.base },
            ]}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />

          <Bounce onPress={() => navigation.navigate('Login')}>
            <Icon
              name="ArrowCircleUpRegular"
              size={46}
              color={selectedIndex === 0 ? theme.colors.primary.base : theme.colors.secondary.base}
            />
          </Bounce>
        </Styled.Actions>
      </Styled.Card>
    </>
  );
}
