import { Checkbox, Dropdown, DropdownItem, ListRow, Text } from 'kordo-ui';
import { InteractionsSectionProps } from './InteractionsSection.types';
import * as Styled from './InteractionsSection.styles';

const VISIBILITY_ITEMS: DropdownItem[] = [
  { key: 'all', text: 'Tout le monde', left: <Text size="md">Tout le monde</Text> },
  { key: 'friends', text: 'Amis', left: <Text size="md">Amis</Text> },
  { key: 'private', text: 'Privé', left: <Text size="md">Privé</Text> },
];

export function InteractionsSection(props: InteractionsSectionProps) {
  return (
    <Styled.Container>
      <Text bold size="lg">
        Interactions utilisateurs
      </Text>

      <Dropdown
        items={VISIBILITY_ITEMS}
        placeholder="Tout le monde"
        icon={{ name: 'PersonRegular' }}
        value={props.visibility}
        onChange={props.onVisibilityChange}
      />

      {props.onMeetsChange && (
        <ListRow
          onPress={() => props.onMeetsChange?.(!props.includeMeets)}
          primaryText={<Text>Ajoutez les personnes rencontrées</Text>}
          secondaryText={
            <Text size="sm" appearance="gray">
              Visualiser les personnes rencontrées lors de votre séance à l'aide de la
              fonctionnalité Meet
            </Text>
          }
          right={<Checkbox checked={!!props.includeMeets} onChange={props.onMeetsChange} />}
        />
      )}

      {props.onLikesChange && (
        <ListRow
          onPress={() => props.onLikesChange?.(!props.likesEnabled)}
          primaryText={<Text>Activer les j&apos;aimes</Text>}
          right={<Checkbox checked={!!props.likesEnabled} onChange={props.onLikesChange} />}
        />
      )}

      {props.onCommentsChange && (
        <ListRow
          onPress={() => props.onCommentsChange?.(!props.commentsEnabled)}
          primaryText={<Text>Activer les commentaires</Text>}
          right={<Checkbox checked={!!props.commentsEnabled} onChange={props.onCommentsChange} />}
        />
      )}
    </Styled.Container>
  );
}
