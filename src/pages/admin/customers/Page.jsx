import React from 'react'
import {Box, Card, Grid} from '@mui/material'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import CustomerTable from './CustomerTable';

const CustomersPage = () => {

    const breadcrumbs ={
        heading: "Customers",
        links: [
            {
                title: "Admin",
                path: "/admin/"
            },
            {
                title: "Customers",
                path: "/admin/customers"
            },
        ]
    } 

    return (
        <>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>
                
            <Card component={Card}>
                <CustomerTable />
            </Card>
        </>
    )
}

export default CustomersPage;