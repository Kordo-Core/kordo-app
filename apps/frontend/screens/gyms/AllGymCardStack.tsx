import { useState } from 'react';
import { View, ImageBackground, Dimensions, LayoutChangeEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  SharedValue,
} from 'react-native-reanimated';
import { Card, Tag, Text, theme } from 'kordo-ui';
import { Gym } from '../../fake_data/gyms.fake';

/**
 * Pile de cartes de salles en profondeur, façon « deck » vertical, parcourue par glissement.
 *
 * Modèle : une unique valeur partagée `progress` (de 0 à count-1) représente la position
 * continue dans la pile. Aucune carte n'est réordonnée ni recyclée — chaque carte calcule
 * sa position uniquement à partir de son rang relatif `r = index - progress` :
 *   - r = 0  → carte de devant (la plus grande, en bas, infos visibles)
 *   - r > 0  → cartes à venir : escalier vers le haut, de plus en plus petites
 *   - r < 0  → cartes déjà passées : plongent vers le bas en grossissant et en s'effaçant
 *
 * Le geste fait varier `progress` en continu (scrub), borné entre la première et la dernière
 * carte : on peut donc parcourir toute la pile et revenir, sans boucle.
 *
 * La carte de devant est volontairement plus haute que la zone visible : elle déborde et se
 * fait couper par le bas (overflow hidden). Le bloc d'infos est donc remonté de `contentBottom`
 * pour rester dans la zone affichée, tandis que le gradient reste ancré au bas réel de la carte.
 */

const AnimatedCard = Animated.createAnimatedComponent(Card);

// --- Réglages de la pile (tous ajustables sans toucher à la logique) ---

// Nombre de cartes qui dépassent vers le haut (à venir) derrière la carte de devant
const MAX_BACK = 3;
// Espace vertical (px) entre deux cartes consécutives dans la profondeur (escalier du haut)
const PEEK_Y = 64;
// Distance (px) que parcourt vers le bas une carte quand elle passe devant et s'efface
const EXIT_DROP = 200;
// Grossissement appliqué à la carte qui passe devant pendant sa descente
const EXIT_SCALE = 0.12;
// Réduction d'échelle par rang des cartes à venir (escalier du haut)
const SCALE_STEP = 0.06;
// Échelle minimale (cartes les plus lointaines) et maximale (cartes passées les plus proches)
const SCALE_MIN = 0.6;
const SCALE_MAX = 1.25;
// Distance de glissement (px) à parcourir pour avancer d'une carte
const DRAG_PER_CARD = 140;
// Ressort d'aimantation appliqué à `progress` quand on relâche le geste
const SPRING = { damping: 26, stiffness: 180 };

// Borne une valeur dans [min, max]. Suffixé « Worklet » car appelé aussi bien sur le thread JS
// que dans les worklets Reanimated (UI thread), d'où la directive 'worklet'.
function clampWorklet(v: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(v, min), max);
}

interface CardItemProps {
  /** Position fixe de la carte dans le tableau `gyms` (sert de référence pour le rang relatif) */
  index: number;
  /** Nombre total de cartes (pour calculer le z-index) */
  count: number;
  /** Position continue partagée dans la pile, pilotée par le geste */
  progress: SharedValue<number>;
  /** Largeur d'une carte (px) */
  width: number;
  /** Hauteur de la carte de devant (px), volontairement débordante */
  height: number;
  /** Décalage vertical de la carte de devant, laissant la place à l'escalier au-dessus */
  baseOffset: number;
  /** Remontée à appliquer au bloc d'infos pour compenser le débordement bas de la carte */
  contentBottom: number;
  gym: Gym;
}

