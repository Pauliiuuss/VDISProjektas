import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import logo from "../img/logo.png";

import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Privalomi laukai turi būti užpildyti!
      </div>
    );
  }
};

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
    message: "",
    currentUser: "",
    redirect: "",
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      await AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/dis-app/home");
          window.location.reload();
        },
        (error) => {
          const resMessage = "Neteisingi prisijungimo vardas ar slaptažodis!";

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    if (localStorage.getItem("user")) return <Redirect to={"/dis-app/home"} />;

    return (
      <div className="container">
        <div
          className="mx-auto"
          style={{
            width: "30rem",
            marginTop: "5rem",
            backgroundColor: "#E2E2E2",
            paddingBottom: "1rem",
          }}
        >
          <img src={logo} alt="logo" style={{ width: "30rem" }} />
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group mx-auto mt-3" style={{ width: "10rem" }}>
              <label htmlFor="username">Vartotojo vardas</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group mx-auto" style={{ width: "10rem" }}>
              <label htmlFor="password">Slaptažodis</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group text-center mt-5">
              <button
                className="btn btn-secondary"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Prisijungti</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
        </div>
      </div>
    );
  }
}
