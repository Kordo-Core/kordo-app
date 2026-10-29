/**
 * Polices du design system, embarquées dans kordo-ui (licence SIL OFL, voir `assets/fonts`).
 *
 * Les clés sont les noms de famille lus par `theme.fonts` : une famille par graisse, comme le
 * veut React Native. À passer tel quel à `useFonts` d'expo-font dans l'application :
 *
 *   const [loaded] = useFonts(kordoFonts);
 *
 * Ce module utilise `require` (résolu par Metro) : il n'est volontairement pas réexporté par
 * `index.ts`, pour que Storybook (Vite) n'ait pas à l'évaluer. Storybook déclare les mêmes
 * familles via `@font-face` dans `.storybook/preview.tsx`.
 */
export const kordoFonts = {
  PlusJakartaSans_400Regular: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
  PlusJakartaSans_500Medium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
  PlusJakartaSans_600SemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  PlusJakartaSans_700Bold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
  PlusJakartaSans_800ExtraBold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  BricolageGrotesque_800ExtraBold: require('../assets/fonts/BricolageGrotesque-ExtraBold.ttf'),
};
