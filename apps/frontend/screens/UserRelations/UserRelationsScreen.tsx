import { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';
import { Bounce } from 'kordo-ui/src/animations/Bounce/Bounce';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import * as Styled from './UserRelationsScreen.styles';
import {
  RELATION_PIVOTS,
  RelationPivot,
  getPivotLabel,
  getPivotPlaceholder,
} from './UserRelationsScreen.types';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { FollowersTab } from './tabs/FollowersTab/FollowersTab';
import { FollowingTab } from './tabs/FollowingTab/FollowingTab';
import { ActivitiesTab } from './tabs/ActivitiesTab/ActivitiesTab';
import { VisitedGymsTab } from './tabs/VisitedGymsTab/VisitedGymsTab';
import { getUserById, getUserProfileStats } from 'fake_data';
import { RootStackParamList } from '../../App';

// Écran des listes d'un profil (le sien ou celui d'un autre) : abonnés, abonnements,
// activités et salles visitées. L'onglet ouvert à l'arrivée vient du paramètre de route,
// ce qui permet à chaque compteur du profil de pointer directement sur sa liste.
export default function UserRelationsScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'UserRelations'>>();

  const user = getUserById(params.userId);
  // `Pivots` garde son propre état interne, initialisé par `selectedPivot` : on ne le pilote
  // qu'au montage et on suit ensuite ses changements pour savoir quel onglet rendre.
  const [pivot, setPivot] = useState<RelationPivot>(params.pivot);
  // Recherche tenue ici : une seule barre pour les quatre onglets, qui reste montée d'un
  // onglet à l'autre. La saisie est remise à zéro en changeant de pivot, un terme n'ayant
  // pas de sens d'une liste à l'autre.
  const [query, setQuery] = useState('');
  const stats = getUserProfileStats(params.userId);
  const counts: Record<RelationPivot, number> = {
    followers: stats.followersCount,
    following: stats.followingCount,
    activities: stats.activitiesCount,
    gyms: stats.gymsVisitedCount,
  };

  if (!user) return null;

  const handlePivotChange = (key: RelationPivot) => {
    setPivot(key);
    setQuery('');
  };

  const renderTab = () => {
    switch (pivot) {
      case 'followers':
        return <FollowersTab userId={params.userId} query={query} />;
      case 'following':
        return <FollowingTab userId={params.userId} query={query} />;
      case 'activities':
        return <ActivitiesTab userId={params.userId} query={query} />;
      case 'gyms':
        return <VisitedGymsTab userId={params.userId} query={query} />;
    }
  };

  return (
    <ScreenLayout>
      <ScreenHeader
        title={getPivotLabel(pivot)}
        eyebrow={`@${user.username}`}
        onBack={() => navigation.goBack()}
      />

      {/* Onglets en pastilles (design D) : l'onglet actif passe en encre pleine */}
      <Styled.PivotsBar>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.md + 2, gap: 6 }}
        >
          {RELATION_PIVOTS.map((p) => {
            const active = p.key === pivot;
            return (
              <Bounce key={p.key} onPress={() => handlePivotChange(p.key)}>
                <Styled.PivotChip active={active} accessibilityRole="tab">
                  <Text
                    size="sm"
                    extraBold
                    style={{ color: active ? theme.colors.background : theme.colors.text }}
                  >
                    {p.label}
                  </Text>
                  <Styled.PivotCount active={active}>
                    <Text
                      size={11}
                      extraBold
                      style={{ color: active ? theme.colors.background : theme.colors.text }}
                    >
                      {counts[p.key]}
                    </Text>
                  </Styled.PivotCount>
                </Styled.PivotChip>
              </Bounce>
            );
          })}
        </ScrollView>
      </Styled.PivotsBar>

      <Styled.Content>
        <Styled.ToolbarBar>
          <SearchToolbar
            value={query}
            onChange={setQuery}
            placeholder={getPivotPlaceholder(pivot)}
          />
        </Styled.ToolbarBar>
        {renderTab()}
      </Styled.Content>
    </ScreenLayout>
  );
}
