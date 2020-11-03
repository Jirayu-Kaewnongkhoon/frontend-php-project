import React, { useEffect } from 'react'
import axios from 'axios';
import JobItem from '../components/JobItem';

// job list template
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


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

    const [jobList, setJobList] = React.useState([]);
    const [isLoad, setLoad] = React.useState(true);

    useEffect(() => {
        axios.get("https://database-php-project.000webhostapp.com/api/JobServices/getJobRequest.php")
            .then(res => {
                console.log("job => ", res);
                setJobList(res.data.data);
                setLoad(false);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <React.Fragment>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {
                        !isLoad ?
                        <Grid container spacing={4}>
                            {jobList.map((job, index) => (
                                <JobItem key={index} data={job} />
                            ))}
                        </Grid>
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