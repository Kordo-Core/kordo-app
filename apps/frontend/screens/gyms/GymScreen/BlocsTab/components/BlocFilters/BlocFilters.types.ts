export type BlocSort = 'date' | 'sector' | 'level' | 'tops' | 'setter';

export const SORTS: { key: BlocSort; label: string }[] = [
  { key: 'date', label: 'Date' },
  { key: 'sector', label: 'Secteur' },
  { key: 'level', label: 'Niveau' },
  { key: 'tops', label: 'Tops' },
  { key: 'setter', label: 'Ouvreur' },
];

/** Paliers de couleur du curseur de niveau, du plus facile au plus dur */
export const LEVEL_LABELS = ['Jaune', 'Vert', 'Bleu', 'Rouge', 'Noir', 'Violet'];

export interface BlocFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  sort: BlocSort;
  onSortChange: (sort: BlocSort) => void;
  /** Étiquettes cochées : un bloc passe s'il en porte une de chaque famille cochée */
  tagIds: Set<string>;
  onTagIdsChange: (ids: Set<string>) => void;
  /** Palier de couleur maximum (index dans LEVEL_LABELS) */
  maxLevel: number;
  onMaxLevelChange: (level: number) => void;
  /** Nombre de blocs qui passent les filtres, annoncé sur le bouton du bas */
  resultCount: number;
}
