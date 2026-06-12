import { UserPublic } from './User';

// Contrat UI minimal d'un bloc (sous-ensemble de la table `bloc`).
// Les FK (gym, session, secteur) restent côté donnée (db.types) et ne sont pas exposées ici.
export type BoulderPublic = {
  id: string;
  setter?: UserPublic; // bloc.setter_id (nullable), imbriqué
  name?: string; // bloc.name (nullable)
  grade: number; // bloc.grade (0–30)
  points: number; // bloc.points
  blocUrl?: string; // bloc.bloc_url — image de couverture du bloc
  createdAt: string; // bloc.created_at (ISO)
};
