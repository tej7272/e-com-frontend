const Dialog = {
  defaultProps: {
    slotProps: {
      paper: {
        variant: 'elevation',
        elevation: 6,
      },
    },
  },
  styleOverrides: {
    paper: ({ theme }) => ({
      fontSize: theme.typography.body2.fontSize,
      overflow: 'hidden',
      minHeight: 'fit-content',
    }),
  },
};

export const DialogTitle = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3),
      fontSize: theme.typography.body2.fontSize,
    }),
  },
};


export const DialogContent = {
  defaultProps: {
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiDialogContent-dividers': {
        display: 'none',
      },
      
    })
  }
}


export const DialogActions = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2.5, 1),
      fontSize: theme.typography.body2.fontSize,
    })
  }
}

export default Dialog;
