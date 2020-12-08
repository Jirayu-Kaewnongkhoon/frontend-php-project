import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import swal from 'sweetalert';
import { createBrowserHistory } from 'history';
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';
import { userService } from '../services/userService'
import JobDetail from './JobDetail';

const useStyles = makeStyles((theme) => ({
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
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
}));

function Assign({ match }) {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;
    const history = createBrowserHistory({ forceRefresh: true });

    const [staffList, setStaffList] = React.useState([]);
    const [job, setJob] = React.useState({});
    const [selectedStaff, setSelectedStaff] = React.useState('');
    const [isLoad, setLoad] = React.useState(true);

    useEffect(() => {
        userService.getStaff(currentUser.user_id)
            .then(res => {
                console.log(res);
                setStaffList(res);
            })
            .catch(err => console.log(err))

        jobService.getJobById(match.params.job_id)
            .then(res => {
                console.log(res);
                setJob(res?.[0]);
                setLoad(false);
            })
            .catch(err => console.log(err))
    }, [currentUser.user_id, match.params.job_id])

    const handleChange = (event) => {
        setSelectedStaff(event.target.value);
    };

    const onSubmitClick = () => {
        if (selectedStaff === '') {
            swal({
                title: "Please select staff",
                icon: "warning",
                button: "Accept",
            })
        } else {
            jobService.createJobAssignment(selectedStaff, job.job_id)
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
                            history.push('/history')
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

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="md">
            {
                !isLoad &&
                <div>
                    <div className={classes.section}>
                        <Typography variant='h5' style={{fontWeight: 'bold', textDecoration: 'underline', textAlign: 'center'}} >
                            มอบหมายงาน
                        </Typography>
                    </div>

                    <JobDetail job={job} />

                    <Divider />

                    <div className={classes.section}>
                        <Typography variant='h6' className={classes.contentHeader} >
                            <HowToRegIcon color='primary'/>
                            Assign To
                        </Typography>
                        <div className={classes.content}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Staff</InputLabel>
                                <Select
                                    value={selectedStaff}
                                    onChange={handleChange}
                                    label="Staff"
                                >
                                    {staffList.map((staff, index) => (
                                        <MenuItem key={index} value={staff.user_id}>{staff.user_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

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

export default Assign
