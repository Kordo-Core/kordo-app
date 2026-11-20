import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { MeetSuggestionsProps } from './MeetSuggestions.types';
import { Text } from '../../atoms/Text/Text';
import { motion } from '../../../animations/motion';
import { CENTERED_TEXT } from '../../../utils/centeredText';

// Bloc de suggestions du fil : grimpeurs croisés récemment via Meet, à suivre. Indépendant des
// posts ; les personnes rencontrées pendant une séance sont dans la carte de l'activité.
export const MeetSuggestions: React.FC<MeetSuggestionsProps> = ({
  suggestions,
  onPressUser,
  style,
}) => {
  const theme = useTheme();

  // Suivi local (toggle optimiste au clic)
  const [following, setFollowing] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(suggestions.map(({ user }) => [user.id, !!user.isFollowing])),
  );
  const toggleFollow = (id: string) => setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));

  if (suggestions.length === 0) return null;

  return (
    <View style={[{ gap: 10 }, style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingHorizontal: theme.spacing.xl,
        }}
      >
        <Text variant="eyebrow" size={12}>
          Croisé·es récemment
        </Text>
        <Text size="xs" bold appearance="gray">
          via Meet
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: -6 }}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: 6,
          gap: 10,
        }}
      >
        {suggestions.map(({ user, subtitle }) => {
          const isFollowing = following[user.id];
          return (
            <View
              key={user.id}
              style={{
                width: 150,
                padding: 14,
                borderRadius: theme.borderRadius.card,
                backgroundColor: theme.colors.surface,
                boxShadow: theme.shadows.sm,
                alignItems: 'center',
                gap: theme.spacing.sm,
              }}
            >
              <Pressable
                onPress={() => onPressUser?.(user)}
                style={{ alignItems: 'center', gap: 8 }}
              >
                <Image
                  source={{ uri: user.avatarUrl }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    backgroundColor: theme.colors.surfaceAlt,
                  }}
                />
                <View style={{ alignItems: 'center', gap: 2 }}>
                  <Text size={14} extraBold numberOfLines={1}>
                    {user.firstName ?? user.username}
                  </Text>
                  {!!subtitle && (
                    <Text size={11} appearance="gray" numberOfLines={1}>
                      {subtitle}
                    </Text>
                  )}
                </View>
              </Pressable>
              <Pressable
                onPress={() => toggleFollow(user.id)}
                accessibilityState={{ selected: isFollowing }}
                style={({ pressed }) => ({
                  alignSelf: 'stretch',
                  height: 34,
                  borderRadius: 5,
                  borderWidth: 1.5,
                  borderColor: isFollowing ? theme.colors.border : theme.colors.secondary.base,
                  backgroundColor: isFollowing ? 'transparent' : theme.colors.secondary.base,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ scale: pressed ? motion.pressScale : 1 }],
                })}
              >
                <Text
                  size="sm"
                  extraBold
                  appearance={isFollowing ? undefined : 'white'}
                  style={CENTERED_TEXT}
                >
                  {isFollowing ? 'Abonné·e' : 'Suivre'}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
