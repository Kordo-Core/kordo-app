import { Fragment, useState } from 'react';
import { Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import { Header, Icon, ListRow, Section, Text } from 'kordo-ui';
import * as Styled from './UserProfile.styles';
import { ProfileSummary } from './components/ProfileSummary/ProfileSummary';
import { FollowStatus } from './components/ProfileSummary/ProfileSummary.types';
import { TrophyShelf } from './components/TrophyShelf/TrophyShelf';
import { CURRENT_USER, getFollowStatus, getUserById, getUserProfileStats } from 'fake_data';
import { RootStackParamList } from '../../App';
import { RelationPivot } from '../UserRelations/UserRelationsScreen.types';

// `pivot` renseigné = la ligne ouvre l'écran des listes du profil sur cet onglet.
const NAV_ITEMS: { label: string; icon: string; pivot?: RelationPivot }[] = [
  { label: 'Activités', icon: 'list', pivot: 'activities' },
  { label: 'Salle visités', icon: 'location', pivot: 'gyms' },
  { label: 'Bloc validés', icon: 'checkmark-circle' },
  { label: 'Bêtas', icon: 'play' },
  { label: 'Statistiques', icon: 'grid' },
];

export default function UserProfile() {
  const theme = useTheme();
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

  const openRelations = (pivot: RelationPivot) =>
    navigation.navigate('UserRelations', { userId: params.userId, pivot });

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
        style={{ boxShadow: theme.shadows.md }}
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
            onPressStat={openRelations}
          />
        </Section>

        <Section style={{ paddingBlock: 80 }}>
          <Text>Work in progress...</Text>
        </Section>

        <Section>
          {NAV_ITEMS.map(({ label, icon, pivot }) => (
            <Fragment key={label}>
              <Pressable disabled={!pivot} onPress={pivot ? () => openRelations(pivot) : undefined}>
                <ListRow
                  left={<Icon name={icon} />}
                  primaryText={<Text>{label}</Text>}
                  right={<Icon name="chevron-right" color={theme.colors.neutral.gray.base} />}
                />
              </Pressable>
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
