import styled from '@emotion/native';

export const SliderContainer = styled.View<{ height: number }>((props) => ({
  height: props.height + 16,
}));

export const ItemWrapper = styled.View<{ gap: number; index: number; lastChild: number }>(
  (props) => ({
    alignSelf: 'flex-start',
    marginLeft: props.index === 0 ? 4 : props.gap / 2,
    marginRight: props.index === props.lastChild - 1 ? 4 : props.gap / 2,
    justifyContent: 'center',
    height: '100%',
  }),
);
