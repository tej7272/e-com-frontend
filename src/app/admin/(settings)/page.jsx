import React from 'react'
import {Box, Card} from '@mui/material';
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import SettingTable from './SettingTable';

const SettingsPage = () => {

    const breadcrumbs ={
        heading: "Settings",
        links: [
            {
                title: "Admin",
                path: "/admin/"
            },
            {
                title: "Settings",
                path: "/admin/settings"
            },
        ]
    } 

    return (
        <Box>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>  

            <Card component={Card}>
                <SettingTable />
            </Card>
        </Box>
    )
}

export default SettingsPage;