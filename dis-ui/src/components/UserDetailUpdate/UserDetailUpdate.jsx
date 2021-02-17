import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { vpassword } from "../Admin/Validation";
import Navbar from "../navbar.component";
import Details from "./Details";
import Password from "./Password";

class UserUpdateForm extends Component {
  state = {
    currentUser: "",
    userReady: false,
    roles: "",
    userData: {
      name: "",
      surename: "",
      email: "",
      phoneNum: "",
    },
    successfulPassword: false,
    messagePassword: "",
    successfulDetails: false,
    messageDetails: "",
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const currentUser = AuthService.getCurrentUser();
    await UserService.getUserData(currentUser.id).then(
      (response) => {
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

    if (phoneNum != null && phoneNum.length > 19) {
      this.setState({
        successfulDetails: false,
        messageDetails: "Neteisingas telefono numerio ilgis!",
      });
      return;
    } else {
      this.setState({
        messageDetails: "",
      });
    }

    await UserService.addData(this.state.currentUser.id, {
      name,
      surename,
      phoneNum,
      email,
    }).then(
      (response) => {
        console.log(response);
        this.setState({
          successfulDetails: true,
          messageDetails: response.data.message,
          successfulPassword: false,
          messagePassword: "",
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);

        this.setState({
          successfulDetails: false,
          messageDetails: resMessage,
          successfulPassword: false,
          messagePassword: "",
        });
      }
    );
  };
  // };

  handlePasswordSubmit = async (
    e,
    currentUser,
    oldPassword,
    newPassword1,
    newPassword2
  ) => {
    e.preventDefault();
    {
      newPassword1 === newPassword2 && vpassword(newPassword1)
        ? await UserService.updatePassword(
            currentUser.id,
            oldPassword,
            newPassword1
          ).then(
            (response) => {
              console.log(response);
              this.setState({
                successfulPassword: true,
                messagePassword: response.data.message,
                successfulDetails: false,
                messageDetails: "",
              });
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              console.log(resMessage);

              this.setState({
                successfulPassword: false,
                messagePassword: resMessage,
                successfulDetails: false,
                messageDetails: "",
              });
            }
          )
        : this.setState({
            successfulDetails: false,
            messageDetails: "",
            messagePassword:
              "Nesutampa naujojo slaptažodžio laukai arba naujas slaptažodis neatitinka reikalavimų!",
            successful: false,
          });
    }
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
                <Details
                  userData={userData}
                  onSubmit={this.handleSubmit}
                  message={this.state.messageDetails}
                  successful={this.state.successfulDetails}
                />
              </div>
              <div className="col-5">
                <Password
                  currentUser={currentUser}
                  userReady={userReady}
                  roles={roles}
                  onPasswordSubmit={this.handlePasswordSubmit}
                  message={this.state.messagePassword}
                  successful={this.state.successfulPassword}
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
