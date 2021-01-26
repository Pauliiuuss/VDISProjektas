import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import NavBar from './components/NavBar';
import ParentPanel from './components/ParentPanel';
import SpecialistPanel from './components/SpecialistPanel';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    document.title = 'dis-ui';
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/admin/addParent" component={ParentPanel} />
            <Route
              exact
              path="/admin/addSpecialist"
              component={SpecialistPanel}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
