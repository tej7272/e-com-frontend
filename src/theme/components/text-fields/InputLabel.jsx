const InputLabel= {
      styleOverrides: {
        root:({theme}) => ({
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.vars.palette.text.secondary,
          '&.Mui-focused': {
            color: theme.vars.palette.text.primary, 
          },
          '&.Mui-error': {
            color: theme.vars.palette.error.main,
          },
          '&.Mui-disabled': {
            color: theme.vars.palette.text.disabled,
          },
          '&.MuiInputLabel-shrink': {
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.fontWeightBold,
            color: theme.vars.palette.text.secondary,
          },
        
        }),
        asterisk: ({ theme }) => ({
          color: theme.vars.palette.error.main,
        }),
      },
    };

export default InputLabel;