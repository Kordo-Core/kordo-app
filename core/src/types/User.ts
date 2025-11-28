export type UserPublic = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  isSetter?: boolean;
  avatarUrl?: string;

  //   updated_at: Date; //TODO
  //   created_at: Date;
};
