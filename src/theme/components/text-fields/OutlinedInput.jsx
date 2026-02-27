
const OutlinedInput = {
  defaultProps: {
    autoFocus: false,
    fullWidth: true,
    type: 'text'
  },
  styleOverrides: {
    root: ({theme}) => ({
      borderRadius: theme.shape.borderRadius,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.neutral.main,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.light,
      },
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.disabled,
      },
    })
  }

}

export default OutlinedInput;