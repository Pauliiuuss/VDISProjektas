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
            {currentUser.roles.includes('ROLE_SPEC') ? (
              <React.Fragment>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/queue'} className="nav-link">
                    Darželių eilės
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/kindergarten'} className="nav-link">
                    Darželiai
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/statistic'} className="nav-link">
                    Statistika
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/mydata'} className="nav-link">
                    Mano duomenys
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/home'} className="nav-link">
                    {currentUser.username} <br />
                    <span style={{ fontSize: 'small' }}>
                      Švietimo specialistas
                    </span>
                  </Link>
                </li>
              </React.Fragment>
            ) : currentUser.roles.includes('ROLE_PARENT') ? (
              <React.Fragment>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/home'} className="nav-link">
                    Mano prašymai
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/application/new'} className="nav-link">
                    Naujas prašymas
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/statistic'} className="nav-link">
                    Statistika
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/mydata'} className="nav-link">
                    Mano duomenys
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={'/dis-app/home'} className="nav-link">
                    {currentUser.username} <br />
                    <span style={{ fontSize: 'small' }}>Vaiko atstovas</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <Link to={'/dis-app/home'} className="nav-link">
                <span>Administratorius</span>
              </Link>
            )}
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
