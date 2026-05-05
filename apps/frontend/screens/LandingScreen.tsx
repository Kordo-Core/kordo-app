import { Image, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon, SegmentedControl, Text, theme } from 'kordo-ui';
import { RootStackParamList } from '../App';
import React from 'react';
import { Bounce } from 'kordo-ui/src/animations/Bounce/Bounce';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log('selectedIndex', selectedIndex);
  return (
    <>
      <View style={{ height: '60%' }}>
        {/* Haut = moitié */}
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg',
          }}
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Image>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '45%',
          padding: theme.spacing.xxl,
          paddingBottom: 60,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ display: 'flex', gap: theme.spacing.md }}>
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

          <Text size={'lg'} appearance="gray">
            Join ours community, find yours mate, join or create IRL events with people from around
            the world
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            gap: theme.spacing.lg,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <SegmentedControl
            segments={[
              { text: 'Sign up' },
              { text: 'Sign in', color: theme.colors.secondary.base },
            ]}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />

          <Bounce
            onPress={() =>
              selectedIndex === 0 ? navigation.navigate('Login') : navigation.navigate('Login')
            }
          >
            <Icon
              name="ArrowCircleUpRegular"
              size={theme.iconSizes.xl}
              color={selectedIndex === 0 ? 'primary' : 'secondary'}
            />
          </Bounce>
        </View>

        {/* <Button title="Se connecter" onPress={() => navigation.navigate('Login')} /> */}
      </View>
    </>
  );
}
