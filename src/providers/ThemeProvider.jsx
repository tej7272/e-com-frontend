import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from "@mui/material";
import createTypography from 'theme/typography';
import { themeOverrides } from 'theme/theme';

export const ThemeProvider = ({ children}) => {
    const theme = createTheme({
        typography: createTypography(),
        ...themeOverrides,
    })

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    )
}