import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login";

export default class App extends Component {
  render() {
    document.title = "dis-ui";
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Login />
        </BrowserRouter>
      </div>
    );
  }
}
