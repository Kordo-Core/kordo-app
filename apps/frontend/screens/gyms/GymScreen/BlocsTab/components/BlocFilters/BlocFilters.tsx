import { useEffect, useState } from 'react';
import { LayoutChangeEvent, Modal, Pressable, ScrollView, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Icon, motion, Text } from 'kordo-ui';
import { TAGS, TagGroup } from '../../../../../../fake_data';
import { BlocFiltersProps, BlocSort, LEVEL_LABELS, SORTS } from './BlocFilters.types';

const GROUPS: { group: TagGroup; title: string }[] = [
  { group: 'hand', title: 'Prise de main' },
  { group: 'foot', title: 'Prise de pied' },
  { group: 'body', title: 'Physique' },
];

const KNOB = 26;

// Puce d'étiquette : la coche glisse depuis la gauche quand elle est sélectionnée
function TagChip({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  const theme = useTheme();
  const check = useSharedValue(on ? 1 : 0);
  useEffect(() => {
    check.value = withTiming(on ? 1 : 0, { duration: 250 });
  }, [on, check]);
  const checkStyle = useAnimatedStyle(() => ({ width: 16 * check.value, opacity: check.value }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: on }}
      style={({ pressed }) => ({
        height: 38,
        paddingHorizontal: 14,
        borderRadius: theme.borderRadius.square,
        borderWidth: 1.5,
        borderColor: on ? theme.colors.secondary.base : theme.colors.border,
        backgroundColor: on ? theme.colors.soft : 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        // La maquette garde l'écart de 6 px même sans coche (emplacement vide)
        gap: 6,
        transform: [{ scale: pressed ? motion.pressScale : 1 }],
      })}
    >
      <Animated.View style={[{ overflow: 'hidden' }, checkStyle]}>
        <Icon name="CheckmarkRegular" size={14} color={theme.colors.secondary.base} />
      </Animated.View>
      <Text size="sm" bold style={{ color: on ? theme.colors.secondary.base : theme.colors.text }}>
        {label}
      </Text>
    </Pressable>
  );
}

// Curseur du niveau maximum : six crans, au doigt ou au tap
function LevelSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const steps = LEVEL_LABELS.length - 1;
  const pos = useSharedValue(value / steps);
  useEffect(() => {
    pos.value = withSpring(value / steps, motion.glide);
  }, [value, steps, pos]);

  const pick = (x: number) => {
    if (!width) return;
    onChange(Math.round(Math.max(0, Math.min(1, x / width)) * steps));
  };
  const pan = Gesture.Pan()
    .minDistance(0)
    .onBegin((e) => runOnJS(pick)(e.x))
    .onUpdate((e) => runOnJS(pick)(e.x));

  const fillStyle = useAnimatedStyle(() => ({ width: pos.value * width }));
  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pos.value * width - KNOB / 2 }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <View
        onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
        accessibilityRole="adjustable"
        accessibilityLabel="Niveau maximum"
        accessibilityValue={{ text: LEVEL_LABELS[value] }}
        style={{ height: 34, justifyContent: 'center' }}
      >
        <View style={{ height: 6, borderRadius: 3, backgroundColor: theme.colors.border }} />
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.colors.secondary.base,
            },
            fillStyle,
          ]}
        />
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              width: KNOB,
              height: KNOB,
              borderRadius: KNOB / 2,
              backgroundColor: theme.colors.surface,
              borderWidth: 3,
              borderColor: theme.colors.secondary.base,
              boxShadow: theme.shadows.md,
            },
            knobStyle,
          ]}
        />
      </View>
    </GestureDetector>
  );
}

