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
        console.log(response.data);
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
          <div className="row">
            <div className="col-3 m-4">
              <h2 className="m-6">Įvykių žurnalas</h2>
            </div>
            <div className="col-5"></div>
            <div className="col-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </div>
          <div className="table mt-5">
            <Logs logs={this.state.log} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Logging;
