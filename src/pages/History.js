import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import JobItem from '../components/JobItem';
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
}));

function History() {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;

    const [jobList, setJobList] = React.useState([]);
    const [isLoad, setLoad] = React.useState(true);
    const [status, setStatus] = React.useState('JSID01');

    useEffect(() => {
        if (currentUser.role_name === 'Head') {
            setStatus('JSID03');
        } 
        if (currentUser.role_name === 'Staff') {
            setStatus('JSID04');
        }
        jobService.getJobHistory(currentUser.user_id)
            .then(res => {
                setJobList(res);
                setLoad(false);
            })
            .catch(err => console.log(err))
    }, [currentUser.user_id, currentUser.role_name])

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            History
            <React.Fragment>
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 30}} >
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Status</InputLabel>
                                {
                                    currentUser.role_name === 'User' &&
                                    <Select
                                        value={status}
                                        onChange={handleChange}
                                        label="Status"
                                    >
                                        <MenuItem value={'JSID01'}>รออนุมัติ</MenuItem>
                                        <MenuItem value={'JSID02'}>รับการแจ้งซ่อม</MenuItem>
                                        <MenuItem value={'JSID04'}>ดำเนินการ</MenuItem>
                                        <MenuItem value={'JSID05'}>เสร็จสิ้น</MenuItem>    
                                    </Select>
                                }

                                {
                                    currentUser.role_name === 'Head' &&
                                    <Select
                                        value={status}
                                        onChange={handleChange}
                                        label="Status"
                                    >
                                        <MenuItem value={'JSID03'}>มอบหมาย</MenuItem>
                                        <MenuItem value={'JSID04'}>ดำเนินการ</MenuItem>
                                        <MenuItem value={'JSID05'}>เสร็จสิ้น</MenuItem>    
                                    </Select>
                                }

                                {
                                    currentUser.role_name === 'Staff' &&
                                    <Select
                                        value={status}
                                        onChange={handleChange}
                                        label="Status"
                                    >
                                        <MenuItem value={'JSID04'}>ดำเนินการ</MenuItem>
                                        <MenuItem value={'JSID05'}>เสร็จสิ้น</MenuItem>    
                                    </Select>
                                }
                            </FormControl>
                        </div>
                        {
                            !isLoad ? 
                                jobList.length !== 0 ?
                                <Grid container spacing={4}>
                                    {jobList.filter(job => job.job_status_id === status).map((job, index) => (
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
        </div>
    )
}

export default History
