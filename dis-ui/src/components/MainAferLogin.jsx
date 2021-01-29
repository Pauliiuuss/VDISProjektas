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

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/dis-app/home" });
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
