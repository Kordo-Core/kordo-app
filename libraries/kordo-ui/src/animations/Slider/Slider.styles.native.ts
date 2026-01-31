import styled from '@emotion/native';

export const SliderContainer = styled.View<{ height: number }>((props) => ({
  height: props.height,
}));

export const ItemWrapper = styled.View<{ gap: number; index: number; lastChild: number }>(
  (props) => ({
    alignSelf: 'flex-start',
    marginLeft: props.index === 0 ? 0 : props.gap / 2,
    marginRight: props.index === props.lastChild - 1 ? 0 : props.gap / 2,
    paddingBlock: 8,
    justifyContent: 'center',
    height: '100%',
  }),
);
