import { useMemo, useState } from 'react';
import { GestureResponderEvent, LayoutChangeEvent, Pressable, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { SECTOR_MAP_VIEWBOX } from '../../../../../../fake_data';
import { GymMapProps } from './GymMap.types';

// viewBox 280 x 251 → ratio hauteur/largeur
const MAP_RATIO = 251 / 280;
const MAP_MAX_WIDTH = 300;

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

// Sommets d'un tracé « M x,y L x,y … Z » (polygone)
function vertices(path: string): [number, number][] {
  const nums = path.match(/-?d+(?:.d+)?/g)?.map(Number) ?? [];
  const pts: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
  return pts;
}

// Point dans un polygone (lancer de rayon)
function inside(x: number, y: number, poly: [number, number][]): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Plan des secteurs de la salle : toucher un secteur filtre la liste des blocs.
export function GymMap({ sectors, selectedSectorId, onSelectSector }: GymMapProps) {
  const theme = useTheme();
  const centers = useMemo(() => sectors.map((s) => centroid(s.path)), [sectors]);
  const polygons = useMemo(() => sectors.map((s) => vertices(s.path)), [sectors]);
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(Math.min(MAP_MAX_WIDTH, e.nativeEvent.layout.width - 28));

  const toggle = (sectorId: string, selected: boolean) =>
    onSelectSector(selected ? null : sectorId);

  // Un seul appui sur tout le plan, puis recherche du secteur sous le doigt : les onPress posés sur
  // chaque tracé SVG ne se déclenchaient plus sur Android (ni sur le web, où l'appui était écouté
  // à part). Le point touché est ramené dans le repère du viewBox (280 de large).
  const onPress = (e: GestureResponderEvent) => {
    if (width === 0) return;
    const scale = 280 / width;
    // Web : l'événement est celui du DOM, la position y est offsetX / offsetY
    const ne = e.nativeEvent as GestureResponderEvent['nativeEvent'] & {
      offsetX?: number;
      offsetY?: number;
    };
    const x = (ne.locationX ?? ne.offsetX ?? 0) * scale;
    const y = (ne.locationY ?? ne.offsetY ?? 0) * scale;
    let index = polygons.findIndex((poly) => inside(x, y, poly));
    // Appui sur un liseré entre deux secteurs : le centre le plus proche, à 14 unités près
    if (index === -1) {
      let best = Infinity;
      centers.forEach((c, i) => {
        const d = Math.hypot(c.x - x, c.y - y);
        if (d < best && d < 14) {
          best = d;
          index = i;
        }
      });
    }
    if (index === -1) return;
    const id = sectors[index].id;
    toggle(id, id === selectedSectorId);
  };

  return (
    <View
      onLayout={onLayout}
      style={{ alignItems: 'center', paddingHorizontal: 14, paddingBottom: 14 }}
    >
      {width > 0 && (
        // Dimensions numériques (et non %) : indispensable pour que le onPress des Path
        // soit fiable sur Android.
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel="Plan de la salle : toucher un secteur pour filtrer"
        >
          <Svg
            width={width}
            height={width * MAP_RATIO}
            viewBox={SECTOR_MAP_VIEWBOX}
            pointerEvents="none"
          >
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
                >
                  {index + 1}
                </SvgText>
              );
            })}
          </Svg>
        </Pressable>
      )}
    </View>
  );
}
