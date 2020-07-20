import React from 'react';
import { Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { DialogContent, DialogTitle, DialogActions } from './components';

function DialogComponent({ children, title, handleClose, open }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle onClose={handleClose}>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent;
