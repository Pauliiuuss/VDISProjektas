import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegisteredForms from "./ListOfForms/RegisteredForms";
import ParentService from "../../services/parent.service";

export default class ParentMainPage extends Component {
  state = {
    forms: [],
    loading: true,
  };

  componentDidMount = async () => {
    await ParentService.getAllForms(this.props.currentUser.id).then(
      (response) => {
        const forms = response.data;
        this.setState({ forms });
      }
    );
    this.setState({ loading: false });
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
        {this.state.loading ? (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <RegisteredForms forms={this.state.forms} />
        )}
      </div>
    );
  }
}
