import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PublishIcon from '@material-ui/icons/Publish';
import swal from 'sweetalert';
import { createBrowserHistory } from 'history';
import { jobService } from '../services/jobService';
import ImageUpload from './ImageUpload';
import JobDetail from './JobDetail';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    contentHeader: {
        fontSize: 18, 
        textDecoration: 'underline', 
        display: 'flex', 
        marginBottom: 20
    },
    content: {
        display: 'flex',
        justifyContent: 'center'
    },
    section: {
        marginTop: '30px', 
        marginBottom: '30px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '50%',
    },
}));

function UpdateStatus({ match }) {

    const classes = useStyles();
    const history = createBrowserHistory({ forceRefresh: true });

    const [status, setStatus] = React.useState('');
    const [job, setJob] = React.useState({});
    const [isLoad, setLoad] = React.useState(true);
    const [image, setImage] = React.useState(null);

    useEffect(() => {
        jobService.getJobById(match.params.job_id)
            .then(res => {
                console.log(res);
                setJob(res?.[0]);
                setLoad(false);
            })
            .catch(err => console.log(err))
    }, [match.params.job_id])

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const onSubmitClick = () => {
        console.log('update => ', status, image, job.job_id);
        if (status === '' || (status === 'JSID05' && image === null)) {
            swal({
                title: "Please select status or upload image",
                icon: "warning",
                button: "Accept",
            })
        } else {
            jobService.updateJobStatus(status, image, job.job_id)
                .then(
                    res => {
                        console.log(res);
                        const title = res?.[0].message;
                        swal({
                            title: title,
                            icon: "success",
                            button: "Accept",
                        })
                        .then(() => {
                            if (status === 'JSID04') {
                                history.push('/job-list');
                            }

                            if (status === 'JSID05') {
                                history.push('/history');
                            }
                        })
                    }
                )
                .catch(
                    err => {
                        console.log(err);
                        swal({
                            title: "Something went wrong",
                            text: "Please try again",
                            icon: "error",
                            button: "Accept",
                        })
                    }
                )
        }
    }

    const handleUpload = (imageValue) => {
        setImage(imageValue);
    }

    const handleResetUpload = () => {
        setImage(null);
    }

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="md">
            {
                !isLoad &&
                <div>
                    <div className={classes.section}>
                        <Typography variant='h5' style={{fontWeight: 'bold', textDecoration: 'underline', textAlign: 'center'}} >
                            อัปเดตสถานะ
                        </Typography>
                    </div>

                    <JobDetail job={job} />

                    <Divider />

                    <div className={classes.section}>
                        <Typography variant='h6' className={classes.contentHeader} >
                            <AssignmentTurnedInIcon color='primary'/>
                            Update Status
                        </Typography>
                        <div className={classes.content}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status}
                                    onChange={handleChange}
                                    label="Status"
                                >
                                    { job.job_status_id !== 'JSID04' && <MenuItem value={'JSID04'}>ดำเนินการ</MenuItem> }
                                    <MenuItem value={'JSID05'}>เสร็จสิ้น</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {
                        status && status === 'JSID05' &&
                        <div>
                            <Divider />

                            <div className={classes.section} >
                                <Typography variant='h6' className={classes.contentHeader} >
                                    <PublishIcon color='primary'/>
                                    Upload Result Image
                                </Typography>
                                <div className={classes.content}>
                                    <ImageUpload onChange={handleUpload} onRemove={handleResetUpload} />
                                </div>
                            </div>
                        </div>
                    }

                    <div className={classes.content}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmitClick}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            }
            </Container>
        </div>
    )
}

export default UpdateStatus
