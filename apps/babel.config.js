module.exports = {
  presets: ['babel-preset-expo'], // obligatoire pour Expo
  plugins: [
    'react-native-reanimated/plugin', // ⚠️ doit être le dernier plugin
  ],
};
