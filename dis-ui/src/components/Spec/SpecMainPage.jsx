import React, { Component } from "react";
import SpecService from "../../services/spec.service";
import AuthService from "../../services/auth.service";
import Kindergartens from "./List/Kindergartens";

class SpecMainPage extends Component {
  state = {
    currentUser: "",
    userReady: false,
    roles: "",
    kindergartens: null,
  };

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const { data } = await SpecService.getKindergartens();
    this.setState({ kindergartens: data });
    console.log(this.state);

    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
  }

  render() {
    return (
      <div className="container">
        <Kindergartens kindergartens={this.state.kindergartens} />
      </div>
    );
  }
}

export default SpecMainPage;
