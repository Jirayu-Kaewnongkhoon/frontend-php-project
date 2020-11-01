import React, { useEffect } from 'react'
import { authenticationService } from '../services/authenticationService';
import { Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import axios from 'axios';
import JobItem from '../components/JobItem';

function JobList() {

    const currentUser = authenticationService.currentUserValue;
    const [jobList, setJobList] = React.useState([]);
    // const history = createBrowserHistory({ forceRefresh: true });

    // useEffect(() => {
    //     if (!currentUser) {
    //         history.push('/login');
    //     }
    // }, [])

    useEffect(() => {
        axios.get("https://database-php-project.000webhostapp.com/getJobRequest.php")
            .then(res => {
                console.log("job => ", res);
                setJobList(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div>
                <h2>Name : {currentUser.user_name}</h2>
                <h2>Your role is : "{currentUser.role_name}"</h2>
                <Link to={'/login'} >
                    <button
                        type="button"
                        onClick={() => authenticationService.logout()}
                    >
                        Log out
                    </button>
                </Link>
            </div>

            <hr />

            JobList page <br /><br />
            {jobList.map((job, index) => <JobItem key={index} data={job} />)}
        </div>
    )
}

export default JobList
