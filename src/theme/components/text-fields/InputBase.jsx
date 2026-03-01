
const InputBase = {
    defaultProps: {
        autoFocus: false,
    },
    styleOverrides: {
        root: ({theme}) => ({
            '& .MuiInputBase-input.Mui-disabled': {
                color: theme.vars.palette.text.disabled,
            },
            '& .MuiInputBase-input.Mui-error': {
                color: theme.vars.palette.error.main,
            },
        }),
        input: ({theme}) => ({
            fontSize: theme.typography.pxToRem(15),
            borderWidth: 2,
            '&::placeholder': {
                color: theme.vars.palette.text.disabled,
            },
            
        })
    }
}

export default InputBase;