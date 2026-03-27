const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const corePath = path.resolve(__dirname, '../../core');
const uiPath = path.resolve(__dirname, '../../libraries/kordo-ui');

config.watchFolders = [...config.watchFolders, corePath, uiPath];

config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (target, name) => path.join(__dirname, 'node_modules', name),
  },
);

module.exports = config;
