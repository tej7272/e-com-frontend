const InputLabel = {
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      ...theme.typography.body2,
      lineHeight: 1.2,
      color: theme.palette.text.secondary,

      ...(ownerState.variant === 'outlined' &&
        ownerState.size === 'medium' && {
          transform: 'translate(14px, 18px) scale(1)',
        }),

      ...(ownerState.variant === 'outlined' &&
        ownerState.size === 'small' && {
          transform: 'translate(14px, 10px) scale(1)',
        }),

      '&.Mui-focused': {
        color: theme.palette.text.primary,
      },

      '&.Mui-error': {
        color: theme.palette.error.main,
      },

      '&.Mui-disabled': {
        color: theme.palette.text.disabled,
      },

      '&.MuiInputLabel-shrink': {
        ...theme.typography.body2,
        fontWeight: 700,
        transform: 'translate(14px, -10px) scale(0.8)',
      },
    }),

    asterisk: ({ theme }) => ({
      color: theme.palette.error.main,
      fontSize: '1rem',
    }),
  },
};

export default InputLabel;