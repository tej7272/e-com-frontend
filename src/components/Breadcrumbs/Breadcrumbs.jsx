import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography, Link, Stack, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustomBreadcrumbs = ({breadcrumb}) => {

    const { heading, links } = breadcrumb;
    

    const lastIdx = links?.length - 1;
  
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
            <Typography variant='h6' mb={1}>{heading}</Typography>
            <Stack spacing={2}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" >
                    {
                        links.map((item, idx) =>
                        idx === lastIdx ? (
                            <Typography key={idx} color="text.primary" aria-current="page">
                            {item.title}
                            </Typography>
                        ) : (
                            <Link key={idx} underline="hover" color="inherit" href={item.path}>
                            {item.title}
                            </Link>
                        )
                        )
                    }
                </Breadcrumbs>
            </Stack>
        </Box>
    );
}


export default CustomBreadcrumbs;