import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import baseURL from '../configure';
import UsersList from './UsersList';

export default class SpecialistPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${baseURL}/api/users`)
      .then((user) => {
        this.setState({ users: user });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const onChange = (e) => {};

    const onSubmit = (e) => {};

    const { data } = this.state.users;

    if (!data) {
      return (
        <div>
          <NavBar />
          <form className="col-6 mx-auto mt-5">
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                Sukurti vartotojo prisijungimo vardą
              </label>
              <input
                type="text"
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
              <label htmlFor="exampleInputPassword1" class="form-label">
                Sukurti vartotojo prisijungimo slaptažodį
              </label>
              <input
                type="text"
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
          <h5 className="text-center mt-5">Švietimo specialistų sąrašas</h5>
          <table className="table col-6 mt-3 mx-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Prisijungimo vardas</th>
                <th scope="col">Rolė</th>
              </tr>
            </thead>
          </table>
        </div>
      );
    } else {
      <div>
        <NavBar />
        <form className="col-6 mx-auto mt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">
              Sukurti vartotojo prisijungimo vardą
            </label>
            <input
              type="text"
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
            <label htmlFor="exampleInputPassword1" class="form-label">
              Sukurti vartotojo prisijungimo slaptažodį
            </label>
            <input
              type="text"
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
        <h5 className="text-center mt-5">Švietimo specialistų sąrašas</h5>
        <table className="table col-6 mt-3 mx-auto">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Prisijungimo vardas</th>
              <th scope="col">Rolė</th>
            </tr>
          </thead>
          {data.map(({ id, ...otherProps }) => (
            <UsersList key={id} id={id} {...otherProps} />
          ))}
        </table>
      </div>;
    }
  }
}
