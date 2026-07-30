import styled from '@emotion/styled';
import { createRNPrimitive } from './rn-primitives';
import { viewDefaults } from './rn-style';

// Stub de BlurView pour Storybook (expo-blur est un module natif : son build expose du JSX
// dans des fichiers .js, qu'esbuild refuse de parser).
//
// Côté natif c'est une View : elle doit donc porter les défauts react-native-web. Sans eux la
// div retombe en `display: block`, le `flexDirection: 'row'` du conteneur reste sans effet et
// les segments en `flex: 1` prennent chacun toute la largeur — l'indicateur du
// SegmentedControl s'étalait alors sur la totalité du contrôle.
export const BlurView = styled(createRNPrimitive('div', 'view'))(viewDefaults);
