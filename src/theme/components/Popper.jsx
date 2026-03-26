

const Popper = {
  defaultProps: {},
  styleOverrides: {
    root: ({ theme }) => ({
      zIndex: theme.zIndex.tooltip,
      // background: theme.palette.gradients.cool,
    }),
  },
};

export default Popper;
