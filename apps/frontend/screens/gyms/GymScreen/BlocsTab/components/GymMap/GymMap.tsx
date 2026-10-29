import { useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';
import { SECTOR_MAP_VIEWBOX } from '../../../../../../fake_data';
import { GymMapProps } from './GymMap.types';

// viewBox 280 x 251 → ratio hauteur/largeur
const MAP_RATIO = 251 / 280;

// Centre approximatif d'un tracé (moyenne des sommets) pour positionner le numéro
function centroid(path: string): { x: number; y: number } {
  const nums = path.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  let sx = 0;
  let sy = 0;
  let count = 0;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    sx += nums[i];
    sy += nums[i + 1];
    count += 1;
  }
  return count ? { x: sx / count, y: sy / count } : { x: 0, y: 0 };
}

export function GymMap({
  sectors,
  selectedSectorId,
  onSelectSector,
  grades,
  onSelectGrade,
}: GymMapProps) {
  const theme = useTheme();
  const centers = useMemo(() => sectors.map((s) => centroid(s.path)), [sectors]);
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const toggle = (sectorId: string, selected: boolean) =>
    onSelectSector(selected ? null : sectorId);

  return (
    // Carte du plan (design D) : plan des secteurs dans une carte arrondie, puis le filtre par
    // couleur de prise. Toucher un secteur ou une couleur filtre la liste des blocs.
    <View
      style={{
        width: '100%',
        padding: theme.spacing.md + 2,
        gap: theme.spacing.md,
        borderRadius: theme.borderRadius.card,
        backgroundColor: theme.colors.surface,
        boxShadow: theme.shadows.md,
      }}
    >
      <View onLayout={onLayout} style={{ width: '100%' }}>
        {width > 0 && (
          // Dimensions numériques (et non %) : indispensable pour que le onPress des Path
          // soit fiable sur Android.
          <Svg width={width} height={width * MAP_RATIO} viewBox={SECTOR_MAP_VIEWBOX}>
            {sectors.map((sector) => {
              const selected = sector.id === selectedSectorId;
              return (
                <Path
                  key={sector.id}
                  d={sector.path}
                  fill={selected ? theme.colors.secondary.base : theme.colors.surfaceAlt}
                  stroke={theme.colors.surface}
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  onPressIn={() => toggle(sector.id, selected)}
                />
              );
            })}
            {sectors.map((sector, index) => {
              const selected = sector.id === selectedSectorId;
              const center = centers[index];
              return (
                <SvgText
                  key={`${sector.id}-label`}
                  x={center.x}
                  y={center.y + 3}
                  fontSize={9}
                  fontWeight="700"
                  textAnchor="middle"
                  fill={selected ? theme.colors.neutral.white : theme.colors.textMuted}
                  onPressIn={() => toggle(sector.id, selected)}
                >
                  {index + 1}
                </SvgText>
              );
            })}
          </Svg>
        )}
      </View>

      {grades && grades.length > 0 && (
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {grades.map((g, i) => (
            <Pressable
              key={g.label}
              accessibilityRole="button"
              accessibilityLabel={`Couleur ${g.label}`}
              accessibilityState={{ selected: g.selected }}
              onPress={() => onSelectGrade?.(g.selected ? null : i)}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                backgroundColor: theme.colors.surfaceAlt,
                borderWidth: 2,
                borderColor: g.selected ? g.color : 'transparent',
              }}
            >
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: g.color,
                  borderWidth: 1,
                  borderColor: 'rgba(127,127,127,0.25)',
                }}
              />
              <Text size="xs" extraBold>
                {g.count}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
