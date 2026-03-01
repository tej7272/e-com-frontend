import React from 'react';
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import createTypography from 'theme/typography';
import { themeOverrides } from 'theme/theme';
// import theme from 'theme';

export const AppProvidersWrapper = ({ children}) => {
    const theme = createTheme({
        typography: createTypography(),
        ...themeOverrides,
    })
        console.log("theme", theme);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}