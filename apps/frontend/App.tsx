import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, theme, ToastProvider, useToast, ListRow, Text, Header } from 'kordo-ui';

/* --- CustomImage utilisant le theme correctement --- */
const CustomImage = styled.Image(() => ({
  width: theme.avatarSizes?.md,
  height: theme.avatarSizes?.md,
  borderRadius: theme.borderRadius?.rounded,
}));

const HeaderCustomImage = styled.Image(() => ({
  width: theme.avatarSizes?.md + 8,
  height: theme.avatarSizes?.md + 8,
  borderRadius: theme.borderRadius?.rounded,
}));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        {/* SafeAreaView englobe tout pour gérer le notch et la couleur du status bar */}
        <SafeAreaView style={{ backgroundColor: 'white', zIndex: 10000 }} />
        <HomeScreen />
      </ToastProvider>
    </ThemeProvider>
  );
}

/* --- HomeScreen avec ScrollView --- */
function HomeScreen() {
  const { addToast } = useToast();
  const [scroll, setScroll] = useState(0);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* Header indépendant et animé */}
      <Header
        smart
        scrollY={scroll}
        left={
          <Pressable onPress={() => console.log('avatar pressed')}>
            <HeaderCustomImage
              source={{
                uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
              }}
            />
          </Pressable>
        }
        primaryText={
          <Text size="lg" bold>
            Jacinto Valentino
          </Text>
        }
        right={
          <>
            <Button
              inverted
              borderless
              appearance="black"
              icon={{ name: 'activity' }}
              borderRadius="square"
              onPress={() => console.log('action 1')}
            />
            <Button
              inverted
              borderless
              appearance="black"
              icon={{ name: 'activity' }}
              borderRadius="square"
              onPress={() => console.log('action 2')}
            />
          </>
        }
      />

      {/* Contenu scrollable */}
      <ScrollView
        contentContainerStyle={{ paddingTop: 82 }} // hauteur du header
        onScroll={(e) => setScroll(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <ListRow
            key={i}
            left={
              <Pressable onPress={() => console.log('avatar pressed')}>
                <CustomImage
                  source={{
                    uri: 'https://res.cloudinary.com/dqmegz5dn/image/upload/v1763334248/avatar-kordo_rwvjw4.png',
                  }}
                />
              </Pressable>
            }
            primaryText={
              <Text size="md" bold>
                Jacinto Valentino #{i + 1}
              </Text>
            }
            secondaryText={
              <Text appearance="gray">
                par{' '}
                <Text appearance="primary" bold onPress={() => console.log('Gunki pressed')}>
                  Gunki
                </Text>
              </Text>
            }
            right={
              <Text
                appearance="gray"
                bold
                size="lg"
                onPress={() => console.log(`${i * 100}pts pressed`)}
              >
                {i * 100}pts
              </Text>
            }
          />
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
