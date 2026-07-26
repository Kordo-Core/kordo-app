import { Fragment, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, Icon, ListRow, Section, Text, theme } from 'kordo-ui';
import * as Styled from './UserProfile.styles';
import { ProfileSummary } from './components/ProfileSummary/ProfileSummary';
import { FollowStatus } from './components/ProfileSummary/ProfileSummary.types';
import { TrophyShelf } from './components/TrophyShelf/TrophyShelf';
import { CURRENT_USER, getFollowStatus, getUserById, getUserProfileStats } from 'fake_data';
import { RootStackParamList } from '../../App';

const NAV_ITEMS: { label: string; icon: string }[] = [
  { label: 'Activités', icon: 'list' },
  { label: 'Salle visités', icon: 'location' },
  { label: 'Bloc validés', icon: 'checkmark-circle' },
  { label: 'Bêtas', icon: 'play' },
  { label: 'Statistiques', icon: 'grid' },
];

export default function UserProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'UserProfile'>>();
  const { height } = useWindowDimensions();

  const user = getUserById(params.userId);
  const isOwnProfile = params.userId === CURRENT_USER.id;
  const stats = getUserProfileStats(params.userId);

  // Statut de suivi local : initialisé depuis les fake_data, modifiable au tap (pas de backend).
  const [followStatus, setFollowStatus] = useState<FollowStatus>(() =>
    getFollowStatus(params.userId),
  );

  if (!user) return null;

  const handleToggleFollow = () =>
    setFollowStatus((current) => (current === 'following' ? 'none' : 'following'));

  return (
    <Styled.Container>
      <Styled.Background pointerEvents="none">
        <SvgUri
          width={height}
          height={height}
          uri="https://res.cloudinary.com/dqmegz5dn/image/upload/v1781135028/topo-primary-dark_wdsvmf.svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </Styled.Background>

      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
        right={
          <Icon name={isOwnProfile ? 'settings' : 'more-vertical'} size="md" onPress={() => {}} />
        }
        style={{ boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}
      >
        <Text size="lg" bold>
          {user.username}
        </Text>
      </Header>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
          paddingBlock: theme.spacing.sm,
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <Section>
          <ProfileSummary
            user={user}
            stats={stats}
            isOwnProfile={isOwnProfile}
            followStatus={followStatus}
            onToggleFollow={handleToggleFollow}
            onPressMessage={() => {}}
          />
        </Section>

        <Section>
          {NAV_ITEMS.map((item) => (
            <Fragment key={item.label}>
              <ListRow
                left={<Icon name={item.icon} />}
                primaryText={<Text>{item.label}</Text>}
                right={<Icon name="chevron-right" color={theme.colors.neutral.gray.base} />}
              />
            </Fragment>
          ))}
        </Section>

        <Section>
          <TrophyShelf title={isOwnProfile ? 'Mes Trophées' : 'Collection de trophées'} />
        </Section>
      </ScrollView>
    </Styled.Container>
  );
}
