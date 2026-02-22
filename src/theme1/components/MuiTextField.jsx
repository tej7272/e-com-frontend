const MuiTextField = {
  defaultProps: {
    size: 'small',
    variant: 'outlined',
    fullWidth: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius,

        '& fieldset': {
          borderColor: theme.palette.divider,
        },

        '&:hover fieldset': {
          borderColor: theme.palette.text.primary,
        },

        '&.Mui-focused fieldset': {
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
        },

        '&.Mui-error fieldset': {
          borderColor: theme.palette.error.main,
        },
      },

      '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,

        '&.Mui-focused': {
          color: theme.palette.primary.main,
        },
      },

      '& .MuiOutlinedInput-input': {
        padding: theme.spacing(1.5, 0),
        fontSize: 14,
      },
    }),
  },
};

export default MuiTextField;