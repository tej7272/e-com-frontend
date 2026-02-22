import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function ConfirmDialog({
    open,
    onClose,
    title,
    content,
    action
}) {

  return (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth= 'xs'
    >
        <DialogTitle> {title} </DialogTitle>

        {content && 
            <DialogContent>
                <Typography component='body2' fontWeight='600' sx={{ fontSize: 13 }}>
                    { content }
                </Typography>
            </DialogContent>
        }
        <DialogActions sx={{p: 3}}>
          <Button variant="outlined" size="large" onClick={() => onClose()}>Cancel</Button>
          {action}
        </DialogActions>
    </Dialog>
  );
}
