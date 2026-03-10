import React from 'react'
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
        <>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>  
            <ConfigurationTable />
        </>
    )
}

export default ConfigurationPage;