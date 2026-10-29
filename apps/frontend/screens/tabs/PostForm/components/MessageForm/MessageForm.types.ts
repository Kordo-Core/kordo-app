export interface MessageFormProps {
  message: string;
  onMessageChange: (v: string) => void;
  visibility: string | null;
  onVisibilityChange: (v: string | null) => void;
  likesEnabled: boolean;
  onLikesChange: (v: boolean) => void;
  commentsEnabled: boolean;
  onCommentsChange: (v: boolean) => void;
}
