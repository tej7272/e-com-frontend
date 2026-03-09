import { cssVarRgba } from 'lib/utils';
import { tablePaginationClasses } from "@mui/material";
import CustomToolbar from 'components/table/CustomToolbar';

const DataGrid = {
  defaultProps: {
    slots: {
            toolbar: CustomToolbar,  // ✅ global — no need to set per view
            // ... your existing slots
        }
    // disableRowSelectionOnClick: true,
    // disableColumnMenu: true,
    // columnHeaderHeight: 40,
    //  rowHeight: 40,

    // slots: {
    //   columnSortedDescendingIcon: (props) => (
    //     <IconifyIcon icon="solar:arrow-down-outline" {...props} />
    //   ),

    //   columnSortedAscendingIcon: (props) => (
    //     <IconifyIcon
    //       icon="solar:arrow-down-outline"
    //       {...props}
    //       sx={{ transform: "rotateX(180deg)" }}
    //     />
    //   ),
    // },

    // slotProps: {
    //   filterPanel: {
    //     filterFormProps: {
    //       columnInputProps: { variant: "outlined" },
    //       valueInputProps: {
    //         InputComponentProps: { variant: "outlined" },
    //       },
    //       operatorInputProps: { variant: "outlined" },
    //       logicOperatorInputProps: { variant: "outlined" },
    //     },
    //   },
    // },
  },

  styleOverrides: {
    root: ({ theme }) => ({
      border: "none",
      overflow: "unset",
      "& .MuiDataGrid-filler": {
        "--DataGrid-rowBorderColor": "transparent",
      },
      "--DataGrid-rowBorderColor": theme.vars.palette.dividerLight,
    }),

    panel: ({ theme }) => ({
      '& .MuiDataGrid-paper': {
        borderRadius: theme.borderRadius,
        outline: 'none',
        background: theme.palette.primary,
        border: '1px solid',
        borderColor: theme.vars.palette.background.menu,
        boxShadow: theme.shadows[20],
        padding: theme.spacing(0),
      },
    }),
    panelContent: {
      padding: 0,
    },
    filterForm: ({ theme }) => ({
      padding: theme.spacing(3, 2),
    }),
    // menu: ({theme}) => ({
    //   '& .MuiPaper-root': {
    //     borderRadius: theme.spacing,
    //     boxShadow: theme.shadows[16],
    //   }
    // }),

    columnHeaders: ({ theme }) => ({
      "--DataGrid-t-header-background-base": theme.palette.grey[100],
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }),

    // columnHeaderTitleContainer: {
    //   overflow: "unset",
    //   "& .MuiDataGrid-columnHeaderTitleContainerContent": {
    //     overflow: "unset",
    //   },
    // },
    columnHeader: {
      borderBottom: `0 !important`,

      "&.MuiDataGrid-columnHeader--last": {
        paddingRight: 24,
      },

      "&:focus": { outline: "none" },
      "&:focus-within": { outline: "none" },
    },

    row: ({ theme }) => ({
       
      "&.MuiDataGrid-row--firstVisible": {
        "--rowBorderColor": "transparent",
      },

      "&:hover": {
        backgroundColor: theme.palette.grey[50],
      },

      "&.Mui-selected": {
        backgroundColor: cssVarRgba(
          theme.palette.primary.lightChannel,
          0.08
        ),
      },

      "& .MuiDataGrid-cell": {
        "&:nth-of-type(2)": {
          "&:not(.MuiDataGrid-cellCheckbox)": {
            paddingLeft: theme.spacing(2),
          },
        },
        "&:nth-last-of-type(2)": {
          paddingRight: theme.spacing(2),
        },
      },
    }),

    

    columnSeparator: ({theme}) => ({ 
      color: theme.palette.dividerLight
     }),

    cell: ({ theme }) => ({
      color: theme.vars.palette.text.secondary,
      borderTop: `1px dashed ${theme.palette.dividerLight}`,
      fontWeight: 300,
      "&:focus": { outline: "none" },
      "&:focus-within": { outline: "none" },
    }),

    cellCheckbox: { width: 64 },
    columnHeaderCheckbox: { width: "64px !important" },

    virtualScroller: {
      "@supports (-moz-appearance:none)": {
        scrollbarWidth: "thin",
        overflowY: "hidden",
      },
    },

    sortIcon: ({ theme }) => ({
      color: theme.vars.palette.text.primary,
    }),

    selectedRowCount: { display: "none" },

    footerContainer: ({ theme }) => ({
      backgroundColor: theme.vars.palette.background.elevation1,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      borderTop: "1px dashed",

      [`& .${tablePaginationClasses.root}`]: {
        flex: 1,
      },
    }),

    menu: ({ theme }) => ({
      "& .MuiPaper-root": {
        backgroundColor: theme.vars.palette.background.elevation1,
        borderRadius: 8,
        boxShadow: "0px 0px 8px 0px #35B084",
      },

      "& .MuiMenuItem-root": {
        minHeight: 32,
        paddingTop: 2,
        paddingBottom: 2,
      },

      "& .MuiList-root": {
        minWidth: 200,

        "& .MuiListItemIcon-root": {
          minWidth:'25px'
        },
      },

      "& .MuiListItemText-primary": {
        fontSize: "0.75rem",
        
      },

      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
        
      },
    }),


      filler: {
        height: 0,
        border: "none",
      },

      toolbar: {
        borderBottomWidth: 0,
      },
    },
  };

export default DataGrid;
