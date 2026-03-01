import React from 'react'
import {Box, Card, Grid, Typography} from '@mui/material'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ReviewTable from './ReviewTable';

const ReviewsPage = () => {

    const breadcrumbs ={
        heading: "Reviews",
        links: [
            {
                title: "Admin",
                path: "/admin/"
            },
            {
                title: "Reviews",
                path: "/admin/reviews"
            },
        ]
    } 


    return (
        <Box>
            <CustomBreadcrumbs breadcrumb={breadcrumbs}/>

            <Card component={Card}>
                <ReviewTable />
            </Card>
        </Box>
    )
}

export default ReviewsPage;