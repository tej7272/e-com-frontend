const FormHelperText = {
  styleOverrides: {
    root: ({ theme }) => ({
      // ✅ only override font — MUI handles error color by default
      ...theme.typography.caption,
    }),
  },
};

export default FormHelperText;