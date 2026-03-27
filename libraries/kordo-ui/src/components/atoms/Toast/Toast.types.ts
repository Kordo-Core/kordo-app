import { IconProps } from '../Icon/Icon.types';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  icon?: IconProps;
  showLoader: boolean;
  isClosable: boolean;
  duration: number;
  delete: () => void;
}
