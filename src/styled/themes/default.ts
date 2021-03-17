import {darken} from 'color2k';

type themeFactoryColors = {
  primary: string;
  secondary: string;
  background: string;
  background2: string;
  background3: string;
  text: string;
  error: string;
  // success: string;
  error2: string;
  caret?: string;
};

// todo add success

export function themeFactory(colors: themeFactoryColors) {
  const colorsObj = {
    ...colors,
    caret: colors.caret ?? colors.primary,
    primary2: darken(colors.primary, 0.05),
    background2: darken(colors.background, 0.05),
    background3: darken(colors.background, 0.1),
  };
  return {
    colors: colorsObj,
    shadows: {
      default: `inset 0px -3px 0px 0px ${colorsObj.background3}`,
      active: `inset 0px -5px 0px 0px ${colorsObj.background3}`,
    },
  };
}

// export const def = {
//   colors: {
//     main: '#e2b714',
//     secondary: '#e2b714',
//     alt
//     error: '#e2b714',
//     error2: '#e2b714',
//   },
// };
