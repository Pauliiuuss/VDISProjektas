import React, { Component } from "react";
import AdminService from "../../services/admin.service";
import AuthService from "../../services/auth.service";
import Navbar from "../navbar.component";
import Logs from "./LogList/Logs";

class Logging extends Component {
  state = {
    log: [],
  };

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || !currentUser.roles.includes("ROLE_ADMIN")) {
      this.props.history.push("/dis-app/");
      window.location.reload();
    }
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
    AdminService.getLog().then(
      (response) => {
        this.setState({ log: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="table mt-4">
            <Logs logs={this.state.log} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Logging;
