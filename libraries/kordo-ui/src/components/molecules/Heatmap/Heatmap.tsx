import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { HeatmapProps } from './Heatmap.types';
import { Text } from '../../atoms/Text/Text';

const GAP = 4;

// Grille de régularité (design D) : une colonne par semaine, une case par jour, colorée selon
// l'intensité. Les cases peuvent être sélectionnées pour afficher le détail du jour.
export const Heatmap: React.FC<HeatmapProps> = ({
  values,
  rows = 7,
  colors,
  selectedIndex,
  onSelect,
  cellLabel,
  legend,
  style,
}) => {
  const theme = useTheme();
  const scale = colors ?? [theme.colors.border, '#BFF5DB', '#1FA874', theme.colors.secondary.base];
  const columns = Math.ceil(values.length / rows);

  return (
    <View style={[{ gap: theme.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', gap: GAP }}>
        {Array.from({ length: columns }, (_, c) => (
          <View key={c} style={{ flex: 1, gap: GAP }}>
            {Array.from({ length: rows }, (_, r) => {
              const i = c * rows + r;
              if (i >= values.length) return <View key={r} style={{ aspectRatio: 1 }} />;
              const level = Math.max(0, Math.min(scale.length - 1, values[i]));
              return (
                <Pressable
                  key={r}
                  disabled={!onSelect}
                  onPress={() => onSelect?.(i)}
                  accessibilityLabel={cellLabel?.(i)}
                  accessibilityState={{ selected: i === selectedIndex }}
                  style={{
                    aspectRatio: 1,
                    borderRadius: 3,
                    backgroundColor: scale[level],
                    borderWidth: i === selectedIndex ? 2 : 0,
                    borderColor: theme.colors.text,
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>
      {legend && (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}
        >
          <Text size="xs" appearance="gray">
            {legend.less}
          </Text>
          {scale.map((c) => (
            <View key={c} style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: c }} />
          ))}
          <Text size="xs" appearance="gray">
            {legend.more}
          </Text>
        </View>
      )}
    </View>
  );
};
