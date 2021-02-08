import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from './components/login.component';
import MainAfterLogin from './components/MainAferLogin';
import UnderConstruction from './components/underConstruction';

class App extends Component {
  render() {
    document.title = "DarželiųInformacinėSistema";
    return (
      <div>
        <Switch>
          <Route
            exact
            path={['/dis-app/', '/dis-app/login']}
            component={Login}
          />
          <Route exact path="/dis-app/home" component={MainAfterLogin} />
          <Route path="/dis-app/queue" component={UnderConstruction} />
          <Route path="/dis-app/kindergarten" component={UnderConstruction} />
          <Route
            exact
            path="/dis-app/application"
            component={UnderConstruction}
          />
          <Route
            exact
            path="/dis-app/application/new"
            component={UnderConstruction}
          />
          <Route path="/dis-app/mydata" component={UnderConstruction} />
          <Route path="/dis-app/statistic" component={UnderConstruction} />
        </Switch>
      </div>
    );
  }
}

export default App;
