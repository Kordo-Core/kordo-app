import baseStyled, { CreateStyled } from '@emotion/styled';
import { textDefaults, toWebStyle, viewDefaults } from './rn-style';
import { createRNPrimitive, PrimitiveKind } from './rn-primitives';

// Les éléments interactifs héritent des règles de View, plus la remise à zéro du style natif
// du navigateur (fond, bordure, police, alignement du texte).
const pressableDefaults = {
  ...viewDefaults,
  backgroundColor: 'transparent',
  font: 'inherit',
  color: 'inherit',
  textAlign: 'inherit',
  cursor: 'pointer',
} as const;

const inputDefaults = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: '0 solid black',
  backgroundColor: 'transparent',
  font: 'inherit',
  color: 'inherit',
  outline: 'none',
} as const;

type StyleArg = unknown;

// Chaque argument de style passe par `toWebStyle` : les styles de la librairie sont écrits
// en syntaxe RN (`paddingHorizontal`, `transform: [...]`), que le navigateur ignore tel quel.
const translateArg = (arg: StyleArg): StyleArg => {
  if (typeof arg === 'function') {
    const styleFn = arg as (props: Record<string, unknown>) => unknown;
    return (props: Record<string, unknown>) => toWebStyle(styleFn(props) as never);
  }
  if (arg && typeof arg === 'object') return toWebStyle(arg as never);
  return arg;
};

type StyleFactory = (...args: StyleArg[]) => unknown;

// Enveloppe une fabrique emotion pour traduire les styles au passage.
const wrapFactory =
  (factory: StyleFactory): StyleFactory =>
  (...args) =>
    factory(...args.map(translateArg));

const emotion = baseStyled as unknown as Record<string, StyleFactory> & StyleFactory;

// La primitive porte la traduction des props RN (onPress, onLayout, refs, saisie), et emotion
// lui applique d'abord les défauts react-native-web puis les styles du composant — dans cet
// ordre, pour que les styles du composant l'emportent.
const primitive = (element: string, kind: PrimitiveKind, defaults: object) => {
  const base = emotion(createRNPrimitive(element, kind) as never) as StyleFactory;
  return wrapFactory(emotion(base(defaults) as never) as StyleFactory);
};

// `styled(Component)` et `styled.div(...)` doivent tous deux traduire leurs styles.
const styled = ((component: StyleArg) =>
  wrapFactory(emotion(component) as StyleFactory)) as unknown as CreateStyled;

for (const tag of Object.keys(baseStyled)) {
  (styled as unknown as Record<string, StyleFactory>)[tag] = wrapFactory(emotion[tag]);
}

const emotionNative = Object.assign(styled, {
  View: primitive('div', 'view', viewDefaults),
  Text: primitive('span', 'text', textDefaults),
  TouchableOpacity: primitive('button', 'pressable', pressableDefaults),
  Pressable: primitive('button', 'pressable', pressableDefaults),
  TextInput: primitive('input', 'input', inputDefaults),
  ScrollView: primitive('div', 'view', { ...viewDefaults, overflow: 'auto' }),
  FlatList: primitive('div', 'view', { ...viewDefaults, overflow: 'auto' }),
  SafeAreaView: primitive('div', 'view', viewDefaults),
  ImageBackground: primitive('div', 'view', viewDefaults),
  Image: primitive('img', 'image', {
    boxSizing: 'border-box',
    display: 'block',
    objectFit: 'cover',
  }),
});

export default emotionNative;
