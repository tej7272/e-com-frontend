// theme.js
import { createTheme } from "@mui/material/styles";
import DataGrid from "./components/MuiDataGrid";
import { paletteOptions } from "./palette";
import  createTypography from "./typography";
import Button from './components/MuiButton';
import MuiTextField from "./components/MuiTextField";


const theme = createTheme({

  cssVariables: { colorSchemeSelector: 'data-aurora-color-scheme', cssVarPrefix: 'aurora' },
  // shadows: ['none', ...shadows],
  colorSchemes: {
    light: {
      palette: paletteOptions,
      // shadows: ['none', ...shadows],
    },
    dark: false,
  },
  
  palette: {
      primary: { main: "#060606ff", contrastText: "#ffffff" },
      background: { default: "#e4e3e3", paper: "#ffffff" },
      text: {
        primary: "#222222",
        secondary: "#6b6b6b",
      },
      // DataGrid: {
      //     headerBg: blueGrey[200],
      // },
  },
  typography: createTypography,

  components: {
    MuiCssBaseline: {
      styleOverrides: (t) => ({
        body: { 
          backgroundColor: t.palette.background.default, 
          color: t.palette.text.secondary ,
        },
      }),
    },

    MuiButton: Button,

    MuiTextField: MuiTextField,

    MuiDataGrid: DataGrid,

    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 0,
        },
      },
    },

    MuiBox: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 0,
          width: '100%'
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 10,
          width: '100%'
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: '0px 0px 8px 0px #35B084',
          borderRadius: 8,
          maxHeight: 'calc(100% - 96px)',
          overflowY: 'auto',
          overflowX: 'hidden',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({theme}) => ({
          boxShadow: "none",
          borderRadius: 3,
          // fontSize: 11
        }),
      },
    },
    
    MuiDialog: {
     defaultProps: {
        slotProps: {
          paper: {
            variant: 'elevation',
            elevation: 6,
          },
        },
        scroll: 'paper',
      },
      styleOverrides: {
          root: ({ theme }) => ({position: 'absolute'}),
          paper: {
            borderRadius: 15,
          },
          container: {
            height: 'unset !important'
          },
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({ padding: theme.spacing(0, 3) }),
        dividers: ({ theme }) => ({
          borderTop: 0,
          // borderBottomStyle: 'dashed',
          paddingBottom: theme.spacing(3),
        }),
  },
    },
    MuiDialogActions: {
       defaultProps: { disableSpacing: true },

      /* *************
      * STYLE
      ************* */
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          '& > :not(:first-of-type)': { marginLeft: theme.spacing(1.5) },
        }),
      },
    },
  },
});




export default theme;

