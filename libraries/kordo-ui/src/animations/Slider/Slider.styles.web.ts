import styled from '@emotion/styled';

export const SliderContainer = styled.div<{ height: number }>((props) => ({
  height: props.height,
  overflow: 'hidden',
}));

export const ScrollContainer = styled.div<{ gap: number }>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  paddingLeft: props.gap / 2,
  paddingRight: props.gap / 2,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const ItemWrapper = styled.div<{ gap: number; index: number; lastChild: number }>(
  (props) => ({
    alignSelf: 'flex-start',
    marginLeft: props.index === 0 ? 0 : props.gap / 2,
    marginRight: props.index === props.lastChild - 1 ? 0 : props.gap / 2,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    flexShrink: 0,
  }),
);
