import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Logging from "./components/Admin/Logging";
import ChildFormsQueue from './components/Spec/ChildFormsQueue';
import Login from './components/login.component';
import MainAfterLogin from './components/MainAferLogin';
import RegistrationForm from './components/Parent/ChildRegistration/RegistrationForm';
import UserUpdateForm from './components/UserDetailUpdate/UserDetailUpdate';
import Documents from './components/Spec/ListOfDocuments/Documents';
import Statistic from './components/statistic/Statistic';

class App extends Component {
  render() {
    document.title = 'DarželiųInformacinėSistema';
    return (
      <div>
        <Switch>
          <Route
            exact
            path={['/dis-app/', '/dis-app/login']}
            component={Login}
          />
          <Route exact path="/dis-app/home" component={MainAfterLogin} />
          <Route exact path="/dis-app/addform" component={RegistrationForm} />
          <Route path="/dis-app/docs" component={Documents} />
          <Route path="/dis-app/mydata" component={UserUpdateForm} />
          <Route path="/dis-app/queue" component={ChildFormsQueue} />
          <Route path="/dis-app/statistic" component={Statistic} />
          <Route path="/dis-app/logging" component={Logging} />
        </Switch>
      </div>
    );
  }
}

export default App;
