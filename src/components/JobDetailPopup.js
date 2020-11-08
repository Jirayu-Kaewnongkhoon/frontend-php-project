import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { jobService } from '../services/jobService';

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


function JobDetailPopup(props) {

    const [job, setJob] = React.useState({});

    useEffect(() => {
        jobService.getJobById(props.jobID)
            .then(res => setJob(res?.[0]))
            .catch(err => console.log(err))
    }, [props.jobID])

    return (
        <Dialog onClose={() => props.handleClose()} open={props.open}>
            <DialogTitle onClose={() => props.handleClose()}>
                {`Job ID: ${job.job_id}`}
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    {`Building: ${job.building}`}
                </Typography>
                <Typography gutterBottom>
                    {`Floor: ${job.floor}`}
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                    auctor fringilla.
                </Typography>
            </DialogContent>
        </Dialog>
    )
}

export default JobDetailPopup