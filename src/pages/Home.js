import React, { useEffect } from 'react'
import { authenticationService } from '../services/authenticationService';
import { createBrowserHistory } from 'history';

function Home() {

    const currentUser = authenticationService.currentUserValue;
    const history = createBrowserHistory({ forceRefresh: true });

    useEffect(() => {
        console.log('home');
        if (!currentUser) {
            history.push('/login');
        } else {
            
            if (currentUser.role_name === "User") {
                history.push('/job-request')
            }

            if (currentUser.role_name === "Head" || currentUser.role_name === "Staff") {
                history.push('/job-list')
            }
        }
    }, [currentUser, history])

    return (
        <div>
            
        </div>

    )
}

export default Home
