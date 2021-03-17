import {createCss} from '@stitches/react';
import {darken} from 'color2k';

export const {styled, css, global} = createCss({
  insertMethod: 'append',
  theme: {
    colors: {
      primary: '#e2b714',
      secondary: '#646669',
      text: '#d1d0c5',
      background: '#323437',
      error: '#ca4754',
      error2: '#7e2a33',
      caret: '#e2b714',
      primary2: darken('#e2b714', 0.05), //$primary
      background2: darken('#323437', 0.05), //$background
      // background2: '#eee', //$background
      background3: darken('#323437', 0.1), //$background
      // background3: '#eee', //$background
    },
  },
});
