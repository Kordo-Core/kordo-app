import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Button, Icon, Text } from 'kordo-ui';
import Animated, { FadeIn } from 'react-native-reanimated';

// État vide commun (design D) : pastille verte avec une icône, titre display, phrase
// d'explication et, si utile, une action pour en sortir.
export const EmptyState: React.FC<{
  icon: string;
  title: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ icon, title, text, actionLabel, onAction }) => {
  const theme = useTheme();
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={{ alignItems: 'center', gap: 12, paddingTop: 48, paddingHorizontal: 24 }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 9,
          backgroundColor: theme.colors.soft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={30} color={theme.colors.softText} />
      </View>
      <Text variant="display" size={28} style={{ textAlign: 'center' }}>
        {title}
      </Text>
      <Text appearance="gray" style={{ textAlign: 'center', lineHeight: 21 }}>
        {text}
      </Text>
      {!!actionLabel && onAction && (
        <Button
          title={actionLabel}
          appearance="secondary"
          size="md"
          onPress={onAction}
          containerStyle={{ marginTop: 6, paddingHorizontal: 20 }}
        />
      )}
    </Animated.View>
  );
};
