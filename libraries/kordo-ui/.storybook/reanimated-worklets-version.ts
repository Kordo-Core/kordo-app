// Reanimated vérifie au démarrage que la version de react-native-worklets lui est compatible.
//
// Ce contrôle ne peut pas aboutir dans un navigateur : il lit la version en faisant
// `require('react-native-worklets/package.json')`. L'appel échoue, et le script en conclut que
// le paquet n'est pas installé — Reanimated refuse alors de démarrer, sur toutes les stories.
//
// La vérification garde tout son sens au build mobile, où les deux paquets sont réellement
// résolus côte à côte. La neutraliser ici ne masque donc rien.
export default (): { ok: true } => ({ ok: true });
