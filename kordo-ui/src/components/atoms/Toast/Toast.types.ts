import { IconProps } from 'types/Icon';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  icon?: IconProps;
  isLoading: boolean;
  isClosable: boolean;
  duration: number;
  delete: () => void;
}
