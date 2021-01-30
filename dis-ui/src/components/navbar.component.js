import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark col-12 col-sm-12 col-md-12 col-lg-12">
        <img src={logo} alt="logo" style={{ width: '5rem' }} />
        <div className="navbar-nav mr-auto"></div>

        {currentUser && (
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to={'/dis-app/home'} className="nav-link">
                {currentUser.roles.includes('ROLE_SPEC') ? (
                  <div>
                    {currentUser.username} <br />
                    <span style={{ fontSize: 'small' }}>
                      (Švietimo specialistas)
                    </span>
                  </div>
                ) : currentUser.roles.includes('ROLE_PARENT') ? (
                  <div>
                    {currentUser.username}
                    <br />
                    <span style={{ fontSize: 'small' }}>Vaiko atstovas</span>
                  </div>
                ) : (
                  'Administratorius'
                )}
              </Link>
            </li>
            <li className="nav-item my-auto">
              <a href="/dis-app/" className="nav-link" onClick={this.logOut}>
                {' '}
                <FontAwesomeIcon icon={faSignOutAlt} />
                Atsijungti
              </a>
            </li>
          </div>
        )}
      </nav>
    );
  }
}
