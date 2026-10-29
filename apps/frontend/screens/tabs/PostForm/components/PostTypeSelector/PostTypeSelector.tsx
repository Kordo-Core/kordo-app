import { useTheme } from '@emotion/react';
import { Icon, Text } from 'kordo-ui';
import { PostTypeDefinition, PostTypeSelectorProps } from './PostTypeSelector.types';
import * as Styled from './PostTypeSelector.styles';

const TYPES: PostTypeDefinition[] = [
  { key: 'activity', label: 'Activité', icon: 'PersonRegular' },
  { key: 'publication', label: 'Poste', icon: 'ImageRegular' },
  { key: 'message', label: 'Message', icon: 'ChatRegular' },
  { key: 'now', label: 'Now', icon: 'LocationRegular' },
];

// Quatre tuiles carrées : la tuile choisie passe en encre pleine (design D)
export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  const theme = useTheme();

  return (
    <Styled.Row accessibilityRole="tablist">
      {TYPES.map((type) => {
        const selected = value === type.key;
        const color = selected ? theme.colors.background : theme.colors.text;
        return (
          <Styled.TypeCard
            key={type.key}
            selected={selected}
            onPress={() => onChange(type.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Icon name={type.icon} size={22} color={color} />
            <Text size="xs" extraBold style={{ color }}>
              {type.label}
            </Text>
          </Styled.TypeCard>
        );
      })}
    </Styled.Row>
  );
}
