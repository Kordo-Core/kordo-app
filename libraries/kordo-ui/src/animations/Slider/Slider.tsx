import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  SharedValue,
} from 'react-native-reanimated';
import { SliderProps } from './Slider.types';
import * as Styled from './Slider.styles';

// --- Réglages du mode sélection (atténuation des items en s'éloignant du centre) ---
const SCALE_FALLOFF = 0.25;
const OPACITY_FALLOFF = 0.6;
const SCALE_MIN = 0.8;
const OPACITY_MIN = 0.35;

function clampWorklet(v: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(v, min), max);
}

interface SelectItemProps {
  index: number;
  fixedWidth?: number;
  marginRight: number;
  center: number;
  containerWidth: number;
  pitch: number;
  scrollX: SharedValue<number>;
  onMeasure: (index: number, width: number) => void;
  child: React.ReactNode;
}

// Un slot du sélecteur : mesure sa largeur réelle, puis se met en avant quand son centre approche
// du centre du viewport (plein/grand), et s'estompe/rétrécit en s'éloignant.
function SelectItem({
  index,
  fixedWidth,
  marginRight,
  center,
  containerWidth,
  pitch,
  scrollX,
  onMeasure,
  child,
}: SelectItemProps) {
  const animStyle = useAnimatedStyle(() => {
    // Centre du viewport exprimé dans les coordonnées du contenu défilant
    const viewportCenter = scrollX.value + containerWidth / 2;
    // Distance au centre, normalisée par l'écart moyen entre items → « nombre d'items » d'écart
    const distance = Math.abs(viewportCenter - center) / (pitch || 1);
    const scale = clampWorklet(1 - distance * SCALE_FALLOFF, SCALE_MIN, 1);
    const opacity = clampWorklet(1 - distance * OPACITY_FALLOFF, OPACITY_MIN, 1);
    return { transform: [{ scale }], opacity };
  }, [center, containerWidth, pitch]);

  return (
    <Animated.View
      onLayout={(e: LayoutChangeEvent) => onMeasure(index, e.nativeEvent.layout.width)}
      style={[
        { width: fixedWidth, marginRight, alignItems: 'center', justifyContent: 'center' },
        animStyle,
      ]}
    >
      {child}
    </Animated.View>
  );
}

// Mode « sélection » : défilement aimanté où chaque item s'accroche au centre avec une résistance.
// Fonctionne avec des items de n'importe quelle largeur (texte court comme cards larges) car les
// points d'accroche sont calculés à partir de la largeur réelle mesurée de chaque item.
const SelectSlider: FC<SliderProps> = (props) => {
  const items = React.Children.toArray(props.children);
  const selectedIndex = props.selectedIndex ?? 0;
  const gap = props.gap ?? 0;

  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  // Largeur mesurée de chaque item (0 tant que pas encore mesuré)
  const [widths, setWidths] = useState<number[]>(() => items.map(() => 0));

  const handleMeasure = (index: number, width: number) => {
    setWidths((prev) => {
      if (prev[index] === width) return prev;
      const next = [...prev];
      next[index] = width;
      return next;
    });
  };

  // Padding asymétrique calé sur le 1er/dernier item : leur centre tombe pile au centre du viewport
  // pour un offset de 0 (resp. au scroll max), donc aucun espace vide scrollable aux extrémités.
  const firstWidth = widths[0] || 0;
  const lastWidth = widths[items.length - 1] || 0;
  const padLeft = Math.max(containerWidth / 2 - firstWidth / 2, 0);
  const padRight = Math.max(containerWidth / 2 - lastWidth / 2, 0);
  // Centre de chaque item dans les coordonnées du contenu (padding + largeurs + gaps cumulés).
  // Le gap est ajouté entre les items seulement (pas après le dernier) pour ne pas créer de vide.
  const centers: number[] = [];
  let acc = padLeft;
  for (let i = 0; i < items.length; i++) {
    const w = widths[i] || 0;
    centers[i] = acc + w / 2;
    acc += w + (i < items.length - 1 ? gap : 0);
  }
  // Offset de scroll qui centre chaque item → points d'accroche du snap
  const snapOffsets = centers.map((c) => Math.max(c - containerWidth / 2, 0));
  // Écart moyen entre centres : sert d'unité pour normaliser l'atténuation (1 = un item d'écart)
  const ready = widths.length === items.length && widths.every((w) => w > 0);
  const pitch =
    items.length > 1 && ready
      ? (centers[items.length - 1] - centers[0]) / (items.length - 1)
      : widths[0] || 160;

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  // Recale l'offset sur l'item sélectionné (sélection externe, ou une fois les mesures prêtes)
  useEffect(() => {
    if (!ready) return;
    scrollRef.current?.scrollTo({ x: snapOffsets[selectedIndex] ?? 0, animated: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, ready]);

  // À la fin du défilement, sélectionne l'item dont le point d'accroche est le plus proche
  const handleSettle = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    let best = 0;
    let bestDistance = Infinity;
    snapOffsets.forEach((offset, i) => {
      const d = Math.abs(offset - x);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    if (best !== selectedIndex) props.onChange?.(best);
  };

  return (
    <Styled.SliderContainer
      height={props.height}
      onLayout={(e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        // Snap sur les centres mesurés → résistance/aimantation quelle que soit la largeur des items
        snapToOffsets={snapOffsets}
        decelerationRate="fast"
        contentContainerStyle={{ paddingLeft: padLeft, paddingRight: padRight }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleSettle}
        onScrollEndDrag={handleSettle}
      >
        {items.map((child, index) => (
          <SelectItem
            key={index}
            index={index}
            fixedWidth={props.itemWidth}
            marginRight={index < items.length - 1 ? gap : 0}
            center={centers[index]}
            containerWidth={containerWidth}
            pitch={pitch}
            scrollX={scrollX}
            onMeasure={handleMeasure}
            child={child}
          />
        ))}
      </Animated.ScrollView>
    </Styled.SliderContainer>
  );
};

// Composant de défilement horizontal. Par défaut : carrousel libre espacé par `gap`.
// Avec `selectMode`, devient un sélecteur aimanté qui centre et met en avant l'item sélectionné.
export const Slider: FC<SliderProps> = (props) => {
  if (props.selectMode) return <SelectSlider {...props} />;

  return (
    <Styled.SliderContainer height={props.height ?? 0} style={props.style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: props.gap ?? 0,
        }}
      >
        {/* Itère sur chaque enfant pour l'envelopper individuellement avec l'espacement approprié */}
        {React.Children.map(props.children, (child, index) => (
          <Styled.ItemWrapper
            key={index}
            gap={props.gap ?? 0}
            index={index}
            lastChild={props.children.length}
          >
            {child as React.ReactElement}
          </Styled.ItemWrapper>
        ))}
      </ScrollView>
    </Styled.SliderContainer>
  );
};
