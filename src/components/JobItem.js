import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { authenticationService } from '../services/authenticationService';
import { Link } from 'react-router-dom';
import JobDetailPopup from './JobDetailPopup';


const useStyles = makeStyles(() => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    }
}));

function JobItem(props) {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={props.data.pre_image_path}
                    title={props.data.description}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.description}
                    </Typography>
                    <Typography style={{display: 'flex', alignItems: 'center'}} >
                        {`สถานะ: `}
                        <FiberManualRecordIcon style={{color: props.data.job_status_id !== 'JSID05' ? 'yellow' : 'green'}} />
                        {props.data.job_status_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleClickOpen} >
                        View
                    </Button>

                    { open && <JobDetailPopup handleClose={handleClose} open={open} jobID={props.data.job_id} /> }

                    {
                        currentUser && currentUser.role_name === "Head" && window.location.pathname.includes('/job-list') &&
                        <Link to={`/job-list/assign/${props.data.job_id}`} className={classes.link} >
                            <Button size="small" color="primary">
                                Assign
                            </Button>
                        </Link>
                    }

                    {
                        currentUser && currentUser.role_name === "Staff" && window.location.pathname.includes('/job-list') &&
                        <Link to={`/job-list/update/${props.data.job_id}`} className={classes.link} >
                            <Button size="small" color="primary">
                                Update
                            </Button>
                        </Link>
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}

export default JobItem