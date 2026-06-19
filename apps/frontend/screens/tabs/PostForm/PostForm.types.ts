export type PostType = 'activity' | 'publication' | 'message' | 'now';

export interface MediaItem {
  id: string;
  uri: string;
  kind: 'image' | 'video';
}
