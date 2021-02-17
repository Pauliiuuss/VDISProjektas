import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegisteredForms from "./ListOfForms/RegisteredForms";
import ParentService from "../../services/parent.service";

export default class ParentMainPage extends Component {
  state = {
    forms: [],
  };

  componentDidMount = async () => {
    console.log(this.props.currentUser);
    await ParentService.getAllForms(this.props.currentUser.id).then(
      (response) => {
        const forms = response.data;
        this.setState({ forms });
        console.log(forms);
      }
    );
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <Link
              to="/dis-app/application/new"
              className="btn btn-success float-right"
            >
              Naujas prašymas
            </Link>
          </div>
        </div>
        <div className="row">
          <h3
            className="text-secondary mb-3
            "
          >
            Mano prašymai
          </h3>
        </div>
        <RegisteredForms forms={this.state.forms} />
      </div>
    );
  }
}
