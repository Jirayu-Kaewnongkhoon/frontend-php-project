import React, { useEffect } from 'react'
import { authenticationService } from '../services/authenticationService';
import { jobService } from '../services/jobService';
import { userService } from '../services/userService'

function Assign({ match }) {

    const currentUser = authenticationService.currentUserValue;

    const [staffList, setStaffList] = React.useState([]);
    const [job, setJob] = React.useState({});
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

    return (
        <div>
            Assign
            {
                !isLoad &&
                <div>
                    {`Job ID: ${job.job_id}`} <br />
                    {`Description: ${job.description}`}
                    {staffList.map((staff, index) => <h3 key={index} >{staff.user_name}</h3>)}
                </div>
            }
        </div>
    )
}

export default Assign
