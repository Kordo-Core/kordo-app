import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { ListRow, SegmentedControl, Text, Toggle } from 'kordo-ui';
import { InteractionsSectionProps } from './InteractionsSection.types';
import * as Styled from './InteractionsSection.styles';

const VISIBILITY_ITEMS = [
  { key: 'all', text: 'Tout le monde' },
  { key: 'friends', text: 'Amis' },
  { key: 'private', text: 'Privé' },
];

// Visibilité + interrupteurs d'interactions, regroupés dans une carte (design D)
export function InteractionsSection(props: InteractionsSectionProps) {
  const theme = useTheme();
  const separator = <View style={{ height: 1, backgroundColor: theme.colors.border }} />;

  return (
    <Styled.Container>
      <Text variant="eyebrow" style={{ marginTop: 6, marginHorizontal: 4 }}>
        Interactions
      </Text>

      {/* Visibilité : contrôle segmenté (maquette « sport »), « Tout le monde » par défaut */}
      <SegmentedControl
        variant="surface"
        size="md"
        borderRadius="square"
        segments={VISIBILITY_ITEMS.map((v) => ({ text: v.text }))}
        selectedIndex={Math.max(
          0,
          VISIBILITY_ITEMS.findIndex((v) => v.key === props.visibility),
        )}
        onSelect={(i) => props.onVisibilityChange(VISIBILITY_ITEMS[i].key)}
      />

      {(props.onMeetsChange || props.onLikesChange || props.onCommentsChange) && (
        <Styled.Card>
          {props.onMeetsChange && (
            <ListRow
              onPress={() => props.onMeetsChange?.(!props.includeMeets)}
              primaryText={<Text bold>Ajouter les personnes rencontrées</Text>}
              secondaryText={
                <Text size="xs" appearance="gray" style={{ lineHeight: 17 }}>
                  Elles seront identifiées grâce à la fonctionnalité Meet
                </Text>
              }
              right={<Toggle value={!!props.includeMeets} onChange={props.onMeetsChange} />}
            />
          )}
          {props.onMeetsChange && props.onLikesChange && separator}
          {props.onLikesChange && (
            <ListRow
              onPress={() => props.onLikesChange?.(!props.likesEnabled)}
              primaryText={<Text bold>Activer les j&apos;aime</Text>}
              right={<Toggle value={!!props.likesEnabled} onChange={props.onLikesChange} />}
            />
          )}
          {props.onLikesChange && props.onCommentsChange && separator}
          {props.onCommentsChange && (
            <ListRow
              onPress={() => props.onCommentsChange?.(!props.commentsEnabled)}
              primaryText={<Text bold>Activer les commentaires</Text>}
              right={<Toggle value={!!props.commentsEnabled} onChange={props.onCommentsChange} />}
            />
          )}
        </Styled.Card>
      )}
    </Styled.Container>
  );
}
