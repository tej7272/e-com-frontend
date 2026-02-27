import React from 'react'
import {Box, Card, Grid, Typography} from '@mui/material'
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ProductTable from './ProductTable';

const ProductPage = () => {

    const breadcrumbs ={
        heading: "Settings",
        links: [
            {
                title: "Admin",
                path: "/admin/"
            },
            {
                title: "Products",
                path: "/admin/products"
            },
        ]
    } 


    return (
        <Box>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>

            <Card component={Card} sx={{mt: 3}}>
                <ProductTable />
            </Card>
        </Box>
    )
}

export default ProductPage;