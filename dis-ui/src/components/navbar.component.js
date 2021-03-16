import React, { Component } from "react";
import AuthService from "../services/auth.service";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import parentService from "../services/parent.service";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      appStatus: {
        registrationClosed: "",
      },
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    if (user.roles.includes("ROLE_PARENT")) {
      parentService.appStatus().then((response) => {
        this.setState({ appStatus: response.data });
      });
    }
  }

  handleReload = (link) => {
    if (window.location.pathname === link) window.location.reload();
  };

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <nav className="navbar navbar-static-top navbar-dark bg-dark navbar-expand">
        <img src={logo} alt="logo" style={{ width: "5rem" }} />
        {currentUser && (
          <ul className="nav list-inline ml-auto">
            {currentUser.roles.includes("ROLE_SPEC") ? (
              <React.Fragment>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/queue"} className="nav-link text-light">
                    Darželių eilės
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/home"} className="nav-link text-light">
                    Darželiai
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/docs"} className="nav-link text-light">
                    Dokumentai
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link
                    to={"/dis-app/statistic"}
                    className="nav-link text-light"
                  >
                    Statistika
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link
                    to={"/dis-app/mydata"}
                    className="nav-link text-light"
                    onClick={() => this.handleReload("/dis-app/mydata")}
                  >
                    Mano duomenys
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/home"} className="nav-link text-light">
                    {currentUser.username} <br />
                    <span style={{ fontSize: "small" }}>
                      Švietimo specialistas
                    </span>
                  </Link>
                </li>
              </React.Fragment>
            ) : currentUser.roles.includes("ROLE_PARENT") ? (
              <React.Fragment>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/home"} className="nav-link text-light">
                    Mano prašymai
                  </Link>
                </li>
                <li
                  hidden={this.state.appStatus.registrationClosed}
                  className="nav-item my-auto"
                >
                  <Link to={"/dis-app/addform"} className="nav-link text-light">
                    Naujas prašymas
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link
                    to={"/dis-app/statistic"}
                    className="nav-link text-light"
                  >
                    Statistika
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link
                    to={"/dis-app/mydata"}
                    onClick={() => this.handleReload("/dis-app/mydata")}
                    className="nav-link text-light"
                  >
                    Mano duomenys
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/home"} className="nav-link text-light">
                    {currentUser.username} <br />
                    <span style={{ fontSize: "small" }}>Vaiko atstovas</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/logging"} className="nav-link text-light">
                    Įvykių žurnalas
                  </Link>
                </li>
                <li className="nav-item my-auto">
                  <Link to={"/dis-app/home"} className="nav-link text-light">
                    <span>Administratorius</span>
                  </Link>
                </li>
              </React.Fragment>
            )}
            <li className="nav-item my-auto">
              <a
                href="/dis-app/"
                className="nav-link text-light"
                onClick={this.logOut}
              >
                {" "}
                <FontAwesomeIcon icon={faSignOutAlt} />
                Atsijungti
              </a>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}
