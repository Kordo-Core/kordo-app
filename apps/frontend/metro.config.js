const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so Metro picks up changes in kordo-ui and core instantly
config.watchFolders = [workspaceRoot];

// Resolve modules from local node_modules first, then workspace root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Follow pnpm symlinks
config.resolver.unstable_enableSymlinks = true;

// Force singleton RN packages to always resolve from frontend's node_modules,
// regardless of which workspace package (kordo-ui, etc.) is doing the import.
// extraNodeModules is a fallback only — resolveRequest intercepts every resolution.
const SINGLETONS = new Set([
  'react',
  'react-native',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-safe-area-context',
  '@react-navigation/native',
]);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (SINGLETONS.has(moduleName)) {
    return context.resolveRequest(
      { ...context, originModulePath: __filename },
      moduleName,
      platform,
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
