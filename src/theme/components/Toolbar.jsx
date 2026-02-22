const Toolbar = {
  variants: [
    {
      props: { variant: 'appbar' },
      style: ({ theme }) => ({
        minHeight: 64,
        [theme.breakpoints.up('md')]: {
          minHeight: 82,
        },
      }),
    },
  ],
};

export default Toolbar;
