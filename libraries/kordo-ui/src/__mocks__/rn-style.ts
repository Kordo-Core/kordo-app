// Traduction des styles React Native vers du CSS pour Storybook.
//
// Plusieurs propriétés RN n'existent pas en CSS : émises telles quelles, elles sont
// silencieusement ignorées par le navigateur. C'était le cas de `paddingHorizontal`
// et `paddingVertical` (20 usages dans la librairie), d'où des composants sans padding,
// et de `transform` (tableau d'objets côté RN, chaîne côté CSS), d'où des animations figées.

type StyleObject = Record<string, unknown>;
type StyleInput = StyleObject | StyleInput[] | false | null | undefined;

// Valeurs par défaut appliquées par react-native-web à chaque View. Sans elles, un `div`
// retombe en `display: block` : les `flexDirection: 'row'` sont ignorés, et surtout les
// `alignSelf` des enfants n'ont plus aucun effet (un enfant ne peut se dimensionner à son
// contenu que dans un conteneur flex). Partagées par le mock emotion et les vues animées.
export const viewDefaults = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  alignContent: 'flex-start',
  position: 'relative',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: '0 solid black',
  minWidth: 0,
  minHeight: 0,
  flexShrink: 0,
} as const;

export const textDefaults = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: '0 solid black',
  font: 'inherit',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
} as const;

// Raccourcis d'espacement RN → paires de propriétés CSS.
const SPACING_SHORTHANDS: Record<string, [string, string]> = {
  paddingVertical: ['paddingTop', 'paddingBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  marginHorizontal: ['marginLeft', 'marginRight'],
};

// Propriétés purement natives, sans équivalent CSS : on les retire pour éviter
// les avertissements React sur des attributs de style inconnus.
const NATIVE_ONLY = new Set([
  'elevation',
  'includeFontPadding',
  'textAlignVertical',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
]);

// Propriétés dont un nombre vaut des pixels en React Native, mais que le CSS traite sans unité
// (emotion ne leur ajoute donc pas de `px`). `lineHeight: 60` devenait un multiplicateur, soit
// `line-height: 1200px` pour une police de 20 px : le texte partait hors de sa boîte.
const PIXEL_UNITLESS = new Set(['lineHeight']);

const LENGTH_TRANSFORMS = new Set([
  'translateX',
  'translateY',
  'perspective',
  'translate',
  'skewXPx',
]);

// Sur mobile chaque graisse est une police distincte (`Outfit_700Bold`) ; sur le web c'est
// une seule famille plus un `font-weight`. Sans cette traduction, `bold` ne change rien.
const FONT_WEIGHTS: Record<string, number> = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

const splitFontFamily = (value: string): [string, number | undefined] => {
  const match = value.match(/^([A-Za-z]+)_\d{3}([A-Za-z]+)$/);
  if (!match) return [value, undefined];
  const [, family, weightName] = match;
  return [`"${family}", sans-serif`, FONT_WEIGHTS[weightName]];
};

const withUnit = (value: unknown): string =>
  typeof value === 'number' ? `${value}px` : String(value);

// `[{ scale: 0.95 }, { rotate: '90deg' }]` → `"scale(0.95) rotate(90deg)"`
const transformToCss = (transforms: unknown): string | undefined => {
  if (typeof transforms === 'string') return transforms;
  if (!Array.isArray(transforms)) return undefined;

  const parts = transforms.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return [];
    return Object.entries(entry as StyleObject).map(([fn, value]) =>
      LENGTH_TRANSFORMS.has(fn) ? `${fn}(${withUnit(value)})` : `${fn}(${String(value)})`,
    );
  });

  return parts.length ? parts.join(' ') : undefined;
};

const hexToRgba = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  if (hex.length !== 3 && hex.length !== 6) return color;
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// `shadow*` (RN) → `boxShadow` (CSS).
const shadowToBoxShadow = (style: StyleObject): string | undefined => {
  const { shadowColor, shadowOffset, shadowOpacity, shadowRadius } = style;
  if (shadowColor === undefined && shadowOffset === undefined && shadowRadius === undefined) {
    return undefined;
  }
  const offset = (shadowOffset ?? {}) as { width?: number; height?: number };
  const color = typeof shadowColor === 'string' ? shadowColor : '#000000';
  const opacity = typeof shadowOpacity === 'number' ? shadowOpacity : 1;
  const radius = typeof shadowRadius === 'number' ? shadowRadius : 0;
  return `${offset.width ?? 0}px ${offset.height ?? 0}px ${radius}px ${hexToRgba(color, opacity)}`;
};

/** Aplatit les tableaux de styles RN (`style={[a, b]}`) en un seul objet. */
export const flattenStyle = (style: StyleInput): StyleObject => {
  if (!style) return {};
  if (Array.isArray(style))
    return style.reduce<StyleObject>((acc, s) => ({ ...acc, ...flattenStyle(s) }), {});
  return style;
};

/** Convertit un style RN (objet ou tableau) en objet de style compatible CSS. */
export const toWebStyle = (style: StyleInput): StyleObject => {
  const flat = flattenStyle(style);
  const result: StyleObject = {};

  const boxShadow = shadowToBoxShadow(flat);
  if (boxShadow && flat.boxShadow === undefined) result.boxShadow = boxShadow;

  for (const [key, value] of Object.entries(flat)) {
    if (value === undefined || NATIVE_ONLY.has(key)) continue;

    const shorthand = SPACING_SHORTHANDS[key];
    if (shorthand) {
      const [first, second] = shorthand;
      result[first] = value;
      result[second] = value;
      continue;
    }

    if (key === 'transform') {
      const css = transformToCss(value);
      if (css) result.transform = css;
      continue;
    }

    if (key === 'resizeMode') {
      result.objectFit = value;
      continue;
    }

    if (PIXEL_UNITLESS.has(key) && typeof value === 'number') {
      result[key] = `${value}px`;
      continue;
    }

    if (key === 'fontFamily' && typeof value === 'string') {
      const [family, weight] = splitFontFamily(value);
      result.fontFamily = family;
      if (weight) result.fontWeight = weight;
      continue;
    }

    result[key] = value;
  }

  return result;
};
