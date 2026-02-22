export const SnackbarContent = {
  defaultProps: {
    variant: 'elevation',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.grey[950],
      color: theme.palette.grey[100],
      borderRadius: Number(theme.shape.borderRadius) * 8,
      padding: theme.spacing(0.75),
    }),
    message: {
      padding: 0,
    },
    action: ({ theme }) => ({
      '& .iconify': {
        color: theme.palette.grey[100],
      },
    }),
  },
};
