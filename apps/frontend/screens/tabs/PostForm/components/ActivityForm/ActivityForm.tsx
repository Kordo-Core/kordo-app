import { Dropdown, DropdownItem, Input, Text } from 'kordo-ui';
import { ActivityFormProps } from './ActivityForm.types';
import { InteractionsSection } from '../InteractionsSection/InteractionsSection';
import { MediaSlider } from '../MediaSlider/MediaSlider';
import * as Styled from './ActivityForm.styles';
import { View } from 'react-native';

const DISCIPLINE_ITEMS: DropdownItem[] = [
  { key: 'bloc', text: 'Bloc', left: <Text size="md">Bloc</Text> },
  { key: 'lead', text: 'Voie (lead)', left: <Text size="md">Voie (lead)</Text> },
  { key: 'speed', text: 'Vitesse', left: <Text size="md">Vitesse</Text> },
];

const SHOES_ITEMS: DropdownItem[] = [
  {
    key: 'solution',
    text: 'La Sportiva Solution',
    left: <Text size="md">La Sportiva Solution</Text>,
  },
  { key: 'instinct', text: 'Scarpa Instinct', left: <Text size="md">Scarpa Instinct</Text> },
  { key: 'drago', text: 'Tenaya Drago', left: <Text size="md">Tenaya Drago</Text> },
];

const MONTHS = [
  'janv.',
  'févr.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
];

function formatSession(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Styled.SectionContainer>
      {title && (
        <Text bold size="lg">
          {title}
        </Text>
      )}

      {children}
    </Styled.SectionContainer>
  );
}

export function ActivityForm(props: ActivityFormProps) {
  return (
    <>
      <Section>
        <Input
          value={props.title}
          onChange={props.onTitleChange}
          placeholder="Nommer votre activité…"
        />
        <Input
          value={props.description}
          onChange={props.onDescriptionChange}
          placeholder="Comment s'est passé la séance ? Donnez plus d'info sur votre séance…"
          multiline
        />
      </Section>

      <Section title="Statistiques">
        <Dropdown
          items={props.gymItems}
          placeholder="Sélectionner la salle…"
          icon={{ name: 'LocationRegular' }}
          value={props.gymId}
          onChange={props.onGymChange}
        />
        <Styled.BlocsWrapper>
          <Dropdown
            mode="multi"
            items={props.blocItems}
            placeholder="Blocs validés"
            value={props.selectedBlocs}
            onChange={props.onBlocsChange}
          />
          <Text size="sm" appearance="gray">
            Les blocs que vous sélectionnerez seront automatiquement validés comme réussis
          </Text>
        </Styled.BlocsWrapper>
        <MediaSlider media={props.autoVideos} />
        <Dropdown
          items={props.sessionItems}
          placeholder="Sélectionner une session…"
          icon={{ name: 'CalendarRegular' }}
          value={props.sessionId}
          onChange={props.onSessionChange}
        />
      </Section>

      <Section title="Détails">
        <Dropdown
          items={DISCIPLINE_ITEMS}
          placeholder="Discipline sportive"
          icon={{ name: 'StarRegular' }}
          value={props.discipline}
          onChange={props.onDisciplineChange}
        />
        <Dropdown
          items={SHOES_ITEMS}
          placeholder="Chaussons utilisés"
          value={props.shoes}
          onChange={props.onShoesChange}
        />
      </Section>

      <InteractionsSection
        visibility={props.visibility}
        onVisibilityChange={props.onVisibilityChange}
        likesEnabled={props.likesEnabled}
        onLikesChange={props.onLikesChange}
        commentsEnabled={props.commentsEnabled}
        onCommentsChange={props.onCommentsChange}
        includeMeets={props.includeMeets}
        onMeetsChange={props.onMeetsChange}
      />
    </>
  );
}

export { formatSession };
