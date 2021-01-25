import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';

export default class AdminPanel extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container text-center mt-5">
          <NavLink
            to="/parent"
            className="btn btn-outline-secondary col-4 mx-5"
          >
            Pridėti vaiko atstovą
          </NavLink>
          <NavLink
            to="/specialist"
            className="btn btn-outline-secondary col-4 mx-5"
          >
            Pridėti švietimo specialistą
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}