// Blocs · Filtres (design D) : volet qui monte du bas, tri, étiquettes par famille, niveau
// maximum ; le bouton du bas annonce le nombre de blocs qui restent. Les choix s'appliquent
// tout de suite à la liste.
export function BlocFilters({
  isOpen,
  onClose,
  sort,
  onSortChange,
  tagIds,
  onTagIdsChange,
  maxLevel,
  onMaxLevelChange,
  resultCount,
}: BlocFiltersProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const activeFilters = tagIds.size + (maxLevel < LEVEL_LABELS.length - 1 ? 1 : 0);

  const toggleTag = (id: string) => {
    const next = new Set(tagIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onTagIdsChange(next);
  };
  const reset = () => {
    onSortChange('date');
    onTagIdsChange(new Set());
    onMaxLevelChange(LEVEL_LABELS.length - 1);
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Pressable
          onPress={onClose}
          accessibilityLabel="Fermer les filtres"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `rgba(${theme.colors.scrim}, 0.5)`,
          }}
        />
        <View
          accessibilityViewIsModal
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 120,
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              width: 40,
              height: 5,
              borderRadius: 3,
              marginTop: 10,
              marginBottom: 4,
              backgroundColor: theme.colors.border,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingTop: 6,
              paddingBottom: 10,
            }}
          >
            <Text variant="display" size={40} style={{ flex: 1 }}>
              Filtres
            </Text>
            <Pressable
              onPress={reset}
              accessibilityRole="button"
              style={({ pressed }) => ({
                height: 36,
                paddingHorizontal: 12,
                borderRadius: theme.borderRadius.square,
                justifyContent: 'center',
                backgroundColor: theme.colors.surface,
                transform: [{ scale: pressed ? motion.pressScale : 1 }],
              })}
            >
              <Text
                size="sm"
                bold
                style={{
                  color: theme.mode === 'dark' ? theme.colors.text : theme.colors.accentText,
                }}
              >
                Réinitialiser
              </Text>
            </Pressable>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120, gap: 10 }}
          >
            <Text variant="eyebrow" size={12} style={{ marginTop: 4 }}>
              Trier par
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {SORTS.map((s) => {
                const on = s.key === sort;
                return (
                  <Pressable
                    key={s.key}
                    onPress={() => onSortChange(s.key as BlocSort)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: on }}
                    style={({ pressed }) => ({
                      height: 38,
                      paddingHorizontal: 14,
                      borderRadius: theme.borderRadius.square,
                      justifyContent: 'center',
                      backgroundColor: on ? theme.colors.soft : theme.colors.surface,
                      transform: [{ scale: pressed ? motion.pressScale : 1 }],
                    })}
                  >
                    <Text
                      size="sm"
                      bold
                      style={{ color: on ? theme.colors.secondary.base : theme.colors.text }}
                    >
                      {s.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {GROUPS.map(({ group, title }) => {
              const tags = TAGS.filter((t) => t.group === group);
              const n = tags.filter((t) => tagIds.has(t.id)).length;
              return (
                <View key={group} style={{ gap: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginTop: 12,
                    }}
                  >
                    <Text variant="eyebrow" size={12}>
                      {title}
                    </Text>
                    {n > 0 && (
                      <Text size="xs" bold appearance="gray">
                        {n} sélectionné{n > 1 ? 's' : ''}
                      </Text>
                    )}
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {tags.map((t) => (
                      <TagChip
                        key={t.id}
                        label={t.name}
                        on={tagIds.has(t.id)}
                        onPress={() => toggleTag(t.id)}
                      />
                    ))}
                  </View>
                </View>
              );
            })}

            <Text variant="eyebrow" size={12} style={{ marginTop: 12 }}>
              Niveau · {LEVEL_LABELS[maxLevel]} max
            </Text>
            <LevelSlider value={maxLevel} onChange={onMaxLevelChange} />
          </ScrollView>

          {/* Bouton de résultat, posé sur un fondu */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              paddingTop: 14,
              paddingHorizontal: 20,
              paddingBottom: insets.bottom + 34,
              backgroundColor: theme.colors.background,
            }}
          >
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              style={({ pressed }) => ({
                height: 58,
                borderRadius: theme.borderRadius.square,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                backgroundColor: theme.colors.secondary.base,
                transform: [{ scale: pressed ? motion.pressScale : 1 }],
              })}
            >
              <Text size="lg" extraBold appearance="white">
                Voir {resultCount} bloc{resultCount > 1 ? 's' : ''}
              </Text>
              {activeFilters > 0 && (
                <View
                  style={{
                    minWidth: 24,
                    height: 24,
                    paddingHorizontal: 7,
                    borderRadius: 999,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.surface,
                    boxShadow: theme.shadows.sm,
                  }}
                >
                  <Text
                    size="xs"
                    extraBold
                    style={{
                      color:
                        theme.mode === 'dark' ? theme.colors.text : theme.colors.secondary.base,
                    }}
                  >
                    {activeFilters}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}
