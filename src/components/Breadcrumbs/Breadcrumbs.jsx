import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography, Link, Stack, Box } from '@mui/material';
import Iconify from 'components/base/Iconify';

const CustomBreadcrumbs = ({breadcrumb}) => {

    const { heading, links } = breadcrumb;
    

    const lastIdx = links?.length - 1;
  
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
            <Typography variant='h5' color='text.primary'>{heading}</Typography>
            <Stack spacing={2}>
                <Breadcrumbs separator={<Iconify icon="lucide:dot" width={30}/>} >
                    {
                        links.map((item, idx) =>
                            idx === lastIdx ? (
                                <Typography variant='body2' key={idx} color="text.disabled" sx={{cursor: 'default'}}>
                                    {item.title}
                                </Typography>
                            ) : (
                                <Link key={idx} underline="hover" color="text.secondary" href={item.path}>
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