import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const pathname = useLocation().pathname;

    const nav_items = [
        {
            path: '/admin/',
            element: 'Dashboard',
            icon: <DashboardOutlinedIcon  fontSize='small'/>
        },
        {
            path: '/admin/products',
            element: 'Products',
            icon: <Inventory2OutlinedIcon fontSize='small'/>
        },
        {
            path: '/admin/orders',
            element: 'Orders',
            icon: <ProductionQuantityLimitsOutlinedIcon fontSize='small'/>
        },
        {
            path: '/admin/customers',
            element: 'Customers',
            icon: <PeopleAltOutlinedIcon fontSize='small'/>
        },
        {
            path: '/admin/reviews',
            element: 'Reviews',
            icon: <StarBorderPurple500OutlinedIcon fontSize='small'/>
        },
        {
            path: '/admin/settings',
            element: 'Settings',
            icon: <SettingsOutlinedIcon fontSize='small'/>
        },
    ]

    return (
        
    <Box bgcolor='initial' sx={{ px: 2 }}>
        <Box textAlign='center' sx={{mt: 3, mb: 4}}>
            <Typography variant='h5' fontWeight='bold' color='inherit'>Admin</Typography>
        </Box>
        <Grid container spacing={1}>
            {nav_items.map((item, index) => {
                return(
                    <Grid size={12} key={index}>
                        <Link to={item.path} style={{textDecoration: 'none', color: 'inherit'}}>
                            <Box 
                                display='flex'
                                bgcolor = { pathname === item.path ? 'grey.300' : '' }
                                gap={1}
                                alignItems='center'
                                color="inherit.main"
                                sx={{ borderRadius: 1, p: 2, "&:hover": { bgcolor: "grey.200" } }}
                            >
                                {item.icon}
                                <Typography variant='body2'>{item.element}</Typography>
                            </Box>
                        </Link>
                    </Grid>
                )
            })}
        </Grid>

        <Divider sx={{my: 4}}/>
    </Box>


    )
}

export default Navbar
