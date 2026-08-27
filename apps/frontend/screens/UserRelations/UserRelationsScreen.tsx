import { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header, Icon, Pivots, Text } from 'kordo-ui';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import * as Styled from './UserRelationsScreen.styles';
import {
  RELATION_PIVOTS,
  RelationPivot,
  getPivotKey,
  getPivotLabel,
  getPivotPlaceholder,
} from './UserRelationsScreen.types';
import { SearchToolbar } from '../../components/SearchToolbar/SearchToolbar';
import { FollowersTab } from './tabs/FollowersTab/FollowersTab';
import { FollowingTab } from './tabs/FollowingTab/FollowingTab';
import { ActivitiesTab } from './tabs/ActivitiesTab/ActivitiesTab';
import { VisitedGymsTab } from './tabs/VisitedGymsTab/VisitedGymsTab';
import { getUserById } from 'fake_data';
import { RootStackParamList } from '../../App';

const PIVOT_LABELS = RELATION_PIVOTS.map((p) => p.label);

// Écran des listes d'un profil (le sien ou celui d'un autre) : abonnés, abonnements,
// activités et salles visitées. L'onglet ouvert à l'arrivée vient du paramètre de route,
// ce qui permet à chaque compteur du profil de pointer directement sur sa liste.
export default function UserRelationsScreen() {
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

  if (!user) return null;

  const handlePivotChange = (label: string) => {
    setPivot(getPivotKey(label));
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
      <Header
        left={<Icon name="ArrowLeftRegular" size="md" onPress={() => navigation.goBack()} />}
        centerChildren
      >
        <Text size="lg" bold>
          {user.username}
        </Text>
      </Header>

      <Styled.PivotsBar>
        <Pivots
          pivots={PIVOT_LABELS}
          selectedPivot={getPivotLabel(pivot)}
          onPivotChange={handlePivotChange}
        />
      </Styled.PivotsBar>

      <Styled.Content>
        <SearchToolbar value={query} onChange={setQuery} placeholder={getPivotPlaceholder(pivot)} />
        {renderTab()}
      </Styled.Content>
    </ScreenLayout>
  );
}
