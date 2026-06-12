import { BlocDetail } from '../../../../../fake_data';

// Lignes aplaties de la FlatList blocs : en-têtes de date + blocs (pour virtualisation)
export type BlocRow =
  | { type: 'header'; key: string; date: string }
  | { type: 'bloc'; key: string; detail: BlocDetail };

export type RowStatus = 'validated' | 'unvalidated' | undefined;
