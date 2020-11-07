import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';
import { userService } from '../services/userService'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '50%',
    },
}));

function Assign({ match }) {

    const classes = useStyles();
    const currentUser = authenticationService.currentUserValue;

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
        jobService.createJobAssignment(currentUser.user_id, job.job_id)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            Assign
            {
                !isLoad &&
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}} >
                    {`Job ID: ${job.job_id}`} <br />
                    {`Description: ${job.description}`} <br />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Staff</InputLabel>
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
            }
        </div>
    )
}

export default Assign
