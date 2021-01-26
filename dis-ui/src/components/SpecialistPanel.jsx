import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';

export default class SpecialistPanel extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    const onChange = (e) => {};

    const onSubmit = (e) => {};

    return (
      <div>
        <NavBar />
        <form className="col-6 mx-auto mt-5">
          <div className="mb-3">
            <label for="exampleInputUsername" className="form-label">
              Sukurti vartotojo prisijungimo vardą
            </label>
            <input
              type="username"
              placeholder="Įveskite prisijungimo vardą"
              className="form-control"
              id="exampleInputUsername"
              aria-describedby="usernameHelp"
            />
            <div id="usernameHelp" className="form-text text-secondary">
              pvz.: VardasPavardė
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Sukurti vartotojo prisijungimo slaptažodį
            </label>
            <input
              type="password"
              placeholder="Įveskite slaptažodį"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-success mr-3">
            Sukurti švietimo specialistą
          </button>
          <NavLink to="/admin" className="btn btn-secondary mr-3">
            Atšaukti
          </NavLink>
        </form>
      </div>
    );
  }
}
