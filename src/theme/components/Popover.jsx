const Popover = {
  defaultProps: {
    slotProps: {
      paper: {
        variant: 'elevation',
        elevation: 6,
      },
    },
  },
  styleOverrides: {
    paper: ({theme}) => ({
      padding: theme.spacing(0, .5),
      background: theme.palette.gradients.primary,
      boxShadow: theme.shadows[8]
    })
  }
};

export default Popover;
