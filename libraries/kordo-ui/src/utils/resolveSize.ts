import { theme } from '../theme';
import { ExtendedSizeType, SizeType } from '../types/theme.types';

export function resolveIconSize(size?: SizeType | number, fallback = theme.iconSizes.md): number {
  if (size === undefined) return fallback;
  if (typeof size === 'number') return size;
  return (theme.iconSizes as Record<string, number>)[size] ?? fallback;
}

export function resolveFontSize(
  size?: ExtendedSizeType | number,
  fallback = theme.fontSizes.md,
): number {
  if (size === undefined) return fallback;
  if (typeof size === 'number') return size;
  return (theme.fontSizes as Record<string, number>)[size] ?? fallback;
}
