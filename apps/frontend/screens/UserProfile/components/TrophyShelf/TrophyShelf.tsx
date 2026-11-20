import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Button, ProgressBar, Text, TrophyBadge } from 'kordo-ui';
import { TROPHIES, TROPHY_TOTAL, Trophy } from '../../../../fake_data/trophies.fake';
import * as Styled from './TrophyShelf.styles';
import { TrophyShelfProps } from './TrophyShelf.types';

// Sur mon profil, l'étagère montre les quatre premiers trophées de la liste commune
const SHELF = TROPHIES.slice(0, 4);

// Étagère de trophées (design D). Sur mon profil : en-tête avec un bouton « Tout voir », barre
// de progression, puis quatre tuiles (orangées si obtenues). Sur le profil d'un autre grimpeur :
// seulement ses trophées obtenus, sans progression ni lien vers la liste, qui sont les miens.
export const TrophyShelf: React.FC<TrophyShelfProps> = ({
  title,
  onPressAll,
  onPressTrophy,
  earnedOnly,
}) => {
  const theme = useTheme();
  const earnedList = TROPHIES.filter((t) => t.progress === 100);
  const shown = earnedOnly ? earnedList : SHELF;

  const renderSlot = (t: Trophy) => {
    const earnedOne = t.progress === 100;
    return (
      <Pressable
        key={t.id}
        disabled={!earnedOne || !onPressTrophy}
        onPress={() => onPressTrophy?.(t.id)}
        accessibilityLabel={t.name}
        style={({ pressed }) => ({
          width: 64,
          alignItems: 'center',
          gap: 6,
          opacity: earnedOne ? 1 : 0.5,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
      >
        <TrophyBadge icon={t.icon} earned={earnedOne} size="lg" />
        <Text size={11} bold numberOfLines={1}>
          {t.name.split(' ')[0]}
        </Text>
      </Pressable>
    );
  };

  if (earnedOnly) {
    return (
      <Styled.Container>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="display" size={28}>
            {title}
          </Text>
          <Text size="xs" extraBold appearance="primary">
            {earnedList.length} obtenu{earnedList.length > 1 ? 's' : ''}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md }}>
          {shown.map(renderSlot)}
        </View>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="display" size={28}>
          {title}
        </Text>
        {/* Accès à la liste complète : bouton pilule, comme les autres actions du profil */}
        <Button
          size="sm"
          textSize={12}
          appearance="soft"
          borderRadius="rounded"
          containerStyle={{ paddingLeft: 12, paddingRight: 8, gap: 2 }}
          title="Tout voir"
          icon={{ name: 'chevron-right', size: 16 }}
          iconPosition="right"
          onPress={onPressAll}
        />
      </View>

      {/* Progression vers l'ensemble des trophées */}
      <View style={{ gap: 6 }}>
        <ProgressBar
          value={earnedList.length / TROPHY_TOTAL}
          delay={250}
          accessibilityLabel={`${earnedList.length} trophées sur ${TROPHY_TOTAL}`}
        />
        <Text size="xs" bold appearance="gray">
          {earnedList.length} sur {TROPHY_TOTAL} obtenus
        </Text>
      </View>

      <Styled.Slots>{shown.map(renderSlot)}</Styled.Slots>
    </Styled.Container>
  );
};
