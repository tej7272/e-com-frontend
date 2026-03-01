import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Iconify from 'components/base/Iconify';

const PasswordTextField = ({ ref, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibilty = (event) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextField
      type={isPasswordVisible ? 'text' : 'password'}
      ref={ref}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePasswordVisibilty}>
                {isPasswordVisible ? (
                  <Iconify icon="material-symbols-light:visibility-outline-rounded" />
                ) : (
                  <Iconify icon="material-symbols-light:visibility-off-outline-rounded" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default PasswordTextField;
