import { Button, theme } from 'kordo-ui';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from '@emotion/react';

export default function App() { 
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Button 
          title='teste'  
          color='secondary'
          icon={<FontAwesome name="camera" size={20} color={"white"}/>} 
        />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
