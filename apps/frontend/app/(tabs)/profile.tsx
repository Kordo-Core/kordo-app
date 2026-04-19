import { View, StyleSheet } from 'react-native';
import { Text } from 'kordo-ui';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text size="xl" bold>
        Profil
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
