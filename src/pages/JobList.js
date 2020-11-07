import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobItem from '../components/JobItem';
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';


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
        if (currentUser.role_name === 'Head') {
            jobService.getJobRequest(currentUser.user_id)
                .then(data => {
                    setJobList(data);
                    setLoad(false);
                })
                .catch(err => console.log(err))
        }

        if (currentUser.role_name === 'Staff') {
            jobService.getJobAssignment(currentUser.user_id)
                .then(data => {
                    setJobList(data);
                    setLoad(false);
                })
                .catch(err => console.log(err))
        }
    }, [currentUser.user_id, currentUser.role_name])

    return (
        <React.Fragment>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {
                        !isLoad ? 
                            jobList.length !== 0 ?
                            <Grid container spacing={4}>
                                {jobList.map((job, index) => (
                                    <JobItem key={index} data={job} />
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
        </React.Fragment>
    )
}

export default JobList