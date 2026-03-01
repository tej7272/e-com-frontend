const Typography = {
  defaultProps: {
    variantMapping: {
      subtitle2: 'p',
    },
  },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.text.secondary,
    })
  }
};

export default Typography;
