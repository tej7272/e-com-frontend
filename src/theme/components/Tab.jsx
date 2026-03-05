import { svgIconClasses } from '@mui/material';

export const Tab = {
  defaultProps: {},
  styleOverrides: {
    root:({theme}) => ({
      [`.${svgIconClasses.root}`]: {
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.text.secondary,
      },
    }),
  },
};

export const Tabs = {
  defaultProps: {},
  styleOverrides: {
    root: ({theme}) => ({
      minHeight: '40px',
      paddingTop: theme.spacing(1)
    }),
    list: {
      // gap: '8px',
    },
  },
};
