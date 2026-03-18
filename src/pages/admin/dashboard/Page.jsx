import React from 'react'
import {Box} from '@mui/material'
import { useAdminAuth } from 'context/useContext';

const DashboardPage = () => {

    const { admin } = useAdminAuth();

    console.log("dashboard", admin);
    return (
        <Box>Dashboard</Box>
    )
}

export default DashboardPage;