import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { RadioGroupProps } from './RadioGroup.types';
import { Radio } from '../../atoms/Radio/Radio';

// Groupe d'options exclusives : une seule valeur sélectionnée, tenue par le parent.
// Chaque option peut porter un contenu à gauche (vignette de thème, icône…).
export const RadioGroup = <T extends string>({
  options,
  value,
  onChange,
  appearance,
  gap,
  style,
}: RadioGroupProps<T>) => {
  const theme = useTheme();

  return (
    <View accessibilityRole="radiogroup" style={[{ gap: gap ?? theme.spacing.lg }, style]}>
      {options.map((option) => (
        <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {option.left}
          <Radio
            selected={option.value === value}
            onSelect={() => onChange(option.value)}
            label={option.label}
            description={option.description}
            appearance={appearance}
            disabled={option.disabled}
            style={{ flex: 1 }}
          />
        </View>
      ))}
    </View>
  );
};
