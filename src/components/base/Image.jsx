import { Box } from '@mui/material';

const Image = ({ src, ...props }) => {
  return <Box component="img" src={src} {...props} />;
};

export default Image;
