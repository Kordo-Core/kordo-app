const { getDefaultConfig } = require('expo/metro-config');

// Aucune personnalisation n'est nécessaire : `getDefaultConfig` détecte le monorepo pnpm et
// pose déjà les bons `watchFolders` (racine + frontend + kordo-ui + core) et
// `nodeModulesPaths` (frontend puis racine), et Metro suit les liens symboliques nativement.
//
// Ce fichier forçait auparavant la résolution des paquets « singletons » vers le node_modules
// du frontend. C'était le contournement d'un problème de dépendances : kordo-ui déclarait des
// modules natifs en `dependencies` avec des fourchettes divergentes de celles de l'app, d'où
// deux copies installées. Les peers sont désormais alignés, il n'existe plus qu'une version de
// chaque module natif, et le contournement n'a plus lieu d'être.

module.exports = getDefaultConfig(__dirname);
