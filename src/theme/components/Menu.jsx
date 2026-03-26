import { cssVarRgba } from 'lib/utils';

export const Menu = {
  styleOverrides: {
    paper: ({ theme }) => ({
      background: theme.palette.gradients.primary,
      border: '1px solid',
      borderColor: theme.vars.palette.dividerLight,
      borderRadius: theme.spacing(1.5),
      boxShadow: theme.shadows[8],
      maxHeight: 320,
      scrollbarWidth: 'thin',
      scrollbarColor: `${theme.vars.palette.background.elevation4} transparent`,
    }),

    list: ({theme}) => ({
      padding: theme.spacing(.5),
    }),
  },
}

export const MenuItem = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontSize: theme.typography.body2.fontSize,
      fontWeight: 400,
      color: theme.vars.palette.text.primary,
      borderRadius: theme.spacing(1),
      minHeight: 36,
      padding: theme.spacing(0.75, 1.5),
      '&:hover': {
        backgroundColor: theme.vars.palette.action.hover,
      },
      '&.Mui-selected': {
        fontWeight: 600,
        backgroundColor: cssVarRgba(theme.palette.primary.lightChannel, 0.08),
        '&:hover': {
          backgroundColor: cssVarRgba(theme.palette.primary.lightChannel, 0.16),
        },
      },
      '&.Mui-focusVisible': {
        backgroundColor: theme.vars.palette.action.focus,
      },
    }),
  },
}
