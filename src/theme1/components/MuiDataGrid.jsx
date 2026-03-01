import { tablePaginationClasses } from "@mui/material";
import { cssVarRgba } from "../../lib/utils";

const DataGrid = {
  defaultProps: {
    // disableRowSelectionOnClick: true,
    // disableColumnMenu: true,
    columnHeaderHeight: 40,
     rowHeight: 40,

    // slots: {
    //   columnSortedDescendingIcon: (props) => (
    //     <Iconify icon="solar:arrow-down-outline" {...props} />
    //   ),

    //   columnSortedAscendingIcon: (props) => (
    //     <Iconify
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
      // "& .MuiDataGrid-filler": {
      //   "--DataGrid-rowBorderColor": "transparent",
      // },
      "--DataGrid-rowBorderColor": theme.vars.palette.dividerLight,
      // "--DataGrid-t-header-background-base": theme.palette.background.default,
    }),

    panel: ({ theme }) => ({
      "& .MuiDataGrid-paper": {
        borderRadius: theme.spacing(1),
        outline: "none",
        background: theme.vars.palette.background.menu,
        boxShadow: '0px 0px 8px 0px #35B084',
        padding: 0,
      },
    }),

    // panelContent: { padding: 0 },

    // filterForm: ({ theme }) => ({
    //   gap: theme.spacing(1),
    //   padding: theme.spacing(3),
    //   flexDirection: "column",

    //   "& .MuiFormControl-root": {
    //     width: "100%",
    //     [`& .${inputBaseClasses.root}`]: {
    //       width: "100%",
    //     },
    //   },
    // }),

    // filterFormDeleteIcon: ({ theme }) => ({
    //   flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "space-between",

    //   "&::before": {
    //     content: '"Filter"',
    //     color: theme.vars.palette.text.primary,
    //     fontWeight: 500,
    //     fontSize: theme.typography.subtitle1.fontSize,
    //   },
    // }),

    // main: { overflow: "unset" },

    columnHeaders: ({ theme }) => ({
      "--DataGrid-t-header-background-base":
      theme.palette.background.default,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }),

    // columnHeaderTitleContainer: {
    //   overflow: "unset",
    //   "& .MuiDataGrid-columnHeaderTitleContainerContent": {
    //     overflow: "unset",
    //   },
    // },

    row: ({ theme }) => ({
      "&.MuiDataGrid-row--firstVisible": {
        "--rowBorderColor": "transparent",
      },

      "&:hover": {
        backgroundColor: "transparent",
      },

      "&.Mui-selected": {
        backgroundColor: cssVarRgba(
          theme.vars.palette.primary.lightChannel,
          0.08
        ),
      },

      // "& .MuiDataGrid-cell": {
      //   "&:nth-of-type(2)": {
      //     "&:not(.MuiDataGrid-cellCheckbox)": {
      //       paddingLeft: 24,
      //     },
      //   },
      //   "&:nth-last-of-type(2)": {
      //     paddingRight: 24,
      //   },
      // },
    }),

    columnHeader: {
      borderBottom: `0 !important`,

      "&.MuiDataGrid-columnHeader--last": {
        paddingRight: 24,
      },

      "&:focus": { outline: "none" },
      "&:focus-within": { outline: "none" },
    },

    // columnSeparator: { display: "none" },

    cell: ({ theme }) => ({
      // lineHeight: "unset",
      display: "flex",
      alignItems: "center",
      color: theme.vars.palette.text.secondary,
      ...theme.typography.subtitle2,
      fontWeight: 300,
      "& .MuiDataGrid-cellContent": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        minWidth: 0, // 🔥 critical
        display: "block",
    width: "100%",
      },

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
