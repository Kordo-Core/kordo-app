const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.watchFolders = [path.resolve(__dirname, '../../kordo-ui/src')];

config.resolver.extraNodeModules = {
  'kordo-ui': path.resolve(__dirname, '../../kordo-ui/src'),
};

module.exports = config;
