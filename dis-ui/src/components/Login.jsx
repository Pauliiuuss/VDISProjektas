import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

class Login extends Component {
  state = {
    userid: '',
    password: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    const { userid, password } = this.state;
    return (
      <div className="container">
        <div
          className="mx-auto"
          style={{
            width: '30rem',
            marginTop: '5rem',
            backgroundColor: '#E2E2E2',
            paddingBottom: '1rem',
          }}
        >
          <img src={logo} alt="logo" style={{ width: '30rem' }} />
          <form
            className="mx-auto m-2"
            style={{ width: '25rem' }}
            onSubmit={this.handleSubmit}
          >
            <div className="mx-auto form-group" style={{ width: '25rem' }}>
              <label>Prisijungimo vardas</label>
              <input
                type="text"
                className="form-control"
                id="userid"
                name="userid"
                value={userid}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Slaptazodis</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div className="row justify-content-center">
              {/* <button type="submit" className="btn btn-secondary">
                Prisijungti
              </button> */}
              <NavLink className="nav-link btn-secondary" to="/admin">
                Prisijungti
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
