import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@emotion/react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, Icon, Notification, SegmentedControl, Text } from 'kordo-ui';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { getNotificationFeed } from 'fake_data';
import { RootStackParamList } from '../../App';

// Filtres de la liste : tout, les personnes (suivis, likes, meets), les salles (nouveaux blocs)
const FILTERS = [{ text: 'Tout' }, { text: 'Social' }, { text: 'Salles' }];

export default function NotificationsScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const sections = useMemo(() => getNotificationFeed(), []);
  const [filter, setFilter] = useState(0);

  // Lu / non lu local : un appui sur une carte la marque lue, « Tout lire » les marque toutes
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(sections.flatMap((s) => s.items.filter((n) => n.isRead).map((n) => n.id))),
  );
  const allIds = useMemo(() => sections.flatMap((s) => s.items.map((n) => n.id)), [sections]);
  const unread = allIds.filter((id) => !readIds.has(id)).length;
  const markRead = (id: string) => setReadIds((prev) => new Set(prev).add(id));

  const visibleSections = sections
    .map((s) => ({
      ...s,
      items: s.items.filter((n) =>
        filter === 0 ? true : filter === 1 ? n.kind !== 'new_bloc' : n.kind === 'new_bloc',
      ),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Notifications"
        eyebrow={unread ? `${unread} non lue${unread > 1 ? 's' : ''}` : 'Tout est lu'}
        onBack={() => navigation.goBack()}
        right={
          <Button
            appearance="surface"
            borderRadius="square"
            title="Tout lire"
            textSize={13}
            onPress={() => setReadIds(new Set(allIds))}
            // Bouton flottant de la maquette : 40 px, ombre portée légère (pas de filet)
            containerStyle={{
              height: 40,
              paddingHorizontal: 14,
              minWidth: 0,
              boxShadow: `0px 1px 2px rgba(${theme.colors.scrim}, 0.05)`,
            }}
          />
        }
      >
        <SegmentedControl
          segments={FILTERS}
          selectedIndex={filter}
          onSelect={setFilter}
          variant="surface"
          size="md"
          borderRadius="square"
        />
      </ScreenHeader>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 14,
          paddingBottom: 16,
        }}
      >
        {visibleSections.length === 0 && (
          <EmptyState
            icon="AlertRegular"
            title={filter === 0 ? 'Tout est calme' : 'Rien ici'}
            text={
              filter === 2
                ? 'Aucune nouvelle de tes salles. Les nouveaux blocs et l’activité de tes salles arriveront ici.'
                : filter === 1
                  ? 'Aucune notification sociale. Les j’aime, commentaires et abonnements arriveront ici.'
                  : 'Aucune notification pour le moment. Les j’aime, commentaires et nouveaux blocs de tes salles arriveront ici.'
            }
          />
        )}
        {visibleSections.map((section) => (
          <View key={section.key} style={{ gap: 10 }}>
            <Text variant="eyebrow" size={12} style={{ marginTop: 10, marginHorizontal: 6 }}>
              {section.title}
            </Text>
            {section.items.map((notification, i) => (
              <Animated.View
                key={notification.id}
                entering={FadeInDown.delay(i * 40).duration(450)}
              >
                <Notification
                  notification={notification}
                  isRead={readIds.has(notification.id)}
                  onRead={(n) => markRead(n.id)}
                  onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
                  onPressFollow={() => {}}
                  onPressGym={(gymId) => navigation.navigate('Gym', { gymId })}
                />
              </Animated.View>
            ))}
          </View>
        ))}

        {/* Fin de liste */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, padding: 14 }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: theme.borderRadius.square,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.soft,
            }}
          >
            <Icon name="CheckmarkRegular" size={18} color={theme.colors.softText} />
          </View>
          <Text size="sm" appearance="gray" style={{ flex: 1 }}>
            Tu es à jour. Les notifications plus anciennes sont archivées.
          </Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
