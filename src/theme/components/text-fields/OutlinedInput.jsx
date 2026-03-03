

const OutlinedInput = {
  styleOverrides: {
    root: ({theme, ownerState}) => ({
      // borderRadius: theme.shape.borderRadius,
      '& .MuiOutlinedInput-input': {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5)
      },

      '& .MuiSelect-select': {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5)
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