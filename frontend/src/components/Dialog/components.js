import React from 'react';
import { withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineClose } from 'react-icons/ai';

const stylesDTitle = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: 500,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    fontWeight: 'bold',
  },
});

const DialogTitle = withStyles(stylesDTitle)((props) => {
  const { children, onClose, classes, ...others } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...others}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>

      {onClose && (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <AiOutlineClose size={20} color="#9e9e9e" />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export { DialogTitle, DialogContent, DialogActions };
