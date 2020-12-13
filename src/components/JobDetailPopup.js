import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { jobService } from '../services/jobService';

const useStyles = makeStyles((theme) => ({
    imageRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginBottom: '20px'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'blod',
        color: '#000000',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    detail: {
        marginTop: 20,
        '& > * > *': {
            fontSize: 20,
        },
    }
}));

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
            <Typography variant="h6" style={{fontWeight: 'bold'}} >{children}</Typography>
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

    const classes = useStyles();

    const [job, setJob] = React.useState({});
    const [openPreImage, setOpenPreImage] = React.useState(false);
    const [openPostImage, setOpenPostImage] = React.useState(false);

    useEffect(() => {
        jobService.getJobById(props.jobID)
        .then(res => setJob(res?.[0]))
        .catch(err => console.log(err))
    }, [props.jobID])
    
    const handlePreImageClose = () => {
        setOpenPreImage(false);
    };

    const handlePreImageToggle = () => {
        setOpenPreImage(!openPreImage);
    };

    const handlePostImageClose = () => {
        setOpenPostImage(false);
    };

    const handlePostImageToggle = () => {
        if (job.post_image_path !== '') {
            setOpenPostImage(!openPostImage);
        }
    };

    return (
        <div>
            <Dialog onClose={() => props.handleClose()} open={props.open}>
                <DialogTitle onClose={() => props.handleClose()}>
                    {`รายการแจ้งซ่อม ${job.job_id}`}
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.imageRoot}>
                        <GridList 
                            className={classes.gridList} 
                            style={{justifyContent: job.post_image_path === '' ? 'center' : 'unset'}} 
                            cols={2}
                        >
                            <GridListTile onClick={handlePreImageToggle} style={{cursor: 'pointer'}} >
                                <img src={job.pre_image_path} alt="Before"/>
                                <GridListTileBar
                                    title={"Before"}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                            {
                                job.post_image_path !== '' &&
                                <GridListTile onClick={handlePostImageToggle} style={{cursor: 'pointer'}} >
                                    <img src={job.post_image_path} alt="After"/>
                                    <GridListTileBar
                                        title={"After"}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                    />
                                </GridListTile>
                            }
                        </GridList>
                    </div>

                    <Divider />

                    <Grid container className={classes.detail}>
                        <Grid item md={1} xs={1}/>
                        <Grid item md={4} xs={4}>
                            <Typography gutterBottom>สถานที่:</Typography>
                        </Grid>
                        <Grid item md={7} xs={7}>
                            <Typography gutterBottom>{job.building}</Typography>
                        </Grid>
                        
                        <Grid item md={1} xs={1}/>
                        <Grid item md={4} xs={4}>
                            <Typography gutterBottom>ชั้น:</Typography>
                        </Grid>
                        <Grid item md={7} xs={7}>
                            <Typography gutterBottom>{job.floor}</Typography>
                        </Grid>
                        
                        <Grid item md={1} xs={1}/>
                        <Grid item md={4} xs={4}>
                            <Typography gutterBottom>ห้อง:</Typography>
                        </Grid>
                        <Grid item md={7} xs={7}>
                            <Typography gutterBottom>{job.room}</Typography>
                        </Grid>
                        
                        <Grid item md={1} xs={1}/>
                        <Grid item md={4} xs={4}>
                            <Typography gutterBottom>รายละเอียด:</Typography>
                        </Grid>
                        <Grid item md={7} xs={7}>
                            <Typography gutterBottom>{job.description}</Typography>
                        </Grid>

                        <Grid item md={1} xs={1}/>
                        <Grid item md={4} xs={4}>
                            <Typography gutterBottom>วันที่แจ้ง:</Typography>
                        </Grid>
                        <Grid item md={7} xs={7}>
                            <Typography gutterBottom>
                                {new Date(job.pre_timestmp).toLocaleString('en-GB')}
                            </Typography>
                        </Grid>

                        {
                            job.post_timestmp !== '' &&
                            <Grid container className={classes.detail} style={{marginTop: 0}}>
                                <Grid item md={1} xs={1}/>
                                <Grid item md={4} xs={4}>
                                    <Typography gutterBottom>วันที่ซ่อมเสร็จสิ้น:</Typography>
                                </Grid>
                                <Grid item md={7} xs={7}>
                                    <Typography gutterBottom>
                                        {new Date(job.post_timestmp).toLocaleString('en-GB')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <Backdrop className={classes.backdrop} open={openPreImage} onClick={handlePreImageClose}>
                    <img src={job.pre_image_path} width='700' alt=""/>
                </Backdrop>
                <Backdrop className={classes.backdrop} open={openPostImage} onClick={handlePostImageClose}>
                    <img src={job.post_image_path} width='700' alt=""/>
                </Backdrop>
            </Dialog>
        </div>
    )
}

export default JobDetailPopup