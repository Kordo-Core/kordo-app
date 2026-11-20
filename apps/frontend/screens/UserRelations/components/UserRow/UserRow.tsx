import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Icon, Text } from 'kordo-ui';
import { Bounce } from 'kordo-ui/src/animations/Bounce/Bounce';
import { UserRowProps } from './UserRow.types';
import { CURRENT_USER, getUserHomeGymName } from 'fake_data';

// Délai avant de basculer Follow ↔ Following : moitié de l'animation du bouton, comme dans
// les notifications, pour ne pas couper le rebond.
const FOLLOW_SWITCH_DELAY = 100;

// Ligne d'une liste d'abonnés / abonnements (maquette « sport ») : carte cernée d'un filet,
// avatar carré de 46 px, nom et salle habituelle, bouton de suivi de 100 × 36 px à droite.
// Le suivi est optimiste et local (pas de backend) : un seul bouton, qui change d'état.
export const UserRow: React.FC<UserRowProps> = ({ user, onPressUser }) => {
  const theme = useTheme();
  const [following, setFollowing] = useState(!!user.isFollowing);

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  // On ne se suit pas soi-même : la ligne de l'utilisateur courant n'a pas de bouton.
  const isCurrentUser = user.id === CURRENT_USER.id;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: theme.borderRadius.card,
        backgroundColor: theme.colors.surface,
        boxShadow: theme.shadows.sm,
      }}
    >
      <Pressable
        onPress={() => onPressUser?.(user)}
        style={{ flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: 12 }}
      >
        <Image
          source={{ uri: user.avatarUrl }}
          style={{ width: 46, height: 46, borderRadius: theme.borderRadius.square }}
        />
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text size="md" bold numberOfLines={1}>
            {fullName || user.username}
          </Text>
          <Text size="xs" appearance="gray" numberOfLines={1}>
            {getUserHomeGymName(user.id)}
          </Text>
        </View>
      </Pressable>
      {!isCurrentUser && (
        <Bounce
          onPress={() => setTimeout(() => setFollowing((prev) => !prev), FOLLOW_SWITCH_DELAY)}
        >
          <View
            accessibilityRole="button"
            style={{
              height: 36,
              minWidth: 100,
              paddingHorizontal: 12,
              borderRadius: 5,
              borderWidth: 1.5,
              borderColor: following ? theme.colors.border : theme.colors.secondary.base,
              backgroundColor: following ? 'transparent' : theme.colors.secondary.base,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            {following && <Icon name="CheckmarkRegular" size={16} color={theme.colors.text} />}
            <Text
              size="sm"
              extraBold
              style={{ color: following ? theme.colors.text : theme.colors.neutral.white }}
            >
              {following ? 'Suivi' : 'Suivre'}
            </Text>
          </View>
        </Bounce>
      )}
    </View>
  );
};
