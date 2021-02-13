import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import Navbar from "../navbar.component";
import Details from "./Details";
import Password from "./Password";

class UserUpdateForm extends Component {
  state = {
    currentUser: "",
    userReady: false,
    roles: "",
    userData: "",
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.id);
    await UserService.getUserData(currentUser.id).then(
      (response) => {
        console.log(response.data);
        this.setState({ userData: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    this.setState({
      currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
  }

  handleSubmit = async (e, name, surename, phoneNum, email) => {
    e.preventDefault();
    console.log(name, surename, phoneNum, email);
    await UserService.addData(this.state.currentUser.id, {
      name,
      surename,
      phoneNum,
      email,
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    const { currentUser, userReady, roles, userData } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        {userReady ? (
          <div className="container">
            <div className="row justify-content-around">
              <div className="col-5">
                <Details userData={userData} onSubmit={this.handleSubmit} />
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
