import React from 'react';
import ProductTable from './ProductTable';
import CustomBreadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

const ProductPage = () => {

    const breadcrumbs ={
        heading: "Products",
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
        <>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>
            <ProductTable />
        </>
    )
}

export default ProductPage;