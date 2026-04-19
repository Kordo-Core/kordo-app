export type NavTab = {
  key: string;
  icon: string;
  isAction?: boolean;
};

export interface BottomNavBarProps {
  tabs: NavTab[];
  style?: any;
  onTabPress?: (index: number, key: string) => void;
}
