import React from 'react'
import {Box, Card} from '@mui/material'
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from './OrderTable';

const OrdersPage = () => {

    const breadcrumbs ={
        heading: "Settings",
        links: [
            {
                title: "Admin",
                path: "/admin/"
            },
            {
                title: "Orders",
                path: "/admin/orders"
            },
        ]
    } 

    return (
        <Box>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>
              
            <Card component={Card} sx={{mt: 3}}>
                <OrderTable />
            </Card>
        </Box>
    )
}

export default OrdersPage;