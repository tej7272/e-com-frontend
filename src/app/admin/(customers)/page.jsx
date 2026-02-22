import React from 'react'
import {Box, Card, Grid} from '@mui/material'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import CustomerTable from './CustomerTable';

const CustomersPage = () => {

    const breadcrumbs = [
        {
            title: "Admin",
            path: "/admin/"
        },
        {
            title: "Customers",
            path: "/admin/customers"
        },
    ]

    return (
        <Box>
            <Grid container spacing={1} sx={{my: 4}} alignItems='center'>
                <Grid size={6}>
                    <CustomBreadcrumbs breadcrumb={breadcrumbs}/>
                </Grid>
                <Grid size={6} align='right' sx={{ }}>
                    <ExitToAppOutlinedIcon fontSize='small'/>
                </Grid>
            </Grid>

            <Card component={Card}>
                <CustomerTable />
            </Card>
        </Box>
    )
}

export default CustomersPage;