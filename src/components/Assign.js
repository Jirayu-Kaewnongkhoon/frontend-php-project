import React, { useEffect } from 'react'
import { authenticationService } from '../services/authenticationService';
import { userService } from '../services/userService'

function Assign(props) {

    const currentUser = authenticationService.currentUserValue;

    const [staffList, setStaffList] = React.useState([]);

    useEffect(() => {
        userService.getStaff(currentUser.user_id)
            .then(res => {
                console.log(res);
                setStaffList(res);
            })
            .catch(err => console.log(err))
    }, [currentUser.user_id])

    return (
        <div>
            Assign
            {/* {`Job ID: ${props.data.job_id}`} */}
            {staffList.map((staff, index) => <h3 key={index} >{staff.user_name}</h3>)}
        </div>
    )
}

export default Assign
