import { cssVarRgba, generatePaletteChannel } from 'lib/utils';
import {
  basic,
  blue,
  grey as colorGrey,
  green,
  lightBlue,
  orange,
  purple,
  red,
} from 'theme/palette/colors';

const common  = generatePaletteChannel({ white: basic.white, black: basic.black });
const grey    = generatePaletteChannel(colorGrey);

const primary = generatePaletteChannel({
  lighter: grey[100],
  light: grey[400],
  main:        basic.black,
  dark:        grey[800],
  darker:      grey[950],
  contrastText: basic.white, 
});
const secondary = generatePaletteChannel({
  lighter: purple[50],
  light:   purple[300],
  main:    purple[500],
  dark:    purple[700],
  darker:  purple[900],
  contrastText: basic.white,
});
const error = generatePaletteChannel({
  lighter: red[50],
  light:   red[300],
  main:    red[500],
  dark:    red[600],
  darker:  red[900],
  contrastText: basic.white,
});
const warning = generatePaletteChannel({
  lighter:     orange[50],
  light:       orange[400],
  main:        orange[500],
  dark:        orange[700],
  darker:      orange[900],
  contrastText: basic.white,
});
const success = generatePaletteChannel({
  lighter:     green[50],
  light:       green[400],
  main:        green[500],
  dark:        green[700],
  darker:      green[900],
  contrastText: basic.white,
});
const info = generatePaletteChannel({
  lighter:     lightBlue[50],
  light:       lightBlue[300],
  main:        lightBlue[500],
  dark:        lightBlue[700],
  darker:      lightBlue[900],
  contrastText: basic.white,
});
const neutral = generatePaletteChannel({
  lighter:     grey[100],
  light:       grey[600],
  main:        grey[800],
  dark:        grey[900],
  darker:      grey[950],
  contrastText: basic.white,
});
const action = generatePaletteChannel({
  active:             grey[500],
  hover:              grey[100],
  selected:           grey[100],
  disabled:           grey[400],
  disabledBackground: grey[200],
  focus:              grey[300],
});

const divider      = grey[300];
const menuDivider  = cssVarRgba(grey['700Channel'], 0);
const dividerLight = cssVarRgba(grey['300Channel'], 0.6);

const text = generatePaletteChannel({
  primary:   grey[800],
  secondary: grey[600],
  disabled:  grey[400],
});
const background = generatePaletteChannel({
  elevation1:    grey[50],
  elevation2:    grey[100],
  elevation3:    grey[200],
  elevation4:    grey[300],
  menu:          basic.white,
  menuElevation1: grey[50],
  menuElevation2: grey[100],
});

const gradients = {
  primary: `
    radial-gradient(ellipse at 10% 90%, rgba(99,102,241,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 90% 10%, rgba(168,85,247,0.06) 0%, transparent 60%),
    ${basic.white}
  `,
  cool: `
    radial-gradient(ellipse at 10% 90%, rgba(16,185,129,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 90% 10%, rgba(6,182,212,0.06) 0%, transparent 60%),
    ${basic.white}
  `,
  warm: `
    radial-gradient(ellipse at 10% 90%, rgba(251,146,60,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 90% 10%, rgba(251,191,36,0.06) 0%, transparent 60%),
    ${basic.white}
  `,
};

const chGrey = grey;
const chRed = generatePaletteChannel(red);
const chBlue = generatePaletteChannel(blue);
const chGreen = generatePaletteChannel(green);
const chOrange = generatePaletteChannel(orange);
const chLightBlue = generatePaletteChannel(lightBlue);

export const paletteOptions = {
  common,
  grey,
  primary,
  secondary,
  error,
  warning,
  success,
  info,
  neutral,
  action,
  divider,
  dividerLight,
  menuDivider,
  text,
  background,
  gradients,
  chGrey,
  chRed,
  chBlue,
  chGreen,
  chOrange,
  chLightBlue,
};