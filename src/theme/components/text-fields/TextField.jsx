const TextField = {
  defaultProps: {
    variant: 'outlined',
    size: 'small',
  },
  styleOverrides: {
    root: {
      // '& input::-webkit-contacts-auto-fill-button, & input::-webkit-credentials-auto-fill-button': {
      //   visibility: 'hidden',
      //   display: 'none',
      //   pointerEvents: 'none',
      //   position: 'absolute',
      //   right: 0,
      // },
    },
  },
};

export default TextField;