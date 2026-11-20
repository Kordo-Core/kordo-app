import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Button, PhotoText, Text } from 'kordo-ui';
import { GYMS, PASSPORT_TOTAL } from '../../../../fake_data/gyms.fake';
import { franchiseInk } from './franchiseInk';

const FRANCHISE_COUNT = 8;
const MONOGRAM = 36;
const FRANCHISES = [...new Set(GYMS.map((gym) => gym.shortName))];

const monogram = (name: string) => name.replace('Petites ', 'P').slice(0, 2).toUpperCase();

// Toutes les salles : leur nombre en très grand, rempli d'une photo, puis l'accès à la liste.
export function AllGymsTeaser({ onPress }: { onPress: () => void }) {
  const theme = useTheme();

  return (
    <View style={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.sm }}>
      <Text variant="display" size={28} style={{ marginHorizontal: 2 }}>
        Toutes les salles
      </Text>
      <Pressable onPress={onPress} accessibilityLabel={`Voir les ${PASSPORT_TOTAL} salles`}>
        <PhotoText text={String(PASSPORT_TOTAL)} imageUri={GYMS[0].imageUri} size={309} />
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 2 }}>
        <View style={{ flexDirection: 'row' }}>
          {FRANCHISES.map((name, i) => (
            <View
              key={name}
              style={{
                width: MONOGRAM,
                height: MONOGRAM,
                marginLeft: i ? -10 : 0,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: theme.colors.background,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: franchiseInk(name, 'light'),
              }}
            >
              <Text size={11} bold style={{ color: theme.colors.neutral.white }}>
                {monogram(name)}
              </Text>
            </View>
          ))}
        </View>
        <Text size="sm" bold>
          {FRANCHISE_COUNT} franchises
        </Text>
      </View>
      <Text appearance="gray" style={{ paddingHorizontal: 2 }}>
        Plus de {PASSPORT_TOTAL} salles partenaires dans toute la France, réparties dans{' '}
        {FRANCHISE_COUNT} franchises. Retrouve leurs blocs, leurs classements et les grimpeurs en
        séance.
      </Text>
      <Button
        appearance="secondary"
        title="Voir tout"
        icon={{ name: 'ArrowRightFilled', size: 'sm' }}
        iconPosition="right"
        fullWidth
        onPress={onPress}
      />
    </View>
  );
}
