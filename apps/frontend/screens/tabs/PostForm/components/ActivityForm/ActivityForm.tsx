import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Dropdown, DropdownItem, Input, motion, Stepper, Text } from 'kordo-ui';
import { ActivityFormProps } from './ActivityForm.types';
import { InteractionsSection } from '../InteractionsSection/InteractionsSection';
import { MediaSlider } from '../MediaSlider/MediaSlider';
import * as Styled from './ActivityForm.styles';

const DISCIPLINE_ITEMS = [
  { key: 'bloc', short: 'Bloc' },
  { key: 'lead', short: 'Voie' },
  { key: 'speed', short: 'Vitesse' },
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
        <Text variant="eyebrow" style={{ marginTop: 6, marginHorizontal: 4 }}>
          {title}
        </Text>
      )}

      {children}
    </Styled.SectionContainer>
  );
}

// Paliers de cotation : les grades 1 à 30 vont par tranches de 5, une couleur par tranche
const TIERS = [
  { key: 'yellow', label: 'Jaune' },
  { key: 'green', label: 'Vert' },
  { key: 'blue', label: 'Bleu' },
  { key: 'red', label: 'Rouge' },
  { key: 'black', label: 'Noir' },
  { key: 'purple', label: 'Violet' },
] as const;

const gradeTier = (grade: number) => Math.max(0, Math.min(Math.floor((grade - 1) / 5), 5));

// Pastille de couleur du niveau max : grossit avec un rebond quand elle est choisie
function TierSwatch(props: {
  label: string;
  color: string;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  const scale = useSharedValue(props.selected ? 1.12 : 0.86);
  useEffect(() => {
    scale.value = withSpring(props.selected ? 1.12 : 0.86, motion.press);
  }, [props.selected, scale]);
  const scaleStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      accessibilityRole="radio"
      accessibilityLabel={props.label}
      accessibilityState={{ checked: props.selected, disabled: props.disabled }}
    >
      <Animated.View
        style={[
          {
            width: 40,
            height: 40,
            borderRadius: 6,
            backgroundColor: props.color,
            opacity: props.disabled ? 0.3 : 1,
            boxShadow: props.selected
              ? `0px 0px 0px 3px ${theme.colors.surface}, 0px 0px 0px 5px ${props.color}`
              : 'inset 0px 0px 0px 1px rgba(127, 127, 127, 0.25)',
          },
          scaleStyle,
        ]}
      />
    </Pressable>
  );
}

export function ActivityForm(props: ActivityFormProps) {
  const theme = useTheme();
  return (
    <>
      <Section>
        <Input
          value={props.title}
          onChange={props.onTitleChange}
          label="TITRE"
          variant="form"
          emphasis
          placeholder="Nomme ton activité…"
        />
        <Input
          value={props.description}
          onChange={props.onDescriptionChange}
          label="DESCRIPTION"
          variant="form"
          counter={500}
          placeholder="Comment s'est passée la séance ? Donne plus d'infos…"
          multiline
        />
        <MediaSlider media={props.photos} onAdd={props.onAddMedia} />
      </Section>

      <Section title="Statistiques">
        <Dropdown
          items={props.gymItems}
          label="Salle"
          placeholder="Sélectionner la salle…"
          icon={{ name: 'LocationRegular' }}
          value={props.gymId}
          onChange={props.onGymChange}
        />
        <Styled.BlocsWrapper>
          <Styled.Counter>
            <View style={{ flex: 1, gap: 2 }}>
              <Text variant="eyebrow" size={11}>
                Blocs validés
              </Text>
              <Text variant="display" size={76}>
                {props.blocCount}
              </Text>
              <Text size="xs" appearance="gray">
                {props.selectedBlocs.length
                  ? `dont ${props.selectedBlocs.length} cochés ci-dessous`
                  : 'aucun bloc coché'}
              </Text>
            </View>
            {/* Le compteur ne descend pas sous le nombre de blocs cochés */}
            <Stepper
              value={props.blocCount}
              onChange={props.onBlocCountChange}
              min={props.selectedBlocs.length}
              decrementLabel="Retirer un bloc"
              incrementLabel="Ajouter un bloc"
            />
          </Styled.Counter>
          <Text size="xs" appearance="gray" style={{ lineHeight: 17 }}>
            Choisis la salle puis les blocs réussis pendant la séance. Tu peux compter en plus ceux
            qui ne sont pas dans la liste.
          </Text>
          <Dropdown
            mode="multi"
            items={props.blocItems}
            label="Blocs validés"
            placeholder="Aucun bloc coché"
            value={props.selectedBlocs}
            onChange={props.onBlocsChange}
          />
          <Text size="xs" appearance="gray">
            Les blocs que vous sélectionnerez seront automatiquement validés comme réussis
          </Text>
        </Styled.BlocsWrapper>
        <Styled.Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="eyebrow" size={11}>
              Niveau max
            </Text>
            {props.maxTier >= 0 && (
              <Text size="sm" extraBold appearance="primary">
                {TIERS[props.maxTier].label}
              </Text>
            )}
          </View>
          <View
            accessibilityRole="radiogroup"
            accessibilityLabel="Niveau max"
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {TIERS.map((tier, i) => (
              <TierSwatch
                key={tier.key}
                label={tier.label}
                color={theme.colors.boulderGrade[tier.key]}
                selected={i === props.maxTier}
                disabled={i < props.minTier}
                onPress={() => props.onMaxTierChange(i)}
              />
            ))}
          </View>
          <Text size="xs" appearance="gray">
            {props.minTier >= 0
              ? `Au moins ${TIERS[props.minTier].label}, le bloc coché le plus dur`
              : 'Coche des blocs ou choisis ton niveau'}
          </Text>
        </Styled.Card>
        {props.autoVideos.length > 0 && (
          <Text variant="eyebrow" size={11}>
            Vidéos de tes méthodes · ajoutées automatiquement
          </Text>
        )}
        <MediaSlider media={props.autoVideos} />
        <Dropdown
          items={props.sessionItems}
          label="Session"
          placeholder="Sélectionner une session…"
          icon={{ name: 'CalendarRegular' }}
          value={props.sessionId}
          onChange={props.onSessionChange}
        />
      </Section>

      <Section title="Détails">
        {/* Discipline : trois boutons radio, le choisi en vert doux */}
        <View style={{ flexDirection: 'row', gap: 8 }} accessibilityRole="radiogroup">
          {DISCIPLINE_ITEMS.map((item) => {
            const on = props.discipline === item.key;
            return (
              <Pressable
                key={item.key}
                accessibilityRole="radio"
                accessibilityState={{ checked: on }}
                onPress={() => props.onDisciplineChange(on ? null : item.key)}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 6,
                  borderWidth: 1.5,
                  borderColor: on ? theme.colors.secondary.base : theme.colors.border,
                  backgroundColor: on ? theme.colors.soft : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  size="sm"
                  extraBold
                  style={{ color: on ? theme.colors.softText : theme.colors.text }}
                >
                  {item.short}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Dropdown
          items={SHOES_ITEMS}
          label="Chaussons utilisés"
          placeholder="Aucun"
          icon={{ name: 'StarRegular' }}
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

export { formatSession, gradeTier };
