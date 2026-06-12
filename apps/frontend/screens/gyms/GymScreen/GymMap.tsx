import { useMemo, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { theme } from 'kordo-ui';
import { Sector, SECTOR_MAP_VIEWBOX } from '../../../fake_data';

interface GymMapProps {
  sectors: Sector[];
  selectedSectorId: string | null;
  onSelectSector: (sectorId: string | null) => void;
}

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

export function GymMap({ sectors, selectedSectorId, onSelectSector }: GymMapProps) {
  const centers = useMemo(() => sectors.map((s) => centroid(s.path)), [sectors]);
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const toggle = (sectorId: string, selected: boolean) =>
    onSelectSector(selected ? null : sectorId);

  return (
    <View onLayout={onLayout} style={{ width: '100%', paddingBottom: theme.spacing.xxl }}>
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
                fill={selected ? theme.colors.secondary.base : theme.colors.neutral.gray.light}
                stroke={theme.colors.neutral.white}
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
                fill={selected ? theme.colors.neutral.white : theme.colors.neutral.gray.base}
                onPressIn={() => toggle(sector.id, selected)}
              >
                {index + 1}
              </SvgText>
            );
          })}
        </Svg>
      )}
    </View>
  );
}
