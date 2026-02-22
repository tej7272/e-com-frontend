import React from 'react'
import {Box, Card, Grid, Typography} from '@mui/material'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import SettingTable from './SettingTable';

const SettingsPage = () => {

    const breadcrumbs = [
        {
            title: "Admin",
            path: "/admin/"
        },
        {
            title: "Settings",
            path: "/admin/settings"
        },
    ]

    return (
        <Box>
            <Grid container spacing={1} sx={{my: 4}} alignItems='center'>
                <Grid size={6}>
                    <Typography variant='h6' mb={1}>Setting</Typography>
                    <CustomBreadcrumbs breadcrumb={breadcrumbs}/>
                </Grid>
                <Grid size={6} align='right' sx={{ }}>
                    <ExitToAppOutlinedIcon fontSize='small'/>
                </Grid>
            </Grid>

            <Card component={Card}>
                <SettingTable />
            </Card>
        </Box>
    )
}

export default SettingsPage;