import { View, StyleSheet } from 'react-native';
import { Text } from 'kordo-ui';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text size="xl" bold>
        Kordo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
