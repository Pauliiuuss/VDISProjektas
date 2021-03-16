import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { vpassword } from "../Admin/Validation";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar.component";
import Details from "./Details";
import Password from "./Password";
import ParentService from "../../services/parent.service";

class UserUpdateForm extends Component {
  state = {
    currentUser: "",
    redirect: null,
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
    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    await UserService.getUserData(currentUser.id).then(
      (response) => {
        this.setState({ userData: response.data });
      },
      (error) => {
        console.log(error);
      }
    );

    this.setState({
      currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
    if (currentUser.roles.includes("ROLE_ADMIN")) {
      this.props.history.push("/dis-app/");
      window.location.reload();
    }
  }

  handleSubmit = async (e, name, surename, phoneNum, email) => {
    e.preventDefault();

    if (
      name === "" ||
      surename === "" ||
      phoneNum === "" ||
      email === "" ||
      name === null ||
      surename === null ||
      phoneNum === null ||
      email === null
    ) {
      this.setState({
        successfulDetails: false,
        messageDetails: "Visi laukai privalo būti užpildyti!",
      });
      return;
    }

    if (/\d/.test(name) || /\d/.test(surename)) {
      this.setState({
        successfulDetails: false,
        messageDetails: "Skaičiai negalimi vardo ir pavardės laukuose!",
      });
      return;
    }

    if (phoneNum !== null && phoneNum.length > 19) {
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
        this.setState({
          successfulDetails: true,
          messageDetails: response.data.message,
          successfulPassword: false,
          messagePassword: "",
        });
        UserService.getUserData(this.state.currentUser.id).then(
          (response) => {
            this.setState({ userData: response.data });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successfulDetails: false,
          messageDetails: resMessage,
          successfulPassword: false,
          messagePassword: "",
        });
      }
    );
  };

  handleDownload = (e, id, currentUserName) => {
    e.preventDefault();
    if (this.state.userData.name !== null) {
      ParentService.downloadUserData(id, currentUserName);
      this.setState({
        successfulDetails: true,
      });
    } else {
      this.setState({
        successfulDetails: false,
        messageDetails: "Nėra archyvuojamų duomenų!",
      });
    }
  };

  handlePasswordSubmit = async (
    e,
    currentUser,
    oldPassword,
    newPassword1,
    newPassword2
  ) => {
    e.preventDefault();
    if (newPassword1 === newPassword2 && vpassword(newPassword1)) {
      await UserService.updatePassword(
        currentUser.id,
        oldPassword,
        newPassword1
      ).then(
        (response) => {
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

          this.setState({
            successfulPassword: false,
            messagePassword: resMessage,
            successfulDetails: false,
            messageDetails: "",
          });
        }
      );
    } else {
      this.setState({
        successfulDetails: false,
        messageDetails: "",
        messagePassword:
          "Nesutampa naujojo slaptažodžio laukai arba naujas slaptažodis neatitinka reikalavimų!",
        successfulPassword: false,
      });
    }
  };

  clearUpdateFormMessage = () => {
    this.setState({ messageDetails: "" });
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;

    const { currentUser, userReady, roles } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        {userReady ? (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-5 col-lg-5">
                <Details
                  clearUpdateFormMessage={this.clearUpdateFormMessage}
                  userData={this.state.userData}
                  handleDownload={this.handleDownload}
                  id={this.state.currentUser.id}
                  onSubmit={this.handleSubmit}
                  message={this.state.messageDetails}
                  successful={this.state.successfulDetails}
                  currentUserName={this.state.currentUser.username}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-5 col-lg-5">
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
          <div className="d-flex justify-content-center mt-5">
            <div
              className="spinner-border mt-5"
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
