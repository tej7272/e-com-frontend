import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustomBreadcrumbs = ({breadcrumb}) => {

    const lastIdx = breadcrumb?.length - 1;
  
    return (
        <Stack spacing={2}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" >
                {
                    breadcrumb.map((item, idx) =>
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
    );
}


export default CustomBreadcrumbs;