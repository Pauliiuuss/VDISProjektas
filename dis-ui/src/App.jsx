import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

export default class App extends Component {
  render() {
    document.title = 'dis-ui';
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/admin" component={AdminPanel} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
