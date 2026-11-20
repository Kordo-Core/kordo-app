import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import { Icon, motion } from 'kordo-ui';

// Cœur posé sur la photo d'une salle : ajoute ou retire la salle des favoris.
export function GymHeart({ liked, onToggle }: { liked: boolean; onToggle: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityLabel={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      accessibilityState={{ selected: liked }}
      style={({ pressed }) => ({
        position: 'absolute',
        top: 10,
        right: 10,
        width: 42,
        height: 42,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `rgba(${theme.colors.scrim}, 0.35)`,
        transform: [{ scale: pressed ? motion.pressScale : 1 }],
      })}
    >
      <Icon
        name={liked ? 'HeartFilled' : 'heart'}
        size="md"
        color={liked ? '#FF5A5F' : theme.colors.neutral.white}
      />
    </Pressable>
  );
}
