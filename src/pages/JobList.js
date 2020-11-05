import React, { useEffect } from 'react'
import JobItem from '../components/JobItem';

// job list template
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';
import Assign from '../components/Assign';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

function JobList() {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;

    const [jobList, setJobList] = React.useState([]);
    const [isLoad, setLoad] = React.useState(true);

    useEffect(() => {
        jobService.getJobRequest(currentUser.user_id)
            .then(data => {
                setJobList(data);
                setLoad(false);
            })
            .catch(err => console.log(err))
    }, [currentUser.user_id])

    const [assign, setAssign] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState({});

    const onAssignClick = (job_id) => {

        jobList.forEach(job => {
            if (job.job_id === job_id) {
                setSelectedJob(job);
                return;
            }
        })
        
        setAssign(true);
    }

    return (
        <React.Fragment>
            {   !assign &&
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {
                            !isLoad ? 
                                jobList.length !== 0 ?
                                <Grid container spacing={4}>
                                    {jobList.map((job, index) => (
                                        <JobItem key={index} data={job} onAssignClick={onAssignClick} />
                                    ))}
                                </Grid>
                                : 
                                <h2 style={{textAlign: 'center', color: 'gray'}} >
                                    No Job Found
                                </h2>
                            :
                            <div style={{textAlign: 'center'}} >
                                <CircularProgress />
                            </div>
                        }
                    </Container>
                </main>
            }
            {assign && <Assign data={selectedJob} />}
        </React.Fragment>
    )
}

export default JobList