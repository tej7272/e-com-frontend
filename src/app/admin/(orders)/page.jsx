import React from 'react'
import {Box, Card, Grid} from '@mui/material'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from './OrderTable';

const OrdersPage = () => {

    const breadcrumbs = [
        {
            title: "Admin",
            path: "/admin/"
        },
        {
            title: "Orders",
            path: "/admin/orders"
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
                <OrderTable />
            </Card>
        </Box>
    )
}

export default OrdersPage;