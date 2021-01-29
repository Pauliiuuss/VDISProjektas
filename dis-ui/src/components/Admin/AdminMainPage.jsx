import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AdminService from "../../services/admin.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../services/auth.service";
import { vpassword, vusername } from "./Validation";

export default class AdminMainPage extends Component {
  state = {
    role: "",
    name: "",
    pass: "",
    message: "",
    successful: false,
    selectedRole: "ROLE_SPEC",
    loading: false,
    redirect: null,
    userReady: false,
  };

  handleClearFields = () => {
    this.setState({ name: "", pass: "" });
  };

  handleCreate = async (e) => {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });

    const { name, pass, selectedRole } = this.state;

    if (name === "" || pass === "") {
      this.setState({
        successful: false,
        message:
          "Prisijungimo vardo ir slaptažodžio laukas negali būti tuščias!",
        loading: false,
      });
      return;
    }

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      await AdminService.createUser({
        username: name,
        password: pass,
        role: selectedRole,
      }).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
            name: "",
            pass: "",
            loading: false,
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
            successful: false,
            message: resMessage,
            loading: false,
          });
        }
      );
    }
    this.setState({ loading: false });
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/dis-app/login" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
  }

  handleSelectChange = (e) => {
    const selectedRole = e.target.value;
    this.setState({ selectedRole, message: "" });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, message: "" });
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;

    const { name, pass } = this.state;

    return (
      <div className="container">
        <div>
          <Form
            className="col-6 mx-auto mt-5"
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                Sukurti vartotojo prisijungimo vardą
              </label>
              <Input
                name="name"
                onChange={this.handleInputChange}
                validations={[vusername]}
                value={name}
                type="text"
                placeholder="Įveskite prisijungimo vardą"
                className="form-control"
                id="name"
                aria-describedby="usernameHelp"
              />
              <div id="usernameHelp" className="form-text text-secondary">
                pvz.: VardasPavardė
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Sukurti vartotojo prisijungimo slaptažodį
              </label>
              <Input
                name="pass"
                value={pass}
                onChange={this.handleInputChange}
                validations={[vpassword]}
                type="text"
                placeholder="Įveskite slaptažodį"
                className="form-control"
                id="pass"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Priskirti role
              </label>
              <div onChange={this.handleSelectChange} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="ROLE_SPEC"
                  value="ROLE_SPEC"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="ROLE_SPEC">
                  Švietimo specialistas
                </label>
              </div>
              <div onChange={this.handleSelectChange} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="ROLE_PARENT"
                  value="ROLE_PARENT"
                />
                <label className="form-check-label" htmlFor="ROLE_PARENT">
                  Globėjas
                </label>
              </div>
            </div>
            <button
              type="submit"
              onClick={this.handleCreate}
              className="btn btn-success mr-3"
              disabled={this.state.loading}
            >
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Sukurti
            </button>
            <button
              className="btn btn-secondary mr-3"
              onClick={this.handleClearFields}
            >
              Išvalyti laukus
            </button>
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
          <h5 className="text-center mt-5">Naudotojų sąrašas</h5>
          <table className="table col-6 mt-3 mx-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Prisijungimo vardas</th>
                <th scope="col">Rolė</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}
