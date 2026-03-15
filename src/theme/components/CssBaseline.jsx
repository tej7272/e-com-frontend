import keyFrames from 'theme/styles/keyFrames';
import popper from 'theme/styles/popper';
import simplebar from 'theme/styles/simplebar';

const CssBaseline = {
  defaultProps: {},
  styleOverrides: (theme) => ({
    '*': {
      scrollbarWidth: 'thin',
    },
    body: {
      scrollbarColor: `${theme.vars.palette.background.elevation4} transparent`,
      [`h1, h2, h3, h4, h5, h6, p`]: {
        margin: 0,
      },
      fontVariantLigatures: 'none',
      [`[id]`]: {
        scrollMarginTop: 82,
      },
       background: `
        radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 60%),
        #f8f9ff
      `,
    },
    ...simplebar(theme),
    ...keyFrames(),
    ...popper(theme),
  }),
};

export default CssBaseline;
