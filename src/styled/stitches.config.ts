import {createCss} from '@stitches/react';
import {darken} from 'color2k';

type Theme = {
  colors: {
    primary: string;
    primary2: string;
    secondary: string;
    text: string;
    background: string;
    background2: string;
    background3: string;
    error: string;
    error2: string;
    caret?: string;
  };
};

const ishtarColors: Partial<Theme> = {
  colors: {
    primary: '#91170c',
    secondary: '#847869',
    text: '#fae1c3',
    background: '#202020',
    error: '#bb1e10',
    error2: '#791717',
  },
};

function preprocess({colors}: Theme): Theme {
  return {
    colors: {
      ...colors,
      primary2: darken(colors.primary, 0.05),
      background2: darken(colors.background, 0.05),
      background3: darken(colors.background, 0.1),
      caret: colors.primary,
    },
  };
}

export const {styled, css, global} = createCss({
  insertionMethod: 'append',
  theme: {
    ...preprocess(ishtarColors),
    // colors: {
    // primary: '#e2b714',
    // secondary: '#646669',
    // text: '#d1d0c5',
    // background: '#323437',
    // error: '#ca4754',
    // error2: '#7e2a33',
    // caret: '#e2b714',
    // primary2: darken('#e2b714', 0.05), //$primary
    // background2: darken('#323437', 0.05), //$background
    // background3: darken('#323437', 0.1), //$background
    // primary: 'green',
    // secondary: 'yellow',
    // background: 'blue',
    // text: 'orange',
    // },
    shadows: {
      base:
        'rgb(0 0 0 / 10%) 0px 4px 0px -1px, rgb(0 0 0 / 6%) 0px 3px 7px -3px',
    },
  },
});
