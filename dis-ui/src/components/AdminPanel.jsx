import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';

export default class AdminPanel extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container text-center mt-5">
          <NavLink
            to="admin/addParent"
            className="btn btn-outline-secondary col-4 mx-5"
          >
            Pridėti vaiko atstovą
          </NavLink>
          <NavLink
            to="/admin/addSpecialist"
            className="btn btn-outline-secondary col-4 mx-5"
          >
            Pridėti švietimo specialistą
          </NavLink>
        </div>
      </div>
    );
  }
}
