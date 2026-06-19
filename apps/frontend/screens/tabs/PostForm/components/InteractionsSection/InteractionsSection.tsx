import { Checkbox, Dropdown, DropdownItem, Text } from 'kordo-ui';
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
        <Checkbox
          label={
            <>
              <Text>Ajoutez les personnes rencontrées</Text>
              <Text size="sm" appearance="gray">
                Visualiser les personnes rencontrées lors de votre séance à l'aide de la
                fonctionnalité Meet
              </Text>
            </>
          }
          checked={!!props.includeMeets}
          onChange={props.onMeetsChange}
        />
      )}

      {props.onLikesChange && (
        <Checkbox
          label="Activer les j'aimes"
          checked={!!props.likesEnabled}
          onChange={props.onLikesChange}
        />
      )}

      {props.onCommentsChange && (
        <Checkbox
          label="Activer les commentaires"
          checked={!!props.commentsEnabled}
          onChange={props.onCommentsChange}
        />
      )}
    </Styled.Container>
  );
}