function CardItem({
  index,
  count,
  progress,
  width,
  height,
  baseOffset,
  contentBottom,
  gym,
}: CardItemProps) {
  // Style de la carte : position/échelle/opacité dérivées en continu du rang relatif `r`.
  // Recalculé sur le thread UI à chaque frame pendant le geste (worklet Reanimated).
  const animStyle = useAnimatedStyle(() => {
    // Rang relatif : 0 = carte de devant, >0 = à venir (derrière/haut), <0 = passée (devant/bas)
    const r = index - progress.value;
    // Composante « escalier du haut » : bornée à [0, MAX_BACK] pour les cartes à venir
    const back = clampWorklet(Math.max(r, 0), 0, MAX_BACK);
    // Composante « sortie par le bas » : bornée à [-1, 0] pour la carte qui passe devant
    const front = clampWorklet(Math.min(r, 0), -1, 0);

    // translateY : remonte d'un cran par carte à venir (PEEK_Y), plonge fortement à la sortie (EXIT_DROP).
    // `front` étant négatif, `- front * EXIT_DROP` ajoute un déplacement vers le bas.
    const translateY = baseOffset - back * PEEK_Y - front * EXIT_DROP;
    // Échelle : rétrécit en s'éloignant vers le haut, grossit en passant devant, bornée pour rester lisible
    const scale = clampWorklet(1 - back * SCALE_STEP - front * EXIT_SCALE, SCALE_MIN, SCALE_MAX);
    // z-index : plus le rang est faible (carte proche/devant), plus elle passe au-dessus.
    // ×10 pour garder un ordre stable malgré l'arrondi sur les valeurs fractionnaires de `r`.
    const zIndex = Math.round((count - r) * 10);
    // Opacité : pleine pour la carte de devant et les cartes à venir (r ≥ 0) ; la carte qui passe
    // (r entre 0 et -1) s'efface pour révéler le dessous, et réapparaît si on slide en sens inverse.
    const opacity = clampWorklet(1 + r, 0, 1);

    return {
      position: 'absolute',
      alignSelf: 'center',
      width,
      height,
      borderRadius: theme.borderRadius.square,
      zIndex,
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  // Opacité du bloc d'infos : ne s'affiche que sur la carte de devant et s'estompe vite (×1.5) dès
  // qu'elle recule, pour que les cartes de derrière restent visuellement « vides ».
  const infoStyle = useAnimatedStyle(() => {
    const r = index - progress.value;
    return { opacity: clampWorklet(1 - Math.abs(r) * 1.5, 0, 1) };
  });

  return (
    <AnimatedCard style={[animStyle, { backgroundColor: theme.colors.neutral.gray.light }]}>
      {/* Photo de la salle : remplit toute la carte, déborde donc avec elle par le bas */}
      <ImageBackground
        source={{ uri: gym.imageUri }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        imageStyle={{ borderRadius: theme.borderRadius.square }}
      />
      {/* Overlay du contenu, géré en fondu : gradient ancré tout en bas, infos remontées au bas visible */}
      <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, infoStyle]}>
        {/* Le gradient part toujours du bas réel de la carte et monte assez haut pour couvrir le texte */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: contentBottom + 220 }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: contentBottom,
            padding: theme.spacing.md,
            gap: theme.spacing.sm,
          }}
        >
          <Tag title={gym.shortName} appearance="primary" />
          <View>
            <Text appearance="white" size={'lg'} extraBold>
              {gym.name}
            </Text>
            <Text appearance="white" bold>
              {gym.address}
            </Text>
          </View>
        </View>
      </Animated.View>
    </AnimatedCard>
  );
}

interface Props {
  /** Salles à empiler ; l'ordre du tableau définit l'ordre de parcours de la pile */
  gyms: Gym[];
  /** Largeur d'une carte (px). Défaut : largeur d'écran moins les marges latérales */
  cardWidth?: number;
  /** Hauteur de la carte de devant (px). Défaut : 62 % de la hauteur d'écran (déborde volontairement) */
  cardHeight?: number;
}

export function AllGymCardStack({ gyms, cardWidth, cardHeight }: Props) {
  const count = gyms.length;
  const width = cardWidth ?? Dimensions.get('window').width - theme.spacing.lg * 2;
  // Carte de devant volontairement très haute : elle déborde et se fait couper par le bas du conteneur
  const frontHeight = cardHeight ?? Math.round(Dimensions.get('window').height * 0.62);
  // Décalage de base pour laisser la place aux cartes à venir qui remontent au-dessus de la carte de devant
  const baseOffset = MAX_BACK * PEEK_Y;

  // Hauteur réellement affichée du conteneur, mesurée au layout. Initialisée à une estimation pour
  // éviter un saut visuel à la première frame, puis corrigée par `onLayout`.
  const [visibleHeight, setVisibleHeight] = useState(Math.round(Dimensions.get('window').height * 0.5));
  // De combien la carte de devant dépasse en bas = (haut de carte + sa hauteur) - hauteur visible.
  // On remonte le bloc d'infos d'autant, plus une marge de respiration, pour qu'il reste à l'écran.
  const contentBottom =
    Math.max(baseOffset + frontHeight - visibleHeight, 0) + theme.spacing.lg;

  // Position continue dans la pile : 0 = première carte devant, count-1 = dernière carte devant
  const progress = useSharedValue(0);
  // Mémorise `progress` au début du geste pour appliquer le déplacement relatif du doigt
  const start = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      start.value = progress.value;
    })
    .onUpdate((e) => {
      // Glisser vers le bas fait avancer dans la pile ; bornage strict entre la première et la dernière carte
      progress.value = clampWorklet(start.value + e.translationY / DRAG_PER_CARD, 0, count - 1);
    })
    .onEnd((e) => {
      // Projette un léger élan à partir de la vitesse de relâchement, puis aimante sur la carte la plus proche
      const projected = progress.value + (e.velocityY / DRAG_PER_CARD) * 0.08;
      const target = clampWorklet(Math.round(projected), 0, count - 1);
      progress.value = withSpring(target, SPRING);
    });

  return (
    <GestureDetector gesture={pan}>
      {/* flex: 1 pour occuper la hauteur restante, overflow hidden pour couper la carte de devant en bas */}
      <View
        style={{ flex: 1, overflow: 'hidden' }}
        onLayout={(e: LayoutChangeEvent) => setVisibleHeight(e.nativeEvent.layout.height)}
      >
        {/* Toutes les cartes sont rendues en absolu et se chevauchent ; `progress` (partagé) décide
            en continu de leur position. La key reste l'id de la salle : aucune carte n'est réordonnée. */}
        {gyms.map((gym, i) => (
          <CardItem
            key={gym.id}
            index={i}
            count={count}
            progress={progress}
            width={width}
            height={frontHeight}
            baseOffset={baseOffset}
            contentBottom={contentBottom}
            gym={gym}
          />
        ))}
      </View>
    </GestureDetector>
  );
}
