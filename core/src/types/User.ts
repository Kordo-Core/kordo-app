export type UserPublic = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  isSetter?: boolean;
  avatarUrl?: string;
  /** Whether the current user follows this user (drives the follow button state). */
  isFollowing?: boolean;

  //   updated_at: Date; //TODO
  //   created_at: Date;
};
