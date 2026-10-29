import * as Styled from './Pivots.styles';
import { PivotsProps } from './Pivots.types';
import { Text } from '../../atoms/Text/Text';
import { useEffect, useRef, useState } from 'react';
import { HostInstance } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SLIDE_DURATION = 200;
// Débord du trait de part et d'autre du libellé
const LINE_PADDING = 4;

export const Pivots: React.FC<PivotsProps> = (props) => {
  // 1. Quel pivot est sélectionné — un libellé, initialisé par le prop.
  const [selectedPivot, setSelectedPivot] = useState(props.selectedPivot);

  // 2. Le nœud de chaque pivot, indexé par ce même libellé. Une ref et non un état : elle est
  // renseignée avant que les effets tournent, donc la sélection par défaut est mesurable dès le
  // montage — ce qu'un nœud récupéré depuis `onPress` ne permettait pas, faute de clic.
  const pivotNodes = useRef<Record<string, HostInstance | null>>({});

  // Position et largeur animées du trait
  const lineLeft = useSharedValue(0);
  const lineWidth = useSharedValue(0);

  useEffect(() => {
    const node = pivotNodes.current[selectedPivot];
    if (!node) return;

    // Signature complète : (x, y, width, height, pageX, pageY). `y` doit être nommé pour
    // atteindre `width`, qui est le troisième argument et non le second.
    node.measure((x, _, width) => {
      // Une largeur nulle signifie qu'aucune mesure n'est encore arrivée : la première pose se
      // fait donc sans transition, sinon le trait glisserait du bord gauche jusqu'au pivot par
      // défaut à l'affichage du composant.
      const duration = lineWidth.value === 0 ? 0 : SLIDE_DURATION;

      lineLeft.value = withTiming(x - LINE_PADDING, { duration });
      lineWidth.value = withTiming(width + LINE_PADDING * 2, { duration });
    });
  }, [selectedPivot, lineLeft, lineWidth]);

  const lineStyle = useAnimatedStyle(() => ({
    left: lineLeft.value,
    width: lineWidth.value,
  }));

  return (
    <Styled.Container style={props.style}>
      {props.pivots.map((pivot) => (
        <Text
          key={pivot}
          ref={(node) => {
            pivotNodes.current[pivot] = node;
          }}
          onPress={() => {
            setSelectedPivot(pivot);
            props.onPivotChange?.(pivot);
          }}
        >
          {pivot}
        </Text>
      ))}

      <Styled.Line style={lineStyle} />
    </Styled.Container>
  );
};
