import { cssVarRgba } from 'lib/utils';
import Iconify from 'components/base/Iconify';

const DataGrid = {
  defaultProps: {
    disableRowSelectionOnClick: true,
    columnHeaderHeight: 48,
    slots: {
      columnSortedDescendingIcon: ({ onLoad, ...props }) => (
        <Iconify icon="solar:alt-arrow-down-bold-duotone" {...props} />
      ),
      columnSortedAscendingIcon: ({ onLoad, ...props }) => (
        <Iconify
          icon="solar:alt-arrow-down-bold-duotone"
          {...props}
          sx={{ transform: 'rotateX(180deg)' }}
        />
      ),
      columnMenuIcon: ({ onLoad, ...props }) => (
        <Iconify
          icon="weui:more-outlined"
          {...props}
          sx={{ transform: 'rotateX(180deg)' }}
        />
      ),
    },
    slotProps: {
      filterPanel: {
        filterFormProps: {
          columnInputProps: {
            variant: 'outlined',
          },
          valueInputProps: {
            InputComponentProps: {
              variant: 'outlined',
            },
          },
          operatorInputProps: {
            variant: 'outlined',
          },
          logicOperatorInputProps: {
            variant: 'outlined',
          },
        },
      },
    },
  },
  styleOverrides: {
    root: ({ theme }) => ({
      border: 'none',
      overflow: 'unset',
      '--DataGrid-rowBorderColor': theme.vars.palette.dividerLight,
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
    menu: ({theme}) => ({
      '& .MuiPaper-root': {
        borderRadius: theme.spacing,
        boxShadow: theme.shadows[16],
      }
    }),
    main: {
      overflow: 'unset',
    },
    columnHeaders: ({ theme }) => ({
      '--DataGrid-t-header-background-base': theme.palette.grey[100],
      overflow: 'hidden',
      borderRadius: theme.spacing(0)
    }),
    columnHeaderTitleContainer: {
      overflow: 'unset',
      '& .MuiDataGrid-columnHeaderTitleContainerContent': {
        overflow: 'unset',
      },
    },
    row: ({ theme }) => ({
      '&.MuiDataGrid-row--firstVisible': { '--rowBorderColor': 'transparent' },
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-selected': {
        backgroundColor: cssVarRgba(theme.palette.primary.lightChannel, 0.08),
      },
      '& .MuiDataGrid-cell': {
        [`&:nth-of-type(2)`]: {
          '&:not(.MuiDataGrid-cellCheckbox)': {
            paddingLeft: 24,
          },
        },
        [`&:nth-last-of-type(2)`]: {
          paddingRight: 24,
        },
      },
    }),
    columnHeader: {
      borderBottom: `0 !important`,
      '&.MuiDataGrid-columnHeader--last': {
        paddingRight: 24,
      },
      '&:focus': {
        outline: 'none',
      },
      '&:focus-within': {
        outline: 'none',
      },
    },
    columnSeparator: ({ theme }) => ({
      // display: 'none',
      color: theme.vars.palette.divider,
    }),
    cell: ({ theme }) => ({
      lineHeight: 'unset',
      display: 'flex',
      alignItems: 'center',
      color: theme.vars.palette.text.secondary,
      ...theme.typography.subtitle2,
      fontWeight: 400,
      borderTop: `1px dashed ${theme.vars.palette.dividerLight}`,
      '&:focus': {
        outline: 'none',
      },
      '&:focus-within': {
        outline: 'none',
      },
    }),
  },
};

export default DataGrid;
