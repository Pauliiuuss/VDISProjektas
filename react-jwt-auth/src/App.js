import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/navbar.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Profile from './components/profile.component';
import BoardUser from './components/board-user.component';
import BoardModerator from './components/board-moderator.component';
import BoardAdmin from './components/board-admin.component';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={['/dis-app', '/dis-app/login']}
              component={Login}
            />
            <Route exact path="/dis-app/register" component={Register} />
            <Route exact path="/dis-app/profile" component={Profile} />
            <Route path="/dis-app/user" component={BoardUser} />
            <Route path="/dis-app/mod" component={BoardModerator} />
            <Route path="/dis-app/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
