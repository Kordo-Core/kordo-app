import { UserPublic } from './User';

export type BoulderPublic = {
  id: string;
  setter: UserPublic;
  name: string;
  grade: number;
  avatarUrl?: string;

  //   gym: string; //TODO
  //   settingSession: string; //TODO
  //   sector: string; //TODO
  //   creationDate: Date; //TODO
};
