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
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <img src={logo} alt="logo" style={{ width: '5rem' }} />
          <div className="navbar-nav mr-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={'/dis-app/mod'} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={'/dis-app/admin'} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={'/dis-app/user'} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/dis-app/home'} className="nav-link">
                  {currentUser.roles.includes('ROLE_SPEC') ? (
                    <div>
                      {currentUser.username} <br />
                      <span style={{ fontSize: 'small' }}>
                        (Švietimo psecialistas)
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
      </div>
    );
  }
}
