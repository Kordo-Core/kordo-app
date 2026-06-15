import { View, StyleSheet } from 'react-native';
import { Text } from 'kordo-ui';

// Page des statistiques / progression de l'utilisateur.
export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text size="xl" bold>
        Progression
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
