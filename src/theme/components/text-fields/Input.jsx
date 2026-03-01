import { inputClasses } from '@mui/material';

const Input = {
  styleOverrides: {
    // ✅ only override border color — MUI handles size/padding
    underline: ({ theme }) => ({
      '&::before': {
        borderBottom: `1px solid ${theme.vars.palette.text.secondary}`,
      },
      '&:hover, &:focus': {
        [`&:not(.${inputClasses.disabled}, .${inputClasses.error})`]: {
          '&::before': {
            borderBottom: `2px solid ${theme.vars.palette.primary.main}`,
          },
        },
      },
    }),
  },
};


export const InputBase = {};

export default Input;