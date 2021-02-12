import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import Navbar from "../navbar.component";
import Details from "./Details";
import Password from "./Password";

class UserUpdateForm extends Component {
  state = {
    currentUser: "",
    userReady: false,
    roles: "",
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
  }

  render() {
    const { currentUser, userReady, roles } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        {userReady ? (
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-5">
                <Details
                  currentUser={currentUser}
                  userReady={userReady}
                  roles={roles}
                />
              </div>
              <div className="col-5">
                <Password
                  currentUser={currentUser}
                  userReady={userReady}
                  roles={roles}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default UserUpdateForm;
