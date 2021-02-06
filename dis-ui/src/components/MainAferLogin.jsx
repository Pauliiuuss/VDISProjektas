import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AdminMainPage from "./Admin/AdminMainPage";
import SpecMainPage from "./Spec/SpecMainPage";

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
    if (this.state.roles.includes("ROLE_ADMIN")) return <AdminMainPage />;
    if (this.state.roles.includes("ROLE_SPEC")) return <SpecMainPage />;

    return (
      <h1>
        Depending on role you will see content here. Parent and Spec main
        screens has not been created yet!
      </h1>
    );
  }
}

export default MainAfterLogin;
