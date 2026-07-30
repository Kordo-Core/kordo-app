import { fluentIcons } from './fluent-icons';

export type IconPathDefinition = {
  d: string;
  fillRule?: 'evenodd' | 'nonzero';
  clipRule?: 'evenodd' | 'nonzero';
  fill?: string;
};

export type IconDefinition = {
  viewBox: string;
  paths: IconPathDefinition[];
};

// Accès typé à la map d'icônes générée, partagé par les implémentations web et native
// pour qu'un même `name` donne exactement le même tracé sur les deux plateformes.
// `name` étant une string libre côté props, la recherche peut échouer : les deux
// implémentations doivent gérer le cas `undefined`.
export const getIcon = (name: string): IconDefinition | undefined =>
  (fluentIcons as unknown as Record<string, IconDefinition | undefined>)[name];
