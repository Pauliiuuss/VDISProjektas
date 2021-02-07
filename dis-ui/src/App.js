import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import MainAfterLogin from "./components/MainAferLogin";

class App extends Component {
  render() {
    document.title = "DarželiųInformacinėSistema";
    return (
      <div>
        <Navbar />
        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={["/dis-app/", "/dis-app/login"]}
              component={Login}
            />
            <Route exact path="/dis-app/home" component={MainAfterLogin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
