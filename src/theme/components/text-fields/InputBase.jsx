const InputBase = {
    defaultProps: {
        fullWidth: true,
        autoFocus: false,
        type: 'text',
    },
    styleOverrides: {
        root: ({theme}) => ({
            color: theme.vars.palette.text.secondary,
            fontSize: theme.typography.body2.fontSize,
            fontWeight: theme.typography.fontWeightRegular,
            '& .MuiInputBase-input': {

            },
            '& .MuiInputBase-input.Mui-disabled': {
                color: theme.vars.palette.text.disabled,
            },
            '& .MuiInputBase-input.Mui-error': {
                color: theme.vars.palette.error.main,
            },

        }),
    }
}

export default InputBase;