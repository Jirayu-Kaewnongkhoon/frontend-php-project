import React from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import JobRequestForm from './pages/JobRequestForm';
import JobList from './pages/JobList';
import { authenticationService } from './services/authenticationService';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {

  const currentUser = authenticationService.currentUserValue;

  return (
      <Router>
        <Switch>

          <Route path='/login' component={Login} />
          <Route path='/' exact component={Home} />
          
          {
            currentUser && currentUser.role_name === "User" && 
              <Route path='/job-request' component={JobRequestForm} />
          }

          {
            currentUser && (currentUser.role_name === "Head" || currentUser.role_name === "Staff") && 
              <Route path='/job-list' component={JobList} />
          }

          <Route component={NotFound} />
          
        </Switch>
      </Router>
  );
}

export default App;
