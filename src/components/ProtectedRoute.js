import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { authenticationService } from '../services/authenticationService'

function ProtectedRoute({ component: Component, roles, ...rest }) {
    return (
        <Route 
            {...rest}
            render={(props) => {
                const currentUser = authenticationService.currentUserValue;

                if (!currentUser) {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
                }

                if (roles && roles.indexOf(currentUser.role_name) === -1 && roles.length !== 0) {
                    return <Redirect to={{ pathname: '/'}} />
                }

                return <Component {...props} />
            }}
        />
    )
}

export default ProtectedRoute
