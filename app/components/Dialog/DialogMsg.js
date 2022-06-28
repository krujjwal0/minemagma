import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ goToLogin, errorMessage, showDialog, showOtpErrorPopupAction }) {
  const [open, setOpen] = React.useState(showDialog);
  const history = useHistory();

  useEffect(() => { console.log('value of showDialog', errorMessage, showDialog) }, [showDialog]);

  const handleClickOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
    showOtpErrorPopupAction({ status: false, msg: "" })
    if (goToLogin == '/') {
      history.push({ pathname: goToLogin });
    }
    window.location.reload(false)

  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Error Msg
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} style={{height: '40%', margin: '180px'}}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Login Error
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {/* Otp maximum attempts exceeded. Please wait for approx 30 minutes to resend it. */}
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            <p className='font-sans'>Close</p>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}