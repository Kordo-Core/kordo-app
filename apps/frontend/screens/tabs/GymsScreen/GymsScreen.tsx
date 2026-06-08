import { useState } from 'react';
import { View, ScrollView, useWindowDimensions, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Styled from './GymsScreen.styles';
import { Button, Card, Icon, Slider, Tag, Text, theme } from 'kordo-ui';
import { GymCardStack } from './GymCardStack';
import { BlurView } from 'expo-blur';
import { FAVORITE_GYMS, POPULAR_GYMS, RECENTLY_VISITED } from '../../../fake_data/gyms.fake';
import { RootStackParamList } from '../../../App';

const IMAGE_FRACTION = 0.25;
const CARD_FRACTION = 0.75;

const CATEGORIES = [
  {
    label: 'Ranked',
    icon: 'TrophyRegular',
    light: theme.colors.primary.lighter,
    base: theme.colors.primary.base,
  },
  {
    label: 'New',
    icon: 'StarRegular',
    light: theme.colors.secondary.lighter,
    base: theme.colors.secondary.base,
  },
  {
    label: 'Bloc',
    icon: 'terrain',
    light: theme.colors.primary.lighter,
    base: theme.colors.primary.base,
  },
  {
    label: 'Lead',
    icon: 'carabiner',
    light: theme.colors.secondary.lighter,
    base: theme.colors.secondary.base,
  },
] as const;

export default function GymsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [likedGyms, setLikedGyms] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleLike = (gymId: string) =>
    setLikedGyms((prev) => {
      const next = new Set(prev);
      next.has(gymId) ? next.delete(gymId) : next.add(gymId);
      return next;
    });

  const { width, height } = useWindowDimensions();
  const imageHeight = height * IMAGE_FRACTION;
  const cardMinHeight = height * CARD_FRACTION;
  const gridItemWidth = (width - theme.spacing.xl * 2 - theme.spacing.lg) / 2;
  const cardWidth = width - theme.spacing.xl * 2;
  const rowItemWidth = (width - theme.spacing.xl * 2 - theme.spacing.lg * 3) / 4;
  const sliderCardWidth = (Dimensions.get('window').width * 60) / 100;

  return (
    <View style={{ flex: 1 }}>
      <Styled.ImageContainer style={{ height: imageHeight }}>
        <Styled.Img source={{ uri: RECENTLY_VISITED[0].gym.imageUri }} />
      </Styled.ImageContainer>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: imageHeight }}
        showsVerticalScrollIndicator={false}
      >
        <Styled.Card style={{ minHeight: cardMinHeight }}>
          {/* Dernières salles visitées */}
          <View
            style={{
              width: '100%',
              padding: theme.spacing.xl,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.primary.lightest,
            }}
          >
            <Text bold size="lg">
              Dernières salles visitées
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.lg }}>
              {RECENTLY_VISITED.map(({ gym, lastVisitLabel }) => (
                <Card
                  key={gym.id}
                  style={{
                    width: gridItemWidth,
                    height: gridItemWidth,
                    borderRadius: theme.borderRadius.square,
                    justifyContent: 'space-between',
                  }}
                >
                  <ImageBackground
                    source={{ uri: gym.imageUri }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    imageStyle={{ borderRadius: theme.borderRadius.square }}
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'transparent']}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '40%',
                      borderTopLeftRadius: theme.borderRadius.square,
                      borderTopRightRadius: theme.borderRadius.square,
                    }}
                  />
                  <View style={{ gap: theme.spacing.sm }}>
                    <Text appearance="white" bold size="lg" style={{ width: '85%' }}>
                      {gym.name}
                    </Text>
                    <Tag title={lastVisitLabel} appearance="secondary" icon={{ name: 'clock' }} />
                  </View>
                  <Button
                    icon={{ name: 'ArrowRightFilled', size: 'sm' }}
                    appearance="black"
                    inverted
                    borderless
                    borderRadius="rounded"
                    style={{ alignSelf: 'flex-end' }}
                    onPress={() => navigation.navigate('Gym', { gymId: gym.id })}
                  />
                </Card>
              ))}
              <View
                style={{
                  width: gridItemWidth,
                  height: gridItemWidth,
                  borderRadius: theme.borderRadius.square,
                }}
              >
                <Text bold size="md" appearance="gray">
                  Pensez à mettre à jour les blocs réussi lors de vos séances afin de grimper plus
                  haut dans le classement !
                </Text>
              </View>
            </View>
          </View>

          {/* Vos salles favorites */}
          <View
            style={{
              width: '100%',
              backgroundColor: theme.colors.secondary.lightest,
              padding: theme.spacing.xl,
              gap: theme.spacing.lg - 8,
              paddingBottom: theme.spacing.xl - 8,
            }}
          >
            <Text bold size="lg">
              Vos salles favorites
            </Text>
            <View style={{ width: Dimensions.get('window').width, marginLeft: -theme.spacing.xl }}>
              <Slider selectMode height={320} gap={theme.spacing.lg}>
                {FAVORITE_GYMS.map((gym) => (
                  <Card
                    key={gym.id}
                    style={{
                      width: sliderCardWidth,
                      height: 320,
                      borderRadius: theme.borderRadius.square,
                      backgroundColor: theme.colors.neutral.gray.base,
                      justifyContent: 'space-between',
                    }}
                  >
                    <ImageBackground
                      source={{ uri: gym.imageUri }}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.7)']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        borderBottomLeftRadius: theme.borderRadius.square,
                        borderBottomRightRadius: theme.borderRadius.square,
                      }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <BlurView
                        intensity={20}
                        tint="dark"
                        style={{
                          padding: theme.spacing.sm,
                          borderWidth: 1,
                          borderColor: 'rgba(255, 255, 255, 0.57)',
                          borderRadius: theme.borderRadius.rounded,
                          overflow: 'hidden',
                        }}
                      >
                        <Icon
                          name={likedGyms.has(gym.id) ? 'HeartFilled' : 'heart'}
                          size="md"
                          color={likedGyms.has(gym.id) ? 'red' : 'white'}
                          onPress={() => toggleLike(gym.id)}
                        />
                      </BlurView>
                    </View>
                    <View style={{ gap: theme.spacing.sm }}>
                      <Tag title={gym.shortName} appearance="primary" />
                      <BlurView
                        intensity={60}
                        tint="default"
                        style={{
                          borderRadius: theme.borderRadius.square,
                          overflow: 'hidden',
                          padding: theme.spacing.sm,
                        }}
                      >
                        <View>
                          <Text appearance="white" extraBold size="xl">
                            {gym.name}
                          </Text>
                          <Text appearance="white" bold size="md">
                            {gym.description}
                          </Text>
                        </View>
                      </BlurView>
                    </View>
                  </Card>
                ))}
              </Slider>
            </View>
          </View>

          {/* Les salles populaires */}
          <View
            style={{
              width: '100%',
              padding: theme.spacing.xl,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.primary.lightest,
            }}
          >
            <Text bold size="lg">
              Les salles populaires
            </Text>
            <GymCardStack cardWidth={cardWidth} gyms={POPULAR_GYMS} />
          </View>

          {/* Catégories */}
          <View
            style={{
              width: '100%',
              padding: theme.spacing.xl,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.secondary.lightest,
            }}
          >
            <Text bold size="lg">
              Catégories
            </Text>
            <View style={{ flexDirection: 'row', gap: theme.spacing.lg }}>
              {CATEGORIES.map(({ label, icon, light, base }) => {
                const selected = selectedCategory === label;
                return (
                  <View key={label}>
                    <Card
                      isPressable
                      onPress={() => setSelectedCategory(selected ? null : label)}
                      style={{
                        width: rowItemWidth,
                        height: rowItemWidth,
                        borderRadius: theme.borderRadius.square,
                        backgroundColor: selected ? base : light,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon name={icon} size={40} color={theme.colors.neutral.white} />
                    </Card>
                    <Text
                      bold
                      size="md"
                      appearance="gray"
                      style={{ marginTop: theme.spacing.sm, alignSelf: 'center' }}
                    >
                      {label}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={{ width: Dimensions.get('window').width, marginLeft: -theme.spacing.xl }}>
              <Slider height={320} gap={theme.spacing.lg}>
                {POPULAR_GYMS.slice(0, 4).map((gym) => (
                  <Card
                    key={gym.id}
                    style={{
                      width: sliderCardWidth,
                      height: 320,
                      borderRadius: theme.borderRadius.square,
                      backgroundColor: theme.colors.neutral.gray.base,
                      justifyContent: 'space-between',
                    }}
                  >
                    <ImageBackground
                      source={{ uri: gym.imageUri }}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.7)']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        borderBottomLeftRadius: theme.borderRadius.square,
                        borderBottomRightRadius: theme.borderRadius.square,
                      }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <BlurView
                        intensity={20}
                        tint="dark"
                        style={{
                          padding: theme.spacing.sm,
                          borderWidth: 1,
                          borderColor: 'rgba(255, 255, 255, 0.57)',
                          borderRadius: theme.borderRadius.rounded,
                          overflow: 'hidden',
                        }}
                      >
                        <Icon
                          name={likedGyms.has(gym.id) ? 'HeartFilled' : 'heart'}
                          size="md"
                          color={likedGyms.has(gym.id) ? 'red' : 'white'}
                          onPress={() => toggleLike(gym.id)}
                        />
                      </BlurView>
                    </View>
                    <View style={{ gap: theme.spacing.sm }}>
                      <Tag title={gym.shortName} appearance="primary" />
                      <BlurView
                        intensity={60}
                        tint="default"
                        style={{
                          borderRadius: theme.borderRadius.square,
                          overflow: 'hidden',
                          padding: theme.spacing.sm,
                        }}
                      >
                        <View>
                          <Text appearance="white" extraBold size="xl">
                            {gym.name}
                          </Text>
                          <Text appearance="white" bold size="md">
                            {gym.description}
                          </Text>
                        </View>
                      </BlurView>
                    </View>
                  </Card>
                ))}
              </Slider>
            </View>
          </View>

          {/* Les Salles */}
          <View
            style={{
              width: '100%',
              padding: theme.spacing.xl,
              paddingBottom: 110,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.primary.lightest,
            }}
          >
            <Text bold size="lg">
              Les Salles
            </Text>
            {(() => {
              const cardSize = width * 0.35;
              const overlap = (4 * cardSize - cardWidth) / 3;
              const step = cardSize - overlap - theme.spacing.lg / 1.5;
              return (
                <View style={{ height: cardSize * 1.15, position: 'relative' }}>
                  {(
                    [
                      { rotate: '-14deg', color: theme.colors.neutral.gray.light, z: 1 },
                      { rotate: '+9deg', color: theme.colors.neutral.gray.base, z: 2 },
                      { rotate: '-3deg', color: theme.colors.neutral.white, z: 4 },
                      { rotate: '+19deg', color: '#C8C8C8', z: 3 },
                    ] as const
                  ).map((card, i) => (
                    <Card
                      key={i}
                      style={{
                        position: 'absolute',
                        width: cardSize,
                        height: cardSize,
                        backgroundColor: card.color,
                        borderRadius: theme.borderRadius.square,
                        top: 0,
                        left: theme.spacing.lg + i * step,
                        zIndex: card.z,
                        transform: [{ rotate: card.rotate }],
                      }}
                    >
                      <ImageBackground
                        source={{ uri: POPULAR_GYMS[i].imageUri }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        imageStyle={{ borderRadius: theme.borderRadius.square }}
                      />
                    </Card>
                  ))}
                </View>
              );
            })()}
            <Text size="md" appearance="gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <Button
              appearance="primary"
              title="Voir tout"
              onPress={() => {
                navigation.navigate('AllGyms');
              }}
            />
          </View>
        </Styled.Card>
      </ScrollView>
    </View>
  );
}
