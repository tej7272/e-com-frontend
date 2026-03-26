const TablePagination = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.vars.palette.background.default,
      borderTop: `1px dashed ${theme.vars.palette.divider}`,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    }),

    toolbar: ({ theme }) => ({
      padding: theme.spacing(1, 2),
    }),

    actions: ({ theme }) => ({
      marginRight: theme.spacing(2),
    }),

    selectLabel: {
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
}

export default TablePagination;