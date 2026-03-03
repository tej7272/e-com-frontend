import React from 'react'
import {Box, Card} from '@mui/material';
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ConfigurationTable from './ConfigurationTable';

const ConfigurationPage = () => {

    const breadcrumbs ={
        heading: "Configuration",
        links: [
            {
                title: "Admin",
                path: "/admin/"
            },
            {
                title: "Configuration",
                path: "/admin/configuration"
            },
        ]
    } 

    return (
        <Box>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>  

            <Card component={Card}>
                <ConfigurationTable />
            </Card>
        </Box>
    )
}

export default ConfigurationPage;