import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import Iconify from 'components/base/Iconify';

export default function ConfirmDialog({ open, onClose, title, content, action }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
        <DialogTitle>{title}</DialogTitle>

        {content && (
            <DialogContent>
                <Typography variant='body1' fontWeight='600' sx={{ fontSize: 13 }}>
                    {content}
                </Typography>
            </DialogContent>
        )}

        <DialogActions sx={{ px: 3 }}>
            <Button variant='outlined' size='large' onClick={onClose}>
                <Iconify icon='solar:undo-left-round-linear' sx={{ mr: 1 }} />
                Cancel
            </Button>
            {action}
        </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
    open:    PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title:   PropTypes.string.isRequired,
    content: PropTypes.string,
    action:  PropTypes.node,
};

ConfirmDialog.defaultProps = {
    content: null,
    action:  null,
};