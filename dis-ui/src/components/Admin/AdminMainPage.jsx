import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AdminService from "../../services/admin.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../services/auth.service";
import { vusername } from "./Validation";
import Users from "./List/Users";
import ParentService from "../../services/parent.service";
import LoadingSpan from "../utils/LoadingSpan";

export default class AdminMainPage extends Component {
  state = {
    users: [],
    role: "",
    name: "",
    message: "",
    successful: false,
    selectedRole: "ROLE_SPEC",
    loading: false,
    redirect: null,
    userReady: false,
    modalIsOpen: false,
    appStatus: {
      registrationClosed: "",
      specelistsDisabled: "",
    },
    specChanges: {
      message: "",
      successful: false,
    },
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
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
        message: "Prisijungimo vardo laukas negali būti tuščias!",
        loading: false,
      });
      return;
    }

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      await AdminService.createUser({
        username: name,
        password: name,
        role: selectedRole,
      }).then(
        (response) => {
          AdminService.getUsers().then((res) =>
            this.setState({
              users: res.data,
              successful: true,
              message: response.data.message,
              name: "",
              loading: false,
            })
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
            successful: false,
            message: resMessage,
            loading: false,
          });
        }
      );
    }
    this.setState({ loading: false });
  };

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const { data } = await AdminService.getUsers();
    this.setState({ users: data });

    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });

    ParentService.appStatus().then((response) => {
      console.log(response);
      this.setState({ appStatus: response.data });
    });
  }

  handleSelectChange = (e) => {
    const selectedRole = e.target.value;
    console.log(selectedRole);
    this.setState({ selectedRole, message: "" });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, message: "" });
  };

  handleSpecChange = (e) => {
    e.preventDefault();
    this.setState({
      appStatus: {
        ...this.state.appStatus,
        specelistsDisabled: !this.state.appStatus.specelistsDisabled,
      },
    });
    if (this.state.appStatus.specelistsDisabled)
      AdminService.enableAllSpec().then(
        (response) => {
          console.log(response.data.message);
          this.setState({
            specChanges: {
              message: response.data.message,
              successful: true,
            },
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            specChanges: {
              message: error.message,
              successful: false,
            },
          });
          ParentService.appStatus().then((response) => {
            console.log(response);
            this.setState({ appStatus: response.data });
          });
        }
      );
    else
      AdminService.disableAllSpec().then(
        (response) => {
          console.log(response.data.message);
          this.setState({
            specChanges: {
              message: response.data.message,
              successful: true,
            },
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            specChanges: {
              message: error.message,
              successful: false,
            },
          });
          ParentService.appStatus().then((response) => {
            console.log(response);
            this.setState({ appStatus: response.data });
          });
        }
      );
  };
  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    console.log(this.state.appStatus);
    const { name } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
              <strong className="fw-bold text-secondary">
                SUKURTI NAUDOTOJĄ
              </strong>
              <Form
                className=""
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="mb-3" style={{ fontSize: 14 }}>
                  <label htmlFor="exampleInputUsername" className="form-label">
                    Prisijungimo vardas
                    <span className="text-danger" style={{ fontSize: 18 }}>
                      *
                    </span>
                  </label>
                  <Input
                    name="name"
                    onChange={this.handleInputChange}
                    validations={[vusername]}
                    value={name}
                    type="text"
                    placeholder="VardasPavardė"
                    className="form-control"
                    id="name"
                    aria-describedby="usernameHelp"
                  />
                  <div id="usernameHelp" className="form-text text-success">
                    Pirminis slaptažodis yra prisijungimo vardas (sugeneruoja
                    sistema)
                  </div>
                </div>
                <div onChange={this.handleSelectChange} className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label"
                    style={{ fontSize: 14 }}
                  >
                    Rolė
                    <span className="text-danger" style={{ fontSize: 18 }}>
                      *
                    </span>
                  </label>
                  <div className="form-check">
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
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="ROLE_PARENT"
                      value="ROLE_PARENT"
                    />
                    <label className="form-check-label" htmlFor="ROLE_PARENT">
                      Vaiko atstovas
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
              {this.state.appStatus.specelistsDisabled !== "" ? (
                <div className="row" style={{ marginTop: "3rem" }}>
                  <div className="col">
                    <p className="list-group-item">
                      Švietimo specialistai{" "}
                      {this.state.appStatus.specelistsDisabled ? (
                        <b>NEGALI</b>
                      ) : (
                        <b>GALI</b>
                      )}
                      :
                      <ul>
                        <li>keisti prašymų statusus;</li>
                        <li>sudaryti darželių eiles;</li>
                        <li>pridėti naujus darželius;</li>
                        <li>redaguoti darželių grupes</li>
                      </ul>
                    </p>
                    {this.state.appStatus.specelistsDisabled ? (
                      <button
                        onClick={(e) => this.handleSpecChange(e)}
                        className="btn btn-sm btn-info col-12"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Atrakinti
                      </button>
                    ) : (
                      <button
                        onClick={(e) => this.handleSpecChange(e)}
                        className="btn btn-sm btn-secondary col-12"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Užrakinti
                      </button>
                    )}
                    {this.state.specChanges.message && (
                      <div className="form-group mt-2">
                        <div
                          className={
                            this.state.specChanges.successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {this.state.specChanges.message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="col m-5">
                  <div
                    className="spinner-border"
                    style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="col">
              <Users users={this.state.users} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
