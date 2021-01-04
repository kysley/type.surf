import styled from 'styled-components';
import {
  space,
  layout,
  color,
  flexbox,
  grid,
  compose,
  typography,
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  GridProps,
} from 'styled-system';

type BoxProps = SpaceProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  GridProps;

export const Box = styled.div<BoxProps>(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  space,
  layout,
  color,
  flexbox,
  typography,
  grid,
);
