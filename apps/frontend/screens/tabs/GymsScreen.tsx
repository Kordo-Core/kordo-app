import {
  View,
  ScrollView,
  useWindowDimensions,
  Dimensions,
  ImageBackground,
} from 'react-native';
import * as Styled from './GymsScreen.styles';
import { Button, Card, Slider, Text, theme } from 'kordo-ui';
import { GymCardStack } from './GymCardStack';

const IMAGE_FRACTION = 0.25;
const CARD_FRACTION = 0.75;

const GYM_IMG = {
  uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg',
};


export default function GymsScreen() {
  const { width, height } = useWindowDimensions();
  const imageHeight = height * IMAGE_FRACTION;
  const cardMinHeight = height * CARD_FRACTION;
  const gridItemWidth = (width - theme.spacing.xl * 2 - theme.spacing.lg) / 2;
  const cardWidth = width - theme.spacing.xl * 2;
  const rowItemWidth = (width - theme.spacing.xl * 2 - theme.spacing.lg * 3) / 4;

  return (
    <View style={{ flex: 1 }}>
      <Styled.ImageContainer style={{ height: imageHeight }}>
        <Styled.Img
          source={{
            uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1776866438/mark-mcgregor-Ns8trMR4Om8-unsplash_qodikf.jpg',
          }}
        />
      </Styled.ImageContainer>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: imageHeight }}
        showsVerticalScrollIndicator={false}
      >
        <Styled.Card style={{ minHeight: cardMinHeight }}>
          <View
            style={{
              width: '100%',
              padding: theme.spacing.xl,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.primary.lightest,
            }}
          >
            <Text bold size={'lg'}>
              Dernières salles visitées
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing.lg,
              }}
            >
              <Card
                style={{
                  width: gridItemWidth,
                  height: gridItemWidth,
                  borderRadius: theme.borderRadius.square,
                  backgroundColor: theme.colors.neutral.gray.light,
                }}
                >
                  <ImageBackground
                    source={GYM_IMG}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    imageStyle={{ borderRadius: theme.borderRadius.square }}
                  />
                </Card>
              <Card
                style={{
                  width: gridItemWidth,
                  height: gridItemWidth,
                  borderRadius: theme.borderRadius.square,
                  backgroundColor: theme.colors.neutral.gray.light,
                }}
                >
                  <ImageBackground
                    source={GYM_IMG}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    imageStyle={{ borderRadius: theme.borderRadius.square }}
                  />
                </Card>
              <Card
                style={{
                  width: gridItemWidth,
                  height: gridItemWidth,
                  borderRadius: theme.borderRadius.square,
                  backgroundColor: theme.colors.neutral.gray.light,
                }}
                >
                  <ImageBackground
                    source={GYM_IMG}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    imageStyle={{ borderRadius: theme.borderRadius.square }}
                  />
                </Card>
              <View
                style={{
                  width: gridItemWidth,
                  height: gridItemWidth,
                  borderRadius: theme.borderRadius.square,
                }}
              >
                <Text bold size={'md'} appearance="gray">
                  Pensez à mettre à jour les blocs réussi lors de vos séances afin de grimper plus
                  haut dans le classement !
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              paddingBlock: theme.spacing.xl,
              backgroundColor: theme.colors.secondary.lightest,
              padding: theme.spacing.xl,
              gap: theme.spacing.lg - 8,
              paddingBottom: theme.spacing.xl - 8,
            }}
          >
            <Text bold size={'lg'}>
              Vos salles favorites
            </Text>
            <View
              style={{
                width: Dimensions.get('window').width,
                marginLeft: -theme.spacing.xl,
              }}
            >
              <Slider height={340} gap={theme.spacing.lg}>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 340,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 340,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 340,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 340,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
              </Slider>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              paddingBlock: theme.spacing.xl,
              padding: theme.spacing.xl,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.primary.lightest,
            }}
          >
            <Text bold size={'lg'}>
              Les salles populaires
            </Text>
            <GymCardStack cardWidth={cardWidth} count={10} />
          </View>
          <View
            style={{
              width: '100%',
              paddingBlock: theme.spacing.xl,
              padding: theme.spacing.xl,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.secondary.lightest,
            }}
          >
            <Text bold size={'lg'}>
              Catégories
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: theme.spacing.lg,
              }}
            >
              <View>
                <Card
                  style={{
                    width: rowItemWidth,
                    height: rowItemWidth,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Text
                  bold
                  size={'md'}
                  appearance="gray"
                  style={{ marginTop: theme.spacing.sm, alignSelf: 'center' }}
                >
                  Ranked
                </Text>
              </View>
              <View>
                <Card
                  style={{
                    width: rowItemWidth,
                    height: rowItemWidth,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Text
                  bold
                  size={'md'}
                  appearance="gray"
                  style={{ marginTop: theme.spacing.sm, alignSelf: 'center' }}
                >
                  New
                </Text>
              </View>
              <View>
                <Card
                  style={{
                    width: rowItemWidth,
                    height: rowItemWidth,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Text
                  bold
                  size={'md'}
                  appearance="gray"
                  style={{ marginTop: theme.spacing.sm, alignSelf: 'center' }}
                >
                  Bloc
                </Text>
              </View>
              <View>
                <Card
                  style={{
                    width: rowItemWidth,
                    height: rowItemWidth,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Text
                  bold
                  size={'md'}
                  appearance="gray"
                  style={{ marginTop: theme.spacing.sm, alignSelf: 'center' }}
                >
                  Lead
                </Text>
              </View>
            </View>
            <View
              style={{
                width: Dimensions.get('window').width,
                marginLeft: -theme.spacing.xl,
              }}
            >
              <Slider height={280} gap={theme.spacing.lg}>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 280,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 280,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 280,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
                <Card
                  style={{
                    width: (Dimensions.get('window').width * 60) / 100,
                    height: 280,
                    borderRadius: theme.borderRadius.square,
                    backgroundColor: theme.colors.neutral.gray.base,
                  }}
                  >
                    <ImageBackground
                      source={GYM_IMG}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      imageStyle={{ borderRadius: theme.borderRadius.square }}
                    />
                  </Card>
              </Slider>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              padding: theme.spacing.xl,
              paddingBottom: 110,
              gap: theme.spacing.lg,
              backgroundColor: theme.colors.primary.lightest,
            }}
          >
            <Text bold size={'lg'}>
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
                          source={GYM_IMG}
                          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                          imageStyle={{ borderRadius: theme.borderRadius.square }}
                        />
                      </Card>
                  ))}
                </View>
              );
            })()}
            <Text size={'md'} appearance="gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <Button appearance="primary" title="Voir tout" />
          </View>
        </Styled.Card>
      </ScrollView>
    </View>
  );
}
