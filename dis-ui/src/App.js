import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import MainAfterLogin from "./components/MainAferLogin";
import UnderConstruction from "./components/underConstruction";
import RegistrationForm from "./components/Parent/RegistrationForm";
import UserUpdateForm from "./components/UserDetailUpdate/UserDetailUpdate";
import ChildFormsQueue from "./components/Spec/ChildFormsQueue";

class App extends Component {
  render() {
    document.title = "DarželiųInformacinėSistema";
    return (
      <div>
        <Switch>
          <Route
            exact
            path={["/dis-app/", "/dis-app/login"]}
            component={Login}
          />
          <Route exact path="/dis-app/home" component={MainAfterLogin} />
          <Route exact path="/dis-app/addform" component={RegistrationForm} />
          <Route path="/dis-app/mydata" component={UserUpdateForm} />
          <Route path="/dis-app/queue" component={ChildFormsQueue} />
          <Route path="/dis-app/statistic" component={UnderConstruction} />
        </Switch>
      </div>
    );
  }
}

export default App;
