

const OutlinedInput = {
  styleOverrides: {
    root: ({theme, ownerState}) => ({
      // borderRadius: theme.shape.borderRadius,
      '& .MuiOutlinedInput-input': {
        padding: ownerState.size === 'small'
          ? theme.spacing(1.25, 1.5)
          : theme.spacing(2, 1.75),
      },

      '& .MuiSelect-select': {
        padding: ownerState.size === 'small'
          ? theme.spacing(1.25, 1.5)
          : theme.spacing(2, 1.75),
      },
       
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey['500Channel'],
        transition: theme.transitions.create(['border-color'],{
          duration: theme.transitions.duration.shortest,
        }),
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.main,
      },
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.action.disabledBackground,
      },
    })
  }

}

export default OutlinedInput;