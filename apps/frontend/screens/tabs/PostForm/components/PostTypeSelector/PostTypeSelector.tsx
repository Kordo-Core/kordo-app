import { useTheme } from '@emotion/react';
import { Icon, Text } from 'kordo-ui';
import { PostTypeDefinition, PostTypeSelectorProps } from './PostTypeSelector.types';
import * as Styled from './PostTypeSelector.styles';

const TYPES: PostTypeDefinition[] = [
  { key: 'activity', label: 'Activity', icon: 'PersonRegular' },
  { key: 'publication', label: 'Poste', icon: 'ImageRegular' },
  { key: 'message', label: 'Message', icon: 'ChatRegular' },
  { key: 'now', label: 'Now', icon: 'LocationRegular' },
];

export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  const theme = useTheme();

  return (
    <Styled.Row>
      {TYPES.map((type) => {
        const selected = value === type.key;
        return (
          <Styled.TypeWrapper key={type.key}>
            <Styled.TypeCard selected={selected} onPress={() => onChange(type.key)}>
              <Icon
                name={type.icon}
                size={28}
                color={selected ? theme.colors.primary.base : theme.colors.neutral.white}
              />
            </Styled.TypeCard>
            <Text size="sm" appearance="gray">
              {type.label}
            </Text>
          </Styled.TypeWrapper>
        );
      })}
    </Styled.Row>
  );
}
