import { Dropdown, Text } from 'kordo-ui';
import { NowFormProps } from './NowForm.types';
import { InteractionsSection } from '../InteractionsSection/InteractionsSection';
import * as Styled from './NowForm.styles';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Styled.SectionContainer>
      <Text bold size="lg">
        {title}
      </Text>
      {children}
    </Styled.SectionContainer>
  );
}

export function NowForm(props: NowFormProps) {
  return (
    <Styled.Container>
      <Section title="Statistiques">
        <Dropdown
          items={props.gymItems}
          placeholder="Sélectionner la salle…"
          icon={{ name: 'LocationRegular' }}
          value={props.gymId}
          onChange={props.onGymChange}
        />
      </Section>
      <InteractionsSection
        visibility={props.visibility}
        onVisibilityChange={props.onVisibilityChange}
      />
    </Styled.Container>
  );
}
