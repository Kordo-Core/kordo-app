// Hauteurs fixes des lignes de la liste : la liste connaît sa taille sans tout monter
export const BLOC_ROW_HEIGHT = 82;
export const BLOC_HEADER_HEIGHT = 35;

import { BlocDetail } from '../../../../../fake_data';

// Lignes aplaties de la FlatList blocs : en-têtes de groupe (date, secteur… selon le tri) + blocs
export type BlocRow =
  | { type: 'header'; key: string; title: string }
  | { type: 'bloc'; key: string; detail: BlocDetail };

export type RowStatus = 'validated' | 'unvalidated' | undefined;
