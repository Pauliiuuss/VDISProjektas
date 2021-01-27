import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

class App extends Component {
  render() {
    document.title = "dis-ui";
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/main">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
