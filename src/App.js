import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authenticationService } from './services/authenticationService';
import Login from './pages/Login';
import HomeWithSideBar from './components/HomeWithSideBar';
import ProtectedRoute from './components/ProtectedRoute';
import { allMenu } from './constants/menu';

function App() {

  const currentUser = authenticationService.currentUserValue;

  return (
      <Router>
        { currentUser && <HomeWithSideBar /> }
          <Switch>

            <Route path='/login' component={Login} />

            {
              allMenu.map((menu, index) => (
                <ProtectedRoute 
                  key={index} 
                  path={`/${menu.url}`} 
                  exact={menu.exact} 
                  component={menu.component} 
                  roles={menu.role}/>)
              )
            }

            <Route path='*' component={() => <h2 style={{textAlign: 'center', color: 'gray'}} >404 NOT FOUND</h2> } />
            
          </Switch>
          
      </Router>
  );
}

export default App;
