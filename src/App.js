import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authenticationService } from './services/authenticationService';
import Login from './pages/Login';
import JobRequestForm from './pages/JobRequestForm';
import JobList from './pages/JobList';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Assign from './components/Assign';
import History from './pages/History';
import HomeWithSideBar from './components/HomeWithSideBar';

function App() {

  const currentUser = authenticationService.currentUserValue;

  return (
      <Router>
        <HomeWithSideBar>
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
                <>
                  <Route path='/job-list' component={JobList} />
                  <Route path='/assign' component={Assign} />
                </>
            }

            <Route component={NotFound} />
            
          </Switch>
        </HomeWithSideBar>
      </Router>
  );
}

export default App;
