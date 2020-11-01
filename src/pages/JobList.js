import React, { /* useEffect */ } from 'react'
import { authenticationService } from '../services/authenticationService';
import { Link } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

function JobList() {

    const currentUser = authenticationService.currentUserValue;
    // const history = createBrowserHistory({ forceRefresh: true });

    // useEffect(() => {
    //     if (!currentUser) {
    //         history.push('/login');
    //     }
    // }, [])

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

            JobList page
        </div>
    )
}

export default JobList
