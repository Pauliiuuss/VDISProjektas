import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AdminMainPage from "./Admin/AdminMainPage";

class MainAfterLogin extends Component {
  state = {
    redirect: null,
    userReady: false,
    currentUser: { username: "" },
    roles: [],
  };

  async componentDidMount() {
    const currentUser = await AuthService.getCurrentUser();

    if (!currentUser) {
      this.props.history.push("/dis-app/");
      window.location.reload();
    } else
      this.setState({
        currentUser: currentUser,
        userReady: true,
        roles: currentUser.roles,
      });
  }

  render() {
    if (this.state.roles.indexOf("ROLE_ADMIN") > -1) return <AdminMainPage />;

    return (
      <h1>
        Depending on role you will see content here. Parent and Spec main
        screens has not been created yet!
      </h1>
    );
  }
}

export default MainAfterLogin;
