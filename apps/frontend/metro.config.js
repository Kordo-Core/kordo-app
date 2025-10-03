const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const uiPath = path.resolve(__dirname, '../../kordo-ui');

config.watchFolders = [...config.watchFolders, uiPath];

config.resolver.extraNodeModules = {
  'kordo-ui': uiPath,
};

module.exports = config;
