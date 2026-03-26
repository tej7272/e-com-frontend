import { cssVarRgba } from 'lib/utils';
import CustomToolbar from 'components/table/CustomToolbar';
import Iconify from 'components/base/Iconify';

const SortDescIcon = ({ onLoad, ...props }) => <Iconify icon="solar:alt-arrow-down-bold-duotone" {...props} />;
const SortAscIcon  = ({ onLoad, ...props }) => <Iconify icon="solar:alt-arrow-up-bold-duotone" {...props} />;
const ColMenuIcon  = ({ onLoad, ...props }) => <Iconify icon="solar:menu-dots-bold-duotone" {...props} />;
const ColFilteredIcon       = ({ onLoad, ...props }) => <Iconify icon="solar:filter-bold-duotone" {...props} />;
const ColMenuSortAscIcon    = ({ onLoad, ...props }) => <Iconify icon="solar:alt-arrow-up-bold-duotone" {...props} />;
const ColMenuSortDescIcon   = ({ onLoad, ...props }) => <Iconify icon="solar:alt-arrow-down-bold-duotone" {...props} />;
const ColMenuFilterIcon     = ({ onLoad, ...props }) => <Iconify icon="solar:filter-bold-duotone" {...props} />;
const ColMenuHideIcon       = ({ onLoad, ...props }) => <Iconify icon="solar:eye-closed-bold-duotone" {...props} />;
const ColMenuManageColsIcon = ({ onLoad, ...props }) => <Iconify icon="solar:settings-bold-duotone" {...props} />;

const DataGrid = {
  defaultProps: {
    showToolbar: true,
    slots: {
      toolbar: CustomToolbar,
      columnSortedDescendingIcon: SortDescIcon,
      columnSortedAscendingIcon: SortAscIcon,
      columnMenuIcon: ColMenuIcon,
      columnFilteredIcon: ColFilteredIcon,
      columnMenuSortAscendingIcon: ColMenuSortAscIcon,
      columnMenuSortDescendingIcon: ColMenuSortDescIcon,
      columnMenuFilterIcon: ColMenuFilterIcon,
      columnMenuHideIcon: ColMenuHideIcon,
      columnMenuManageColumnsIcon: ColMenuManageColsIcon,
    },
  },

  styleOverrides: {
    root: ({ theme }) => ({
      border: "none",
      overflow: "unset",
      borderBottomLeftRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      "& .MuiDataGrid-filler": {
        "--DataGrid-rowBorderColor": "transparent",
      },
      "--DataGrid-rowBorderColor": theme.vars.palette.dividerLight,
    }),

    columnSeparator: ({ theme }) => ({
      color: theme.vars.palette.dividerLight, // ✅ Use vars consistently
    }),

    menu: ({ theme }) => ({
      "& .MuiPaper-root:not(.MuiTooltip-tooltip)": {
        background: theme.palette.gradients.cool,
        borderRadius: 8,
        boxShadow: theme.shadows[8],
        padding: theme.spacing(1),
        fontSize: theme.typography.body2.fontSize,
        color: theme.vars.palette.text.primary,
      },
      "& .MuiMenuItem-root": { minHeight: 32 },
      "& .MuiList-root": {
        minWidth: 200,
        "& .MuiListItemIcon-root": { minWidth: '25px' },
        "& :hover": {
          backgroundColor: theme.vars.palette.grey[200],
          borderRadius: theme.spacing(1),
        },
      },
      "& .MuiListItemText-primary": {
        fontWeight: 600,
        fontSize: theme.typography.body2.fontSize,
        color: theme.vars.palette.text.primary,
      },
    }),

    panel: ({ theme }) => ({
      '& .MuiDataGrid-paper': {
        borderRadius: theme.borderRadius,
        outline: 'none',
        background: theme.palette.gradients.cool,
        border: '1px solid',
        borderColor: theme.vars.palette.background.menu,
        boxShadow: theme.shadows[8],
        padding: theme.spacing(0),
      },
      label: { flexDirection: 'row' },
    }),

    panelContent: { padding: 0 },

    filterForm: ({ theme }) => ({
      padding: theme.spacing(3, 2),
    }),

    columnHeaders: ({ theme }) => ({
      "--DataGrid-t-header-background-base": theme.vars.palette.grey[100],
    }),

    columnHeader: {
      borderBottom: `0 !important`,
      "&.MuiDataGrid-columnHeader--last": { paddingRight: 24 },
      "&:focus": { outline: "none" },
      "&:focus-within": { outline: "none" },
    },

    row: ({ theme }) => ({
      "&.MuiDataGrid-row--firstVisible": {
        "--rowBorderColor": "transparent",
      },
      "&:hover": {
        backgroundColor: theme.vars.palette.grey[50],
      },
      "&.Mui-selected": {
        backgroundColor: cssVarRgba(theme.palette.primary.lightChannel, 0.08),
      },
      "& .MuiDataGrid-cell": {
        "&:nth-of-type(2):not(.MuiDataGrid-cellCheckbox)": {
          paddingLeft: theme.spacing(2),
        },
        "&:nth-last-of-type(2)": {
          paddingRight: theme.spacing(2),
        },
      },
    }),

    cell: ({ theme }) => ({
      color: theme.vars.palette.text.secondary,
      borderTop: `1px dashed ${theme.vars.palette.dividerLight}`,
      fontWeight: 400,
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

    selectedRowCount: { display: "none" },

    // footerContainer: ({ theme }) => ({
    //   // backgroundColor: theme.vars.palette.background.elevation6,
    //   // borderBottomLeftRadius: 16,
    //   // borderBottomRightRadius: 16,
    //   // borderTop: "1px dashed",
    //   borderColor: 'divider',
    //   [`& .${tablePaginationClasses.root}`]: { flex: 1 },
    // }),

    "& .MuiDataGrid-filler": {
      "--DataGrid-rowBorderColor": "transparent",
    },

    toolbar: {
      borderBottomWidth: 0,
    },
  },
};

export default DataGrid;