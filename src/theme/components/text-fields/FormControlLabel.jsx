import { formControlLabelClasses } from '@mui/material';

const MuiFormControlLabel = {
  defaultProps: {
    labelPlacement: 'start',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'middle',

      margin: 0,
      paddingTop: theme.spacing(.5),
    }),

    label: ({ theme }) => ({
      ...theme.typography.body2,
      lineHeight: 1.2, // critical
      color: theme.palette.text.secondary,

      [`&.${formControlLabelClasses.disabled}`]: {
        color: theme.palette.text.disabled,
      },
    }),
  },
};

export default MuiFormControlLabel;