import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authenticationService } from './services/authenticationService';
import Login from './pages/Login';
import JobRequestForm from './pages/JobRequestForm';
import JobList from './pages/JobList';
import Home from './pages/Home';
import Assign from './components/Assign';
import UpdateStatus from './components/UpdateStatus';
import History from './pages/History';
import HomeWithSideBar from './components/HomeWithSideBar';

function App() {

  const currentUser = authenticationService.currentUserValue;

  return (
      <Router>
        <HomeWithSideBar />
          <Switch>

            <Route path='/login' component={Login} />
            <Route path='/' exact component={Home} />
            <Route path='/history' component={History} />
            
            {
              currentUser && currentUser.role_name === "User" && 
                <Route path='/job-request' component={JobRequestForm} />
            }

            {
              currentUser && (currentUser.role_name === "Head" || currentUser.role_name === "Staff") && 
                <Route path='/job-list' exact component={JobList} />
            }

            {
              currentUser && currentUser.role_name === "Head" &&
                <Route path='/job-list/assign/:job_id' component={Assign} />
            }

            {
              currentUser && currentUser.role_name === "Staff" &&
                <Route path='/job-list/update/:job_id' component={UpdateStatus} />
            }

            <Route path='*' component={() => <h2 style={{textAlign: 'center', color: 'gray'}} >404 NOT FOUND</h2> } />
            
          </Switch>
          
      </Router>
  );
}

export default App;
