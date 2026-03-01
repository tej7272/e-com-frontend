
const TablePagination = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.vars.palette.background.default,
      borderTop: `1px dashed ${theme.vars.palette.divider}`,

    }),
    toolbar:({ theme }) => ({
      // padding: theme.spacing(12),
    }),
    selectLabel: {
      paddingLeft: 10,
      display: 'none',
    },
    displayedRows: ({ theme }) => ({
      lineHeight: 1.5,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    }),
  },
};

export default TablePagination;
