export interface InteractionsSectionProps {
  visibility: string | null;
  onVisibilityChange: (value: string | null) => void;
  likesEnabled?: boolean;
  onLikesChange?: (value: boolean) => void;
  commentsEnabled?: boolean;
  onCommentsChange?: (value: boolean) => void;
  includeMeets?: boolean;
  onMeetsChange?: (value: boolean) => void;
}
