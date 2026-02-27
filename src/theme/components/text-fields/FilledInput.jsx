import {
  filledInputClasses,
  inputBaseClasses,
  autocompleteClasses,
} from '@mui/material';

const filledInputColors = [
  'primary', 'secondary', 'info', 'success', 'warning', 'error',
];

const filledInputCustomVariants = filledInputColors.map((color) => ({
  props: { color },
  style: ({ theme }) => ({
    [`&.${filledInputClasses.focused}`]: {
      backgroundColor: theme.vars.palette[color].lighter,
      boxShadow: `0 0 0 1px ${theme.vars.palette[color].main}`,
    },
  }),
}));

const FilledInput = {
  variants: [
    ...filledInputCustomVariants,
    {
      props: { size: 'large' },
      style: ({ theme }) => ({
        [`& .${filledInputClasses.input}`]: {
          paddingTop: theme.spacing(3.5),
          paddingBottom: theme.spacing(1.5),
          ...theme.typography.body1,
        },
        [`&:not(.${inputBaseClasses.adornedStart}) > .${filledInputClasses.input}`]: {
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5),
          [`&.${autocompleteClasses.input}`]: { paddingLeft: 0 },
        },
      }),
    },
  ],
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.vars.palette.background.elevation2,
      '&:hover': {
        backgroundColor: theme.vars.palette.background.elevation3,
      },
      '&:before, &:after': {
        display: 'none',
      },
      [`&.${filledInputClasses.focused}`]: {
        backgroundColor: theme.vars.palette.secondary.lighter,
        boxShadow: `0 0 0 1px ${theme.vars.palette.primary.main}`,
      },
      [`&.${filledInputClasses.error}`]: {
        backgroundColor: theme.vars.palette.error.lighter,
        boxShadow: `0 0 0 1px ${theme.vars.palette.error.main}`,
      },
      [`&.${filledInputClasses.disabled}`]: {
        backgroundColor: theme.vars.palette.action.disabledBackground,
      },
      [`&.${inputBaseClasses.multiline}`]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    }),
    input: {
      '&:-webkit-autofill': {
        borderRadius: 'inherit',
      },
    },
    adornedStart: ({ theme, ownerState }) => ({
      paddingLeft:
        ownerState.size === 'large'
          ? theme.spacing(2.5)
          : ownerState.size === 'small'
          ? theme.spacing(1.5)
          : theme.spacing(2),
    }),
    multiline: {
      [`& .${filledInputClasses.input}`]: {
        padding: 0,
      },
    },
  },
};

export default FilledInput;