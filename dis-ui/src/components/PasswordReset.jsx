import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import AuthService from '../services/auth.service'

class PasswordReset extends Component {
    state = {
        username: "",
        message: "",
    }

    onChangeEmail = (e) => {
        console.log(e.target.value);
        this.setState({
          email: e.target.value,
        });
      };
 
      handleForgot = async (e) => {
        e.preventDefault();
            
        if (this.state.username === '') {
            this.setState({
              message: 'Laukai negali būti neužpildyti!',
            });
            return;
          }
      
          await AuthService.reset(this.state.username).then(
            (response) => {
              console.log(response.data.message);
              this.setState({
                message: response.data.message,
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
                message: resMessage,
              });
            }
          );
        }

    render() {
    
        return (
          <div className="container col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="row ">
              <div
                className="mx-auto block "
                style={{
                  width: "30rem",
                  marginTop: "5rem",
                  backgroundColor: "#E2E2E2",
                  paddingBottom: "1rem",
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid"
                  style={{ width: "30rem" }}
                />
                <Form
                  onSubmit={(e) => this.handleForgot(e)}
                //   ref={(c) => {
                //     this.form = c;
                //   }}
                >
                  <div
                    className="form-group mx-auto mt-3"
                    style={{ width: "10rem" }}
                  >
                    <label htmlFor="email">Slaptažodžio atkūrimas</label>
                    <Input
                    placeholder="Įveskite el. paštą"
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
    
                  <div className="form-group text-center mt-4">
                    <button
                      className="btn btn-secondary"
                      disabled={this.state.loading}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Atsiųsti atkūrimą</span>
                    </button>
                  </div>
    
                  <div className="form-group text-center mt-1">
                    <Link to={"/dis-app/"}>Atgal</Link>
                  </div>
{/* 
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  /> */}
                </Form>
              </div>
            </div>
          </div>
        );
      }
}

export default PasswordReset;