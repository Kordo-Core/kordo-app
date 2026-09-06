import styled from '@emotion/native';

// Case carrée : bordure quand décochée, fond plein quand cochée
export const Box = styled.View<{ checked?: boolean; color: string; disabled?: boolean }>(
  (props) => ({
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: props.checked ? 0 : 1,
    borderColor: props.theme.colors.neutral.gray.base,
    backgroundColor: props.checked ? props.color : 'transparent',
    opacity: props.disabled ? 0.5 : 1,
  }),
);
