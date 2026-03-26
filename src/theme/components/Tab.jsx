import { tabClasses } from "@mui/material/Tab";


export const Tab = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root:({theme}) => ({
      minHeight: 48, 
      minWidth: 48,
      opacity: 1,
      padding: 0,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: theme.typography.body2.lineHeight,
      [`&.${tabClasses.selected}`]:{
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
      }
    }),
  },
};

export const Tabs = {
  defaultProps: {
    textColor: 'inherit',
    variant: 'scrollable',
    allowScrollButtonsMobile: true,
  },
  styleOverrides: {
    root: ({theme}) => ({
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(3)
    }),
    list: {
      gap: '24px'
    },
    indicator: {backgroundColor: 'currentColor'}
  },
};

export const TabPanel = {
  defaultProps: {},
  styleOverrides: {
    root: ({theme}) => ({
      padding: theme.spacing(3, 0),
    }),
  },
};
