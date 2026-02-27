const Dialog = {
  defaultProps: {
    slotProps: {
      paper: {
        variant: 'elevation',
        elevation: 6,
      },
    },
  },
  styleOverrides: {
    paper: {
      fontSize: 9,
      overflow: 'hidden',
      minHeight: 'fit-content',
    },
  },
};

export default Dialog;
