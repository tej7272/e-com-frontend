import { checkboxClasses, formControlLabelClasses, radioClasses } from '@mui/material';

const FormControlLabel = {
  styleOverrides: {
    // ✅ fixed — was a function returning object, should be object with slot keys
    root: {
      marginLeft: -9,
      [`& .${checkboxClasses.root}, & .${radioClasses.root}, & .${formControlLabelClasses.label}`]: {
        alignSelf: 'flex-start',
      },
    },
    label: ({ theme }) => ({
      // ✅ inherit from typography — no hardcoding
      ...theme.typography.body2,
    }),
  },
};

export default FormControlLabel;