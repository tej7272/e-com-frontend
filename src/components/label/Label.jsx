import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";



const Label = ({children}) => {
    const theme = useTheme();

    return (
        <Box 
            sx={{
                backgroundColor: theme.palette.grey[100], 
                p: 1,
                px: 2,
                borderRadius: 2,
                mr: 1
            }}
            component="span"
        >
           {children}
        </Box>
    )
}

export default Label;